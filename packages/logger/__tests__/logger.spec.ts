import getLogger from '../src/index';
import format from '../src/format';
import {compile} from '../src/compile';
import {join} from 'path';
import {readFileSync, existsSync} from 'fs';
import {fs} from '@hoth/utils';
import {advanceTo, clear} from 'jest-date-mock';
import mockConsole from 'jest-mock-console';
import {symbols} from 'pino';

describe('@hoth/logger logger', function () {

    process.env.HOTH_IDC = 'all';
    process.env.HOTH_CLUSTER = 'test';

    const rootPath = join(__dirname, 'logs');
    fs.rmSync(rootPath, {recursive: true, force: true});

    advanceTo(new Date(2021, 1, 1, 0, 0, 0));
    const restoreConsole = mockConsole();

    const logger = getLogger({
        rootPath,
        apps: [
            {
                name: 'aa'
            },
            {
                name: 'bb'
            }
        ]
    });

    const stream = logger[symbols.streamSym as any];

    afterAll(async () => {
        clear();
        restoreConsole();
        await fs.rm(rootPath, {recursive: true, force: true});
    });

    it('file created', function () {
        setTimeout(() => {
            expect(existsSync(join(rootPath, 'log/hoth/hoth.log.2021020100'))).toBe(true);
            expect(existsSync(join(rootPath, 'log/aa/aa.log.2021020100'))).toBe(true);
            expect(existsSync(join(rootPath, 'log/bb/bb.log.2021020100'))).toBe(true);

            expect(console.log).toBeCalled();
        }, 100);
    });

    it('normal log', function (done) {
        logger.info('test');
        setTimeout(() => {
            const log = readFileSync(join(rootPath, 'log/hoth/hoth.log.ti.2021020100'), 'utf8');
            expect(log).toContain('test');
            expect(log).toContain('INFO: 2021-02-01 00:00:00');
            expect(log).toContain('idc[all]');
            expect(log).toContain('cluster[test]');
            done();
        }, 100);
    });

    it('notice log', function (done) {
        logger.notice({
            app: 'aa',
            responseTime: 20,
            res: {
                statusCode: 201,
            },
            req: {
                url: '/foo/cc',
                headers: {
                    'user-agent': 'mock'
                },
                method: 'post',
                product: 'product_aa'
            },
        });
        setTimeout(() => {
            const log = readFileSync(join(rootPath, 'log/aa/aa.log.2021020100'), 'utf8');
            expect(log).toContain('NOTICE: 2021-02-01 00:00:00');
            expect(log).toContain('idc[all]');
            expect(log).toContain('cluster[test]');
            expect(log).toContain('product[product_aa]');
            expect(log).toContain('module[foo_cc]');
            expect(log).toContain('ua[mock]');
            expect(log).toContain('status[201]');
            expect(log).toContain('responseTime[20]');
            expect(log).toContain('method[post]');
            done();
        }, 100);
    });

    it('notice log no req', function (done) {
        logger.notice({
            app: 'bb',
            responseTime: 20,
        });
        setTimeout(() => {
            const log = readFileSync(join(rootPath, 'log/bb/bb.log.2021020100'), 'utf8');
            expect(log).toContain('NOTICE: 2021-02-01 00:00:00');
            expect(log).toContain('idc[all]');
            expect(log).toContain('cluster[test]');
            expect(log).toContain('product[bb]');
            expect(log).toContain('module[-]');
            expect(log).toContain('ua[-]');
            expect(log).toContain('status[-]');
            expect(log).toContain('responseTime[20]');
            expect(log).toContain('method[-]');
            done();
        }, 100);
    });

    it('error log', function (done) {
        logger.fatal({
            app: 'bb',
            err: new Error('test'),
            req: {
                url: '/foo/cc',
                headers: {
                    'user-agent': 'mock'
                },
                method: 'post'
            },
        });
        logger.error({
            app: 'bb'
        }, 'a msg err');
        setTimeout(() => {
            const log = readFileSync(join(rootPath, 'log/bb/bb.log.wf.2021020100'), 'utf8');
            expect(log).toContain('FATAL: 2021-02-01 00:00:00');
            expect(log).toContain('idc[all]');
            expect(log).toContain('cluster[test]');
            expect(log).toContain('product[bb]');
            expect(log).toContain('module[foo_cc]');
            expect(log).toContain('ua[mock]');
            expect(log).toContain('Error: test');
            expect(log).toContain('ERROR: 2021-02-01 00:00:00');
            expect(log).toContain('a msg err');
            done();
        }, 100);
    });

    it('format error', () => {
        const result = format('{a:1}');
        expect(result).toEqual({
            app: 'hoth',
            level: 10,
            result: '{a:1}',
        });
    });

    it('compile format', () => {
        const fun1 = compile(':response-time[aa]');
        expect(fun1.toString()).toContain('tokens[\"response-time\"](o, \"aa\") || \"-\")');

        const fun2 = compile(':foo[aa]');
        expect(fun2.toString()).toContain(':foo(aa)');

        const fun3 = compile(':ua');
        expect(fun3.toString()).toContain('tokens[\"ua\"]');
        expect(fun3.toString()).toContain('-');

        const fun4 = compile('+:fields');
        expect(fun4.toString()).toContain('tokens[\"fields\"]');
        expect(fun4.toString()).not.toContain('-');
    });

    it('stream flushSync', () => {
        const mock = jest.fn();
        stream.streams.forEach((item: any) => {
            item.stream.flushSync = mock;
        });
        stream.flushSync();

        expect(mock).toBeCalledTimes(9);
    });

    it('stream clone', () => {
        const newStream = stream.clone('trace');

        expect(newStream.minLevel).toBe('trace');
    });
});