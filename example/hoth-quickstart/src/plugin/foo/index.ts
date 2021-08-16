/**
 * @file default plugin
 * @author
 */
import type {FastifyInstance} from 'fastify';

export default async function (fastify: FastifyInstance, opts: typeof autoConfig) {
    console.log('foo plugin options', opts);
    // throw new Error('test');
}

export const autoConfig = {
    foo: 'bar',
};
