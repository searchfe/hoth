import {FastifyReply, FastifyRequest} from 'fastify';
import uuid from 'uuid-random';

export default function (app: string) {
    return function (req: FastifyRequest, reply: FastifyReply, done) {
        req.logid = req.logid || (req.headers.logid as string) || uuid();
        req.log = reply.log = reply.log.child({req, app});
        done();
    };
}
