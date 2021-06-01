import {Controller, GET, Inject} from '@hoth/decorators';
import {FastifyReply, FastifyRequest} from 'fastify';

@Controller('/index')
export default class AppController {

    @GET({
        url: '',
        options: {
            schema: {
                querystring: {$ref: 'hoth/aaa.ts#/definitions/bbb'}
            }
        }
    })
    getApp(req: FastifyRequest, reply: FastifyReply) {

        return '';
    }
}
