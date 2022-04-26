import fastify, {FastifyInstance} from 'fastify';
import foo from '../../../src/plugin/foo/index';

describe('Plugin: foo', () => {
    let instance: FastifyInstance;

    beforeEach(async () => {
        instance = fastify();
        instance.register(foo, 'some options');
        await instance.ready();
    });
    afterEach(() => jest.restoreAllMocks());

    it('should return opt', async () => {
        expect(instance.hoth).toBe('hoth');
    });
});
