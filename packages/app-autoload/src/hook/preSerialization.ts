import {FastifyRequest} from 'fastify';
import {performance} from 'perf_hooks';

export const serializationTimeSym = Symbol.for('hoth.serialization-time');

export default async function (req: FastifyRequest) {
    req[serializationTimeSym] = performance.now();
}
