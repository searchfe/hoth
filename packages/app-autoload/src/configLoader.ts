import {loadModule} from '@hoth/utils';
import {join} from 'path';

async function loadConfigModule(appRoot: string, subPath: string) {
    try {
        const result = await loadModule(join(appRoot, `config/${subPath}`));
        return result;
    }
    catch (e) {
        return null;
    }
}

export async function loadConfig(appRoot: string) {
    const [
        pluginConfig,
        warmupConfig,
        threadConfig
    ] = await Promise.all([
        loadConfigModule(appRoot, 'plugin'),
        loadConfigModule(appRoot, 'warmup'),
        loadConfigModule(appRoot, 'thread')
    ]);

    return {
        pluginConfig,
        warmupConfig,
        threadConfig
    };
}
