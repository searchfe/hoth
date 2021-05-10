/**
  * @file .json 文件解析器
  */

import {IAdapter} from './adapter';
import fs from 'fs';
export class JsonAdapter implements IAdapter {
    static readonly dataType = 'json';

    loadSync(filePath: string): Record<string, any> {
        try {
            const content = fs.readFileSync(filePath).toString();
            const data = JSON.parse(content);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    async loadAsync(filePath: string): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const data = JSON.parse(content.toString());
                        resolve(data);
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }
}
