/**
 * @file custom plugin
 * @author
 */

import type {FastifyInstance} from 'fastify';

export default function (fastify: FastifyInstance, opts: any, next: any) {
    console.log('foo plugin options', opts);
    next();
}

export const autoConfig = {
    foo: 'bar',
};
