import {initSchema, compileInterface} from '../src/index';

describe('hoth schema index', () => {
    it('export function', () => {
        expect(typeof initSchema).toBe('function');
        expect(typeof compileInterface).toBe('function');
    });
});
