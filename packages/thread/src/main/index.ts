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
    // 为了兼容 还在使用Fastify v3.x的当前线上项目，不明确声明5版本
    // fastify: '>=5.0.0',
    name: '@hoth/thread',
});

export {initThread} from './initThread';

export type {
    PluginOptions,
    HothThreadConf,
} from '../../types';