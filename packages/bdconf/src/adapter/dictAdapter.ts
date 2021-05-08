/**
  * @file .dict 文件解析器
  */

import fs from 'fs';
import readline from 'readline';
import {IAdapter} from './adapter';
export class DictAdapter implements IAdapter {
    static readonly dataType = 'dict';

    async loadAsync(filePath: string): Promise<any> {
        let data: Record<string, string> = {};
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(filePath)) {
                reject(new Error(`${filePath} not exist`));
                return;
            }
            const inputStream = fs.createReadStream(filePath);
            const reader = readline.createInterface({input: inputStream});

            reader.on('line', line => {
                const fields = line.split('\t');

                if (fields.length === 2) {
                    data[fields[0]] = fields[1];
                }
            }).on('close', () => {
                resolve(data);
            }).on('error', err => {
                reject(err);
            });
        });
    }

    loadSync(filePath: string): Record<string, any> {
        try {
            let data: Record<string, string> = {};

            const content = fs.readFileSync(filePath);
            content.toString().split('\n').forEach(line => {
                const fields = line.split('\t');
                if (fields.length === 2) {
                    data[fields[0]] = fields[1];
                }
            });
            return data;
        }
        catch (err) {
            throw err;
        }
    }
}
