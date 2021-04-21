import fp from 'fastify-plugin';
import Piscina from 'piscina';
import type {FastifyInstance} from 'fastify';
import type {PluginOptions} from '../types';

async function piscinaPlugin(fastify: FastifyInstance, options: PluginOptions) {
    const pool = new Piscina(options.piscinaOptions);
    fastify.decorate('piscina', pool);
    fastify.decorate('runTask', pool.runTask);
}

export default fp(piscinaPlugin, {
    fastify: '>=1.0.0',
    name: '@hoth/thread'
});
