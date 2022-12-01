import {Controller, GET, Inject} from '@hoth/decorators';
import type {FastifyReply, FastifyRequest} from 'fastify';
import Calculator from '../../lib/calc/index.service';

@Controller('/index')
export default class AppController {

    @Inject(Calculator)
    private readonly service!: Calculator;

    @GET()
    getApp(req: FastifyRequest, reply: FastifyReply) {
        // test for log
        // try {
        //     (reply as any).sss('aa');
        // }
        // catch (e) {
        //     req.log.addNotice('type', 'black');
        //     req.log.addField('os', 'ios');
        //     req.log.fatal(e);
        //     req.log.fatal(e, 'handle error');
        //     req.log.fatal({req, from: 'home'}, 'handle error');
        // }
        reply.view('index.tpl', {
            name: req.$appConfig.get('name'),
            foo: req.$appConfig.get('foo'),
            num: this.service.add(1, 1),
        });
    }
}

