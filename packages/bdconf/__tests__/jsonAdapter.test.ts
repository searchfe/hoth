import path from 'path';

import {JsonAdapter} from '../src/adapter/jsonAdapter';

const jsonAdapter = new JsonAdapter();
let pathname = './__tests__/conf/demo';

describe('JsonAdapter', () => {
    test('JsonAdapter loadSync', () => {
        let filePath = path.resolve(pathname, 'conf.json');

        let data = jsonAdapter.loadSync(filePath);
        expect(data.dicts.length).toBeGreaterThan(1);
    });
    test('JsonAdapter loadSync error', () => {
        let filePath = path.resolve(pathname, 'tt.json');
        expect(() => {
            jsonAdapter.loadSync(filePath);
        }).toThrow();
    });
    test('JsonAdapter loadAsync', async () => {
        let filePath = path.resolve(pathname, 'conf.json');
        let data = await jsonAdapter.loadAsync(filePath);
        expect(data.dicts.length).toBeGreaterThan(1);
    });
    test('JsonAdapter loadAsync error', () => {
        let filePath = path.resolve(pathname, 'tt.json');
        return expect(jsonAdapter.loadAsync(filePath)).rejects.toThrow();
    });
});

