import type {compileInterfaceToSchema} from './gulp';
export {initSchema} from './plugin';

export function compileInterface(options: Parameters<typeof compileInterfaceToSchema>[0]) {
    const originCompileInterfaceToSchema = require('./gulp').compileInterfaceToSchema;
    return originCompileInterfaceToSchema(options);
}
