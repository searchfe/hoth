import {FastifyReply, FastifyRequest} from 'fastify';

declare module 'fastify' {
    interface FastifyLoggerInstance {
        notice: (...args: any[]) => void;
    }
}

export default async function (req: FastifyRequest, reply: FastifyReply) {
    const responseTime = reply.getResponseTime();
    reply.log.notice({
        req,
        res: reply,
        responseTime: responseTime.toFixed(1),
    }, 'request completed');
    reply.header('X-Response-Time', responseTime);
    reply.removeHeader('X-Powered-By');
}
