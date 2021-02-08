import {Controller, ALL} from 'fastify-decorators';
import {FastifyReply} from 'fastify';

@Controller('/post')
export default class PostController {

    @ALL('/')
    addApp(req, reply: FastifyReply) {
        reply.send('ok');
    }
}
