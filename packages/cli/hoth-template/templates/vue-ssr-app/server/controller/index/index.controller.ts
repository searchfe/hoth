import {Controller, GET, Inject} from '@hoth/decorators';
import type {FastifyReply, FastifyRequest} from 'fastify';
import VueSsrEngine from '../../lib/vue-ssr-engine/index.service';

@Controller('/index')
export default class AppController {

    @Inject(VueSsrEngine)
    private readonly engine!: VueSsrEngine;

    @GET()
    async getApp(req: FastifyRequest, reply: FastifyReply) {
        const ssrPath = `${req.$appConfig.get('dir')}/ssr`;
        const Component = await import(`${ssrPath}/js/app`);
        const data = {
            message: 'Hello World!',
        };
        const html = await this.engine.render(Component.default, data);
        reply.render('index.tpl', {
            html,
            data,
        });
    }
}
