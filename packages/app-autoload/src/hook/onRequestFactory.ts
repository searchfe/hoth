import {performance} from 'perf_hooks';

export const parseStartTimeSym = Symbol.for('hoth.parse-start-time');

export default function (appConfig, fastify) {
    return function (req, reply, done) {
        req.$appConfig = appConfig;
        req.$appConfData = fastify.$appConfData;
        req.$service = fastify;
        req[parseStartTimeSym] = performance.now();
        done();
    };
}
