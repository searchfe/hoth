import {FastifyReply, FastifyRequest} from 'fastify';
import uuid from 'uuid-random';
import {performance} from 'perf_hooks';
import {parseStartTimeSym} from './onRequestFactory';
import {validateStartTimeSym} from './preValidation';

declare module 'fastify' {
    interface FastifyRequest {
        [validateStartTimeSym]: number;
        [parseStartTimeSym]: number
    }
}

export default function (app: string) {
    return function (req: FastifyRequest, reply: FastifyReply, done) {
        req.logid = req.logid
            || (req.headers.x_bd_logid as string)
            || (req.headers.logid as string)
            || uuid();
        req.log = reply.log = reply.log.child({req, app});
        req.log.addNotice('parseTime', (req[validateStartTimeSym] - req[parseStartTimeSym]).toFixed(1));
        req.log.addNotice('validationTime', (performance.now() - req[validateStartTimeSym]).toFixed(1));
        done();
    };
}
