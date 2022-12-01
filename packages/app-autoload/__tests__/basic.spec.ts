import fastify, {FastifyInstance, FastifyLoggerInstance} from 'fastify';
import {resolve} from 'path';
import FormData from 'form-data';
import fs from 'fs';
import appAutoload, {AppConfig, getApps} from '../src/index';

describe('@hoth/app-autoload basic app', () => {

    function noop() {} // eslint-disable-line @typescript-eslint/no-empty-function
    let apps: AppConfig[];
    let fastifyInstance: FastifyInstance;
    let logger: FastifyLoggerInstance = {
        fatal: noop,
        error: noop,
        warn: noop,
        info: noop,
        debug: noop,
        trace: noop,
        notice: noop,
        // @ts-ignore
        addField: noop,
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

        fastifyInstance = fastify({
            disableRequestLogging: true,
            logger,
        });

        await fastifyInstance.register(appAutoload, {
            apps,
        });
    });

    it('config app prefix', async () => {

        const res1 = await fastifyInstance.inject({
            method: 'GET',
            path: '/another/app'
        });

        expect(res1.statusCode).toBe(200);
        expect(res1.body).toBe('ok!');

        const res2 = await fastifyInstance.inject({
            method: 'GET',
            path: '/some/app'
        });

        expect(res2.statusCode).toBe(404);
    });

    it('error handler 50x', async () => {

        const spy = jest.spyOn(logger, 'fatal');

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/another/app/50x'
        });

        expect(response.statusCode).toBe(500);
        expect(spy).toHaveBeenCalledTimes(1);
        // @ts-ignore
        expect(spy.mock.calls[0][0].err.message).toBe('some error');

        spy.mockReset();
        spy.mockRestore();
    });

    it('app.js decorateRequest', async () => {

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/another/app/foo'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok');
    });

    it('config', async () => {

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/another/app/config'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok');
    });

    it('plugin decorateRequest', async () => {

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/another/app/req'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok');
    });

    it('add fastify-multipart plugin', async () => {

        const form = new FormData();
        form.append('upload', fs.createReadStream(resolve(__dirname, 'fixtures/basic/upload.txt')));

        const response = await fastifyInstance.inject({
            method: 'POST',
            path: '/another/app/upload',
            headers: form.getHeaders(),
            payload: form,
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('ok');
    });


});
