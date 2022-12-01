import {performance} from 'perf_hooks';
import {FastifyReply, FastifyRequest} from 'fastify';
import {reqStartTimeSym} from './onRequestFactory';
import {parseStartTimeSym} from './preParsing';
import {validateStartTimeSym} from './preValidation';
import {handlerStartTimeSym} from './preHandlerFactory';
import {serializationTimeSym} from './preSerialization';
import {sendStartTimeSym} from './onSend';

declare module 'fastify' {
    interface FastifyLoggerInstance {
        notice: (...args: any[]) => void;
    }

    interface FastifyRequest {
        [reqStartTimeSym]: number;
        [parseStartTimeSym]: number;
        [validateStartTimeSym]: number;
        [handlerStartTimeSym]: number;
        [serializationTimeSym]: number;
        [sendStartTimeSym]: number;
    }
}

// Attention: https://www.fastify.io/docs/v3.19.x/Server/#disablerequestlogging
// 因为禁用disablerequestlogging，onResponse Hook的报错，会被吞掉
export default async function (req: FastifyRequest, reply: FastifyReply) {
    const now = performance.now();
    // 非post，不会执行preParse hook
    const parseStartTime = req[parseStartTimeSym] || req[reqStartTimeSym];
    // text响应不会执行preSerialization hook
    const serializationStartTime = req[serializationTimeSym] || req[sendStartTimeSym];

    req.log.addNotice('initTime', (parseStartTime - req[reqStartTimeSym]).toFixed(1));
    req.log.addNotice('parseTime', (req[validateStartTimeSym] - parseStartTime).toFixed(1));
    req.log.addNotice('validateTime', (req[handlerStartTimeSym] - req[validateStartTimeSym]).toFixed(1));
    req.log.addNotice('handleTime', (serializationStartTime - req[handlerStartTimeSym]).toFixed(1));
    req.log.addNotice('serialTime', (req[sendStartTimeSym] - serializationStartTime).toFixed(1));
    req.log.addNotice('sendTime', (now - req[sendStartTimeSym]).toFixed(1));

    reply.log.notice({
        req,
        res: reply,
        responseTime: reply.getResponseTime().toFixed(1),
    }, 'request completed');
}

