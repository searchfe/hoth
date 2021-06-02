
import type {FastifyReply, FastifyRequest, RequestGenericInterface} from 'fastify';
import {Controller, GET, Hook, Inject} from '@hoth/decorators';
import Calculator from '../../lib/calculator/index.service';

interface requestGeneric extends RequestGenericInterface {
    Querystring: {
        forceError: string;
    };
}

@Controller('/app')
export default class AppController {

    @Inject(Calculator)
    private readonly service!: Calculator;

    @Hook('preHandler')
    async preHandler(req: FastifyRequest<requestGeneric>) {
        req.module = 'test';
        console.log('in controller');
    }

    @GET()
    getApp(req: FastifyRequest<requestGeneric>, reply: FastifyReply) {
        reply.log.info(`config test value ${req.$appConfig.get('test')}`);
        reply.log.error({err: new Error('hello1')});
        reply.log.warn('test error');
        reply.log.addNotice('foo', 'test');
        reply.log.addPerformance('foo', 1.3322);
        console.log(this.service.add(1, 1));

        if (req.query.forceError) {
            throw new TypeError('force error');
        }

        reply.send('ok');
    }

    @GET("/other")
    other(req: FastifyRequest, reply: FastifyReply) {
        reply.send('other ok');
    }
}
