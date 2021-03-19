import {FastifyReply, FastifyRequest} from 'fastify';

export default function (name: string) {
    return function (error, req: FastifyRequest, reply: FastifyReply) {
        if (reply.statusCode < 400) {
            reply.log.info({
                req,
                res: reply,
                err: error,
                app: name,
            });
        }
        else {
            reply.log.fatal({
                req,
                res: reply,
                err: error,
                app: name,
            });
        }
    };
}
