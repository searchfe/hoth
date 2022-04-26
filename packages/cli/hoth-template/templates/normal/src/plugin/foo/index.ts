/**
 * @file custom plugin
 * @author
 */

import type {FastifyInstance} from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        hoth: string;
    }
}

export default fp(function (fastify: FastifyInstance, opts: any, next: any) {
    console.log('foo plugin options', opts);
    fastify.decorate('hoth', 'hoth');
    next();
});

export const autoConfig = {
    foo: 'bar',
};
