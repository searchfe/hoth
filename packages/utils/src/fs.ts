/**
 * @file this file is supposed to replace 'fa-extra' for the reason that most
 * APIs have already been provided in Node.js v14 or newer. We can remove some
 * deps and progressively move to new APIs by using this file.
 */
import fs, {promises as fsPromises} from 'fs';

export async function rm(path: string, options?: Parameters<typeof fsPromises.rm>[1]) {
    // @ts-ignore
    if (fsPromises.rm) {
        return fsPromises.rm(path, options);
    }

    // below Node.js v14.14
    // remove when we stop support Node.js v12
    return fsPromises.rmdir(path, {
        recursive: options?.recursive
    });
}

export function rmSync(path: string, options?: Parameters<typeof fs.rmSync>[1]) {
    // @ts-ignore
    if (fs.rmSync) {
        return fs.rmSync(path, options);
    }

    return fs.rmdirSync(path, {
        recursive: options?.recursive
    });
}

export async function readJson(path: string) {
    const content = await fsPromises.readFile(path, 'utf-8');
    return JSON.parse(content);
}

export function readJsonSync(path: string) {
    const content = fs.readFileSync(path, 'utf-8');
    return JSON.parse(content);
}
