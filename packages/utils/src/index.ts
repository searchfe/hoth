/**
 * @file utils
 * @author cxtom
 */

import resolveFrom from 'resolve-from';
import {pathToFileURL} from 'url';

export function exit(message?: string | Error) {
    if (message instanceof Error) {
        console.log(message.stack);
        return process.exit(1);
    }
    if (message) {
        console.log(`Warn: ${message}`);
        return process.exit(1);
    }
    process.exit();
}


export function requireFastifyForModule() {
    try {
        const basedir = process.env.ROOT_PATH || process.cwd();
        // eslint-disable-next-line
        const module = require(resolveFrom.silent(basedir, 'fastify') || 'fastify');
        return {module};
    }
    catch (e) {
        exit(`unable to load fastify module: ${(e as any).stack}`);
    }
}

/* istanbul ignore next */
export async function loadModule(module: string): Promise<any> {
    if (typeof require !== 'undefined') {
        /* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
        return require(module).__esModule ? require(module).default : require(module);
    }
    return import(pathToFileURL(module).toString()).then(m => m.default);
}

export function noop() {} // eslint-disable-line

export * as fs from './fs';