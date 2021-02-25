import {Controller, ALL, getFastifyInstanceByAppName} from '@hoth/decorators';
import {FastifyReply} from 'fastify';
import '@hoth/app-autoload';

@Controller('/post')
export default class PostController {

    private readonly service = getFastifyInstanceByAppName('hoth');

    @ALL('/')
    addApp(req, reply: FastifyReply) {
        console.log(this.service.appConfig.get('test'));
        reply.send('ok');
    }
}
