import fastify from 'fastify';
import moleculePlugin from '../src/index';
const f = fastify();

describe('molecule index test', () => {
    it('test moleculePlugin', () => {
        moleculePlugin(f, {}, () => {});
        // @ts-ignore
        expect(typeof f.molecule).toBe('function');
    });
});
