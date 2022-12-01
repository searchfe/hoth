import {FastifyRequest} from 'fastify';
import {performance} from 'perf_hooks';

export const parseStartTimeSym = Symbol.for('hoth.parse-start-time');

export default async function (req: FastifyRequest) {
    req[parseStartTimeSym] = performance.now();
}
