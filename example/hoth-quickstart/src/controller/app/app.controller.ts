import {Controller, getFastifyInstanceByAppName, GET} from '@hoth/decorators';
import {FastifyReply, FastifyRequest} from 'fastify';

@Controller('/app')
export default class AppController {

    private readonly service = getFastifyInstanceByAppName('quickstart');

    @GET()
    getApp(req: FastifyRequest, reply: FastifyReply) {
        reply.log.info(`config test value ${req.$appConfig.get('test')}`);
        reply.log.error({err: new Error('hello1')});
        reply.log.warn('test error');
        reply.send('ok');
    }
}
