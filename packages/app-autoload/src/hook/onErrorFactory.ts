import {FastifyReply, FastifyRequest} from 'fastify';

export default function (name: string) {
    return function (error: Error, req: FastifyRequest, reply: FastifyReply) {
        /* istanbul ignore next */
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
        reply.send(error);
    };
}
