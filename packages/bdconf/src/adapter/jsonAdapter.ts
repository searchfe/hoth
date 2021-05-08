/**
  * @file .json 文件解析器
  */

import {IAdapter} from './adapter';

export class JsonAdapter implements IAdapter {
    static readonly dataType = 'json';

    loadSync(filePath: string): Record<string, any> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const data = require(filePath);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    async loadAsync(filePath: string): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const data = require(filePath);
                resolve(data);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
