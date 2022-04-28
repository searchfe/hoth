import main from '../../server/app';
import fastify from 'fastify';
import path from 'path';

describe('main', () => {
    it('should init', async () => {
        const instance = fastify();

        // @ts-ignore
        main[Symbol.for('skip-override')] = true;
        instance.register(main, {
            dir: path.resolve(__dirname, '../../dist'),
        });
        await instance.ready();

        expect(instance.hasReplyDecorator('render')).toBe(true);
        const res = await instance.inject({
            url: '/static/js/main.js'
        });
        expect(res.statusCode).toBe(200);
    });
});
