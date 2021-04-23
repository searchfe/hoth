import fp from 'fastify-plugin';
import type {FastifyInstance} from 'fastify';
import type {PluginOptions} from '../types';
import {initThread} from './index';

async function threadPlugin(fastify: FastifyInstance, options: PluginOptions) {

    const pool = await initThread(options);

    fastify.decorate('piscina', pool);
    // @ts-ignore
    fastify.decorate('runTask', (...args) => pool.runTask(...args));
}

export = fp(threadPlugin, {
    fastify: '>=1.0.0',
    name: '@hoth/thread',
});
