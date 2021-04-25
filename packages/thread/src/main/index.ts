import fp from 'fastify-plugin';
import type {FastifyInstance} from 'fastify';
import type {PluginOptions} from '../../types';
import {initThread} from './initThread';

async function threadPluginInner(fastify: FastifyInstance, options: PluginOptions) {

    const pool = await initThread(options);

    fastify.decorate('piscina', pool);
    // @ts-ignore
    fastify.decorate('runTask', (...args) => pool.runTask(...args));
}

export const threadPlugin = fp(threadPluginInner, {
    fastify: '>=1.0.0',
    name: '@hoth/thread',
});

export {initThread} from './initThread';

export type {
    PluginOptions,
    HothThreadConf
} from '../../types';