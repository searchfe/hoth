import {
    threadPlugin
} from '../src/main/index';
import path from 'path';
import fastify, {FastifyInstance} from 'fastify';

if (!process.env.ROOT_PATH) {
    process.env.ROOT_PATH = __dirname;
}

describe('hoth init thread', () => {
    let app: FastifyInstance = fastify();

    beforeEach(() => {
        app = fastify({
            logger: false
        });
    });
    it('should error', async () => {
        const fn = jest.fn();
        try {
            await app.register(threadPlugin, {
                threadsNumber: 1,
                filename: path.resolve(__dirname, './sample/worker.js'),
                logConfig: {
                    appName: 'meixg'
                },
                // @ts-ignore
                env: 123
            });
        }
        catch (e) {
            fn((e as Error).message);
        }
        expect(fn).toHaveBeenCalledWith('options.env should be an object.');
    });
    it('should error', async () => {
        const fn = jest.fn();
        try {
            await app.register(threadPlugin, {
                threadsNumber: 1,
                filename: path.resolve(__dirname, './sample/worker.js'),
                logConfig: {
                    appName: 'meixg'
                },
                env: process.env
            });
        }
        catch (e) {
            fn((e as Error).message);
        }
        expect(fn).not.toHaveBeenCalled();
    });
    it('thread plugin with warmup', async () => {
        await app.register(threadPlugin, {
            threadsNumber: 1,
            filename: path.resolve(__dirname, './sample/worker.js'),
            logConfig: {
                appName: 'meixg'
            },
            warmupConfig: {
                maxConcurrent: 5,
                warmupData: ['a.json'],
                basePath: path.resolve(__dirname, './warmupData')
            },
            env: {
            }
        });

        // @ts-ignore
        expect(!!app.runTask).toBeTruthy();
        // @ts-ignore
        expect(!!app.piscina).toBeTruthy();
    });
});
