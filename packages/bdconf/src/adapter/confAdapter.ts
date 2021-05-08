/**
 * @file .conf 文件解析器
 */
import {loadConf} from '@baidu/configure';
import {IAdapter} from './adapter';

export class ConfAdapter implements IAdapter {
    static readonly dataType = 'conf';

    loadAsync(filePath: string): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            try {
                const data = loadConf(filePath);
                resolve(data);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    loadSync(filePath: string): Record<string, any> {
        try {
            return loadConf(filePath);
        }
        catch (err) {
            throw err;
        }
    }
}
