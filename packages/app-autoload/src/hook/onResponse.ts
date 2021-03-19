import {FastifyReply, FastifyRequest} from 'fastify';

declare module 'fastify' {
    interface FastifyLoggerInstance {
        notice: (...args: any[]) => void;
    }
}

export default function (req: FastifyRequest, reply: FastifyReply, done) {
    const responseTime = reply.getResponseTime();
    reply.log.notice({
        req,
        res: reply,
        responseTime: responseTime.toFixed(1),
    }, 'request completed');
    done();
}
