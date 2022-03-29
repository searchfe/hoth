import {Controller, GET} from '@hoth/decorators';
import type {FastifyReply, FastifyRequest} from 'fastify';

@Controller('/index')
export default class AppController {

    @GET()
    async getApp(req: FastifyRequest, reply: FastifyReply) {
        const ssrPath = `${req.$appConfig.get('dir')}/ssr`;
        const render = await import(`${ssrPath}/App`);
        const data = {
            message: 'Hello World!',
        };
        const html = render.default(data);
        reply.render('index.tpl', {
            html,
            data,
        });
    }
}
