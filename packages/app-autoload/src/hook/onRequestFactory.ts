import {performance} from 'perf_hooks';
import {FastifyInstance, FastifyRequest} from 'fastify';

export const parseStartTimeSym = Symbol.for('hoth.parse-start-time');

export default function (appConfig: FastifyRequest["$appConfig"], fastify: FastifyInstance) {
    return async function (req: FastifyRequest) {
        req.$appConfig = appConfig;
        req.$service = fastify;
        req[parseStartTimeSym] = performance.now();
    };
}
