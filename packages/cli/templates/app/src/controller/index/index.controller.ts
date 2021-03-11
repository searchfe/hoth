import {Controller, GET} from '@hoth/decorators';
import {FastifyReply, FastifyRequest} from 'fastify';

@Controller('/index')
export default class AppController {

    @GET()
    getApp(req: FastifyRequest, reply: FastifyReply) {
        reply.view('index.tpl', {
            name: req.$appConfig.get('name'),
            foo: req.$appConfig.get('foo'),
        });
    }
}
