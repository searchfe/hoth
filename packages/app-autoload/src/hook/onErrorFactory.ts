import {FastifyReply, FastifyRequest} from 'fastify';

export default function (name: string) {
    return function (req: FastifyRequest, reply: FastifyReply, error, done) {
        reply.log.fatal({
            req,
            res: reply,
            err: error,
            app: name,
        });
        done();
    };
}
