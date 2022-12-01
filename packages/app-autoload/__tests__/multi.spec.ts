import fastifyFactory, {FastifyInstance, FastifyLoggerInstance} from 'fastify';
import {resolve} from 'path';
import appAutoload, {AppConfig, getApps} from '../src/index';

describe('@hoth/app-autoload multi app', () => {
    function noop() {}
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
        addField: noop,
        addNotice: noop,
        addPerformance: noop,
        child: () => logger,
    };

    beforeAll(async () => {
        apps = await getApps({
            dir: resolve(__dirname, 'fixtures/multi'),
            rootPath: process.cwd(),
            name: '',
            prefix: '/',
        });

        fastify = fastifyFactory({
            disableRequestLogging: true,
            logger,
        });

        await fastify.register(appAutoload, {
            apps,
        });
    });

    it('app & prefix', async () => {
        expect(apps.length).toBe(2);
        expect(apps[0].prefix).toBe('/demo');
        expect(apps[1].prefix).toBe('/another');
        expect(apps[0].name).toBe('demo');
        expect(apps[1].name).toBe('myapp');

        let response = await fastify.inject({
            method: 'GET',
            path: '/demo/app'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok!');

        response = await fastify.inject({
            method: 'GET',
            path: '/another/app'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok!');
    });

});
