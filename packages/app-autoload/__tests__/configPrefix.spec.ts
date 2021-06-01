import Fastify from 'fastify';
import pino from 'pino';
import {resolve} from 'path';
import appAutoload, {getApps} from '../src/index';

describe('@hoth/app-autoload', () => {

    it('config app prefix', async () => {
        const apps = await getApps({
            dir: resolve(__dirname, 'fixtures/configPrefix'),
            rootPath: process.cwd(),
            name: 'some',
            prefix: '/some',
        });

        const fastify = Fastify({
            disableRequestLogging: true,
            logger: pino({
                customLevels: {
                    notice: 35,
                }
            }),
        });

        fastify.register(appAutoload, {
            apps,
        });

        const res1 = await fastify.inject({
            method: 'GET',
            path: '/another/app'
        });

        expect(res1.statusCode).toBe(200);

        const res2 = await fastify.inject({
            method: 'GET',
            path: '/some/app'
        });

        expect(res2.statusCode).toBe(404);
    });
});
