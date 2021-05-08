import path from 'path';
import {ConfAdapter} from '../src/adapter/confAdapter';

const adapter = new ConfAdapter();
let pathname = './__tests__/conf/demo';

describe('BdConfAdapter', () => {
    test('BdConfAdapter loadSync', () => {
        let filePath = path.resolve(pathname, 'dict1.conf');
        let data = adapter.loadSync(filePath);

        expect(data.demo.pathname).toBeTruthy();
        expect(data.demo2.pathname).toBeTruthy();

        filePath = path.resolve(pathname, 'dict3.conf');
        let data2 = adapter.loadSync(filePath);
        expect(data2.demo_variable).toBeTruthy();
    });

    test('BdConfAdapter loadSync error', () => {
        let filePath = path.resolve(pathname, 'tt.conf');
        expect(() => {
            adapter.loadSync(filePath);
        }).toThrow();
    });

    test('BdConfAdapter loadAsync', async () => {
        let filePath = path.resolve(pathname, 'dict1.conf');

        let data = await adapter.loadAsync(filePath);
        expect(data.demo.pathname).toBeTruthy();
        expect(data.demo2.pathname).toBeTruthy();
    });

    test('BdConfAdapter loadAsync error', () => {
        let filePath = path.resolve(pathname, 'tt.conf');

        return expect(adapter.loadAsync(filePath)).rejects.toThrow();
    });
});
