import fastify, {FastifyInstance} from 'fastify';
import path from 'path';
import {promises} from 'fs';
import pluginLoader from '../src/pluginLoader';

const {symlink, unlink} = promises;

declare module 'fastify' {
    interface FastifyInstance {
        foo?: Record<string, unknown>;
        test?: Record<string, unknown>;
        realPlugin?: Record<string, unknown>;
    }
};


describe('@hoth/app-autoload pluginLoader', () => {

    let fastifyInstance: FastifyInstance;

    beforeEach(() => {
        fastifyInstance = fastify({
            logger: false,
        });
    });

    it('simple dir & file', async () => {
        await fastifyInstance.register(pluginLoader, {
            dir: path.join(__dirname, 'fixtures/plugins/simple'),
            options: {
                init: 1,
            }
        });

        expect(fastifyInstance.foo).toEqual({
            foo: 1,
            init: 1,
        });

        expect(fastifyInstance.test).toEqual({
            test: 1,
            init: 1,
        });
    });

    it('symlink file', async () => {
        await symlink(
            path.join(__dirname, 'fixtures/plugins/realPlugin.js'),
            path.join(__dirname, 'fixtures/plugins/empty/realPlugin.js')
        );

        await fastifyInstance.register(pluginLoader, {
            dir: path.join(__dirname, 'fixtures/plugins/empty'),
            options: {
                init: 1,
            }
        });

        expect(fastifyInstance.realPlugin).toEqual({
            realPlugin: 1,
            init: 1,
        });
        await unlink(path.join(__dirname, 'fixtures/plugins/empty/realPlugin.js'));
    });

});
