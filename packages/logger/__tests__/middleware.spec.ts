import getLogger, {preHandler} from '../src/index';
import {join} from 'path';
import {readFileSync} from 'fs';
import {advanceTo, clear} from 'jest-date-mock';
import mockConsole from 'jest-mock-console';
import fastify from 'fastify';
import {fs} from '@hoth/utils';

describe('@hoth/logger logger', function () {

    process.env.HOTH_IDC = 'all';
    process.env.HOTH_CLUSTER = 'test';

    const rootPath = join(__dirname, 'logs2');
    fs.rmSync(rootPath, {recursive: true, force: true});

    advanceTo(new Date(2021, 1, 1, 0, 0, 0));
    const restoreConsole = mockConsole();

    const logger = getLogger({
        rootPath,
        apps: [
            {
                name: 'test'
            }
        ]
    });

    const app = fastify({
        logger,
    });

    app.addHook('preHandler', preHandler);

    app.get('/test/xx', async (req, reply) => {
        req.log.addNotice('foo', 'xx');
        req.log.addPerformance('func1', 10);
        req.log.addPerformance('func1', 20);
        req.log.notice({
            app: 'test',
            req,
            reply
        });
        reply.send('ok');
    });

    afterAll(async () => {
        clear();
        restoreConsole();
        await fs.rm(rootPath, {recursive: true, force: true});
    });

    it('test', async done => {
        await app.inject({
            method: 'GET',
            path: '/test/xx'
        });
        setTimeout(() => {
            const log = readFileSync(join(rootPath, 'log/test/test.log.2021020100'), 'utf8');
            expect(log).toContain('NOTICE: 2021-02-01 00:00:00');
            expect(log).toContain('foo[xx]');
            expect(log).toContain('tm[func1:2:30.0]');
            done();
        }, 100);
    });
});