import {FastifyReply, FastifyRequest} from 'fastify';

export default function (app: string) {
    return function (req: FastifyRequest, reply: FastifyReply, done) {
        req.log = reply.log = reply.log.child({req, app});
        done();
    };
}
