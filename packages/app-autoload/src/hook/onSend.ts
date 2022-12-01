import {FastifyReply, FastifyRequest} from 'fastify';
import {performance} from 'perf_hooks';

export const sendStartTimeSym = Symbol.for('hoth.send-start-time');

export default async function (req: FastifyRequest, reply: FastifyReply) {
    const resTime = reply.getResponseTime();
    req[sendStartTimeSym] = performance.now();
    reply.header('X-Response-Time', resTime);
    reply.removeHeader('X-Powered-By');
}
