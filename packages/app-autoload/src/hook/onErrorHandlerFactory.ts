import {FastifyReply, FastifyRequest} from 'fastify';

export default function (name: string) {

    // https://fastify.dev/docs/latest/Reference/Server/#seterrorhandler
    // setErrorHandler will not catch:
    //  errors thrown in an onResponse hook because the response has already been sent to the client. Use the onSend hook instead.
    //  not found (404) errors. Use setNotFoundHandler instead.
    return function (error: Error, req: FastifyRequest, reply: FastifyReply) {
        /* istanbul ignore next */
        reply.log.fatal({
            req,
            res: reply,
            err: error,
            app: name,
        });

        reply.send(error);
    };
}
