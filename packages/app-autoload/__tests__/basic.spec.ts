import Fastify, {FastifyInstance, FastifyLoggerInstance} from 'fastify';
import {resolve} from 'path';
import appAutoload, {AppConfig, getApps} from '../src/index';

describe('@hoth/app-autoload basic app', () => {

    function noop () {}
    let apps: AppConfig[];
    let fastify: FastifyInstance;
    let logger: FastifyLoggerInstance = {
        fatal: noop,
        error: noop,
        warn: noop,
        info: noop,
        debug: noop,
        trace: noop,
        notice: noop,
        addNotice: noop,
        addPerformance: noop,
        child: () => logger,
    };

    beforeAll(async () => {
        apps = await getApps({
            dir: resolve(__dirname, 'fixtures/basic'),
            rootPath: process.cwd(),
            name: 'some',
            prefix: '/some',
        });

        fastify = Fastify({
            disableRequestLogging: true,
            logger,
        });

        await fastify.register(appAutoload, {
            apps,
        });
    });

    it('config app prefix', async () => {

        const res1 = await fastify.inject({
            method: 'GET',
            path: '/another/app'
        });

        expect(res1.statusCode).toBe(200);
        expect(res1.body).toBe('ok!');

        const res2 = await fastify.inject({
            method: 'GET',
            path: '/some/app'
        });

        expect(res2.statusCode).toBe(404);
    });

    it('error handler 50x', async () => {

        const spy = jest.spyOn(logger, 'fatal');

        const response = await fastify.inject({
            method: 'GET',
            path: '/another/app/50x'
        });

        expect(response.statusCode).toBe(500);
        expect(spy).toHaveBeenCalledTimes(1);
        //@ts-ignore
        expect(spy.mock.calls[0][0].err.message).toBe('some error');

        spy.mockReset();
        spy.mockRestore();
    });

});
