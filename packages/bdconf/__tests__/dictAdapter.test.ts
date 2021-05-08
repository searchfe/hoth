import path from 'path';

import {DictAdapter} from '../src/adapter/dictAdapter';

const adapter = new DictAdapter();
let pathname = './__tests__/conf/demo';

describe('DictAdapter', () => {
    test('DictAdapter loadSync', () => {
        let filePath = path.resolve(pathname, 'dict2.dict');
        let data = adapter.loadSync(filePath);

        expect(data.card).toBeTruthy();
        expect(data['card-demo']).toBeTruthy();
        expect(data.errro_test).toBeUndefined();
        expect(data.errro_test2).toBeUndefined();
    });

    test('DictAdapter loadSync error', () => {
        let filePath = path.resolve(pathname, 'tt.dict');
        expect(() => {
            adapter.loadSync(filePath);
        }).toThrow();
    });

    test('DictAdapter loadAsync', async () => {
        let filePath = path.resolve(pathname, 'dict2.dict');
        let data = await adapter.loadAsync(filePath);
        expect(data.card).toBeTruthy();
        expect(data['card-demo']).toBeTruthy();
        expect(data.errro_test).toBeUndefined();
        expect(data.errro_test2).toBeUndefined();
    });

    test('DictAdapter loadAsync error', () => {
        let filePath = path.resolve(pathname, 'xx.dict');
        return expect(adapter.loadAsync(filePath)).rejects.toThrow();
    });
});
