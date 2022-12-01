import {FastifyReply, FastifyRequest} from 'fastify';
import {performance} from 'perf_hooks';

export const handlerStartTimeSym = Symbol.for('hoth.handler-start-time');

export default function (app: string) {
    return async function (req: FastifyRequest, reply: FastifyReply) {
        req[handlerStartTimeSym] = performance.now();
        req.log = reply.log = reply.log.child({req, app});

        // 业务需要 req.log.fatal({req, err}, 'msg'); 才能触发serializers对应的req序列化，才能在fatal里拿到notices信息
        // 为了简化成 req.log.fatal(err) 或者 req.log.fatal({err}, 'msg');
        ['warn', 'fatal', 'error'].forEach((level: string) => {
            const ori = (req.log as any)[level];
            (req.log as any)[level] = (...args: any[]) => {
                const obj = args[0];
                // 从对象提取出非 req、res、err、app字段，放置extraInfo，会自动加入日志
                if (obj && obj.constructor === Object) {
                    const extraInfo: any = {};
                    const resOb: any = {};
                    for (const key of Object.keys(obj)) {
                        if (['req', 'res', 'err', 'app'].includes(key)) {
                            resOb[key] = obj[key];
                        }
                        else {
                            extraInfo[key] = obj[key];
                        }
                    }
                    // 默认增加req
                    resOb.req = resOb.req || req;
                    args[0] = resOb;
                }
                // 默认增加req
                else if (obj instanceof Error) {
                    args[0] = {
                        err: obj,
                        req,
                    };
                }
                // 默认增加req
                else if (typeof obj === 'string') {
                    args[0] = {
                        msg: obj,
                        req,
                    };
                }
                ori.apply(req.log, args);
            };
        });
    };
}
