import {performance} from 'perf_hooks';
import {FastifyInstance, FastifyRequest} from 'fastify';
import uuid from 'uuid-random';

export const parseStartTimeSym = Symbol.for('hoth.parse-start-time');

export default function (appConfig: FastifyRequest['$appConfig'], fastify: FastifyInstance) {
    return async function (req: FastifyRequest) {
        req[parseStartTimeSym] = performance.now();
        req.logid = req.logid
            || (req.headers.x_bd_logid as string)
            || (req.headers.logid as string)
            || uuid();
        req.$appConfig = appConfig;
        req.$service = fastify;
    };
}
