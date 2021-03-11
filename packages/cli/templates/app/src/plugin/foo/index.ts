/**
 * @file custom plugin
 * @author
 */

import {FastifyInstance} from 'fastify';

export default function (fastify: FastifyInstance, opts: any, next: any) {
    console.log('foo plugin options', opts);
    next();
}

export const autoConfig = {
    foo: 'bar',
};
