import {compileInterface} from '../src/index';
import File from 'vinyl';
import path from 'path';
import {promises as fs} from 'fs';

jest.setTimeout(30000);

describe('hoth schema gulp', () => {
    it('compile ts', async () => {
        const contents = await fs.readFile(path.resolve(__dirname, './sample/index.ts'));
        const fakeFile = new File({
            path: path.resolve(__dirname, './sample/index.ts'),
            contents
        });

        const gulpPlugin = compileInterface({fileName: 'outputFile.json'});

        await new Promise(resolve => {
            gulpPlugin.once('data', file => {
                expect(file._isVinyl).toBeTruthy();
                expect(file.path.endsWith('outputFile.json')).toBeTruthy();
                resolve(0);
            });
            gulpPlugin.end(fakeFile);
        });
    });
});