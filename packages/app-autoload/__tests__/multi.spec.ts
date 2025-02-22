import fastifyFactory, {FastifyBaseLogger, FastifyInstance} from 'fastify';
import {resolve} from 'path';
import appAutoload, {AppConfig, getApps} from '../src/index';

describe('@hoth/app-autoload multi app', () => {
    let apps: AppConfig[];
    let fastify: FastifyInstance;
    let logger: FastifyBaseLogger = {
        fatal: () => void 0,
        error: () => void 0,
        warn: () => void 0,
        info: () => void 0,
        debug: () => void 0,
        trace: () => void 0,
        notice: () => void 0,
        addField: () => void 0,
        addNotice: () => void 0,
        addPerformance: () => void 0,
        child: () => logger,
        level: 'info',
        silent: () => void 0,
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
            loggerInstance: logger as unknown as FastifyBaseLogger,
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
            path: '/demo/app',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok!');

        response = await fastify.inject({
            method: 'GET',
            path: '/another/app',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok!');
    });

});
