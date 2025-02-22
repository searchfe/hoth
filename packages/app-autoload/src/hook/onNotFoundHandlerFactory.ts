import {FastifyReply, FastifyRequest} from 'fastify';

export default function (name: string) {

    // https://fastify.dev/docs/latest/Reference/Server/#seterrorhandler
    // setErrorHandler will not catch:
    //  errors thrown in an onResponse hook because the response has already been sent to the client. Use the onSend hook instead.
    //  not found (404) errors. Use setNotFoundHandler instead.
    return function (req: FastifyRequest, reply: FastifyReply) {
        /* istanbul ignore next */
        reply.code(404);
        reply.log.fatal({
            // req,
            res: reply,
            app: name,
        });
        reply.send('Not Found');
    };
}
