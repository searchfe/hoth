import type {FastifyRequest} from 'fastify';
import {performance} from 'perf_hooks';

export const validateStartTimeSym = Symbol.for('hoth.validate-start-time');

export default async function (req: FastifyRequest) {
    req[validateStartTimeSym] = performance.now();
}
