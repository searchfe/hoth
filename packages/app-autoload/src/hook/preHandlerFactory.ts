import {FastifyReply, FastifyRequest} from 'fastify';
import {performance} from 'perf_hooks';
import {parseStartTimeSym} from './onRequestFactory';
import {validateStartTimeSym} from './preValidation';

declare module 'fastify' {
    interface FastifyRequest {
        [validateStartTimeSym]: number;
        [parseStartTimeSym]: number;
    }
}

export default function (app: string) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        req.log = reply.log = reply.log.child({req, app});
        req.log.addNotice('parseTime', (req[validateStartTimeSym] - req[parseStartTimeSym]).toFixed(1));
        req.log.addNotice('validationTime', (performance.now() - req[validateStartTimeSym]).toFixed(1));
    };
}
