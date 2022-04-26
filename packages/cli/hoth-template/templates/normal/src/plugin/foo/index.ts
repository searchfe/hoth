/**
 * @file custom plugin
 * @author
 */

import type {FastifyInstance} from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        foo: string;
    }
}

export default fp(function (fastify: FastifyInstance, opts: any, next: any) {
    console.log('foo plugin options', opts);
    fastify.decorate('foo', 'foo');
    next();
});

export const autoConfig = {
    foo: 'bar',
};
