import {Controller, GET, Hook} from '@hoth/decorators';
import {FastifyReply, FastifyRequest} from 'fastify';

@Controller('/app')
export default class AppController {

    @Hook('preHandler')
    async preHandler() {
        console.log('in controller');
    }

    @GET()
    getApp(req: FastifyRequest, reply: FastifyReply) {
        reply.log.info(`config test value ${req.$appConfig.get('test')}`);
        reply.log.error({err: new Error('hello1')});
        reply.log.warn('test error');
        reply.send('ok');
    }
}
