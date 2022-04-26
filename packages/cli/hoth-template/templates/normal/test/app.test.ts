import main from '../src/app';
import fastify from 'fastify';
import path from 'path';

describe('main', () => {
    it('should init', async () => {
        const instance = fastify();

        // @ts-ignore
        main[Symbol.for('skip-override')] = true;
        instance.register(main, {
            dir: path.resolve(__dirname, '../src'),
        });
        await instance.ready();

        expect(instance.hasReplyDecorator('view')).toBe(true);
    });
});
