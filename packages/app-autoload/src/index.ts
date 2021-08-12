/**
 * @file app-autoload plugin
 * @author cxtom
 */

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
process.env.ALLOW_CONFIG_MUTATIONS = 'false';

import Config from 'config';
import {resolve, join, isAbsolute} from 'path';
import {existsSync, readdirSync} from 'fs';
import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import resolveFrom from 'resolve-from';
import {bootstrap} from '@hoth/decorators';
import {exit, loadModule} from '@hoth/utils';
import onErrorFactory from './hook/onErrorFactory';
import onSend from './hook/onSend';
import preHandlerFactory from './hook/preHandlerFactory';
import onRequestFactory from './hook/onRequestFactory';
import preValidation from './hook/preValidation';
import {preHandler as loggerMiddleware} from '@hoth/logger';
import {molecule} from '@hoth/molecule';
import {loadConfig} from './configLoader';
import pluginLoader from './pluginLoader';
import {loadMoleculeApp} from './loadMoleculeApp';
import type {WarmupConf} from 'fastify-warmup';
interface AppAutoload {
    dir: string;
    rootPath: string;
    prefix: string;
    name: string;
}

export interface AppConfig {
    dir: string;
    prefix: string;
    name: string;
    rootPath: string;
    pluginConfig: {
        [name: string]: any;
    };
    warmupConfig: WarmupConf;
}
interface AppsLoaded {
    apps: AppConfig[];
}
interface PluginAppConfig extends AppConfig {
    [key: string]: any;
    controllerPath: string;
    configPath: string;
    pluginPath: string;
    entryPath: string;
}

async function load(appConfig: AppConfig, childInstance: FastifyInstance) {
    const pluginAppConfig: PluginAppConfig = {
        ...appConfig,
        controllerPath: join(appConfig.dir, 'controller'),
        configPath: join(appConfig.dir, 'config'),
        pluginPath: join(appConfig.dir, 'plugin'),
        entryPath: join(appConfig.dir, 'app.js'),
    };

    // load config
    if (!existsSync(pluginAppConfig.configPath)) {
        exit(`Did not find \`config\` dir in ${appConfig.dir}`);
        return;
    }

    childInstance.setErrorHandler(onErrorFactory(appConfig.name));

    const config = Config.util.loadFileConfigs(pluginAppConfig.configPath);
    Config[appConfig.name] = {};
    Config.util.setModuleDefaults(appConfig.name, {
        ...config,
        ...appConfig,
    });

    const configProxy = {
        get(property: string | string[]) {
            const props = Array.isArray(property)
                ? [appConfig.name, ...property]
                : `${appConfig.name}.${property}`;
            if (Config.has(props)) {
                return Config.get(props);
            }
        },
    };

    childInstance.decorate('$appConfig', configProxy);
    childInstance.decorate('molecule', molecule);

    // load module plugins
    if (appConfig.pluginConfig) {
        for (const [name, config] of Object.entries(appConfig.pluginConfig)) {
            if (!config) {
                continue;
            }
            let mod: any = resolveFrom.silent(appConfig.dir, name);
            if (mod) {
                mod = require(mod);
                mod = mod.__esModule ? mod.default : mod;
                childInstance.register(mod, config);
            }
        }
    }

    // register app plugins
    const appEntryModule: FastifyPluginAsync = await loadModule(pluginAppConfig.entryPath);
    // @ts-ignore
    appEntryModule[Symbol.for('skip-override')] = true;
    await childInstance.register(appEntryModule, {...appConfig});

    if (existsSync(pluginAppConfig.pluginPath)) {
        await childInstance.register(pluginLoader, {
            dir: pluginAppConfig.pluginPath,
            options: {...appConfig},
        });
    }

    // load controllers
    if (existsSync(pluginAppConfig.controllerPath)) {
        await childInstance.register(bootstrap, {
            directory: pluginAppConfig.controllerPath,
            mask: /\.controller\.js$/,
            appName: appConfig.name,
        });
    }

    // load molecule
    await loadMoleculeApp(appConfig, childInstance);

    childInstance.addHook('preValidation', preValidation);
    childInstance.addHook('onRequest', onRequestFactory(configProxy, childInstance));
    childInstance.addHook('preHandler', loggerMiddleware);
    childInstance.addHook('preHandler', preHandlerFactory(appConfig.name));
    childInstance.addHook('onSend', onSend);

    return childInstance;
}

export async function getApps(opts: AppAutoload): Promise<AppConfig[]> {
    const {
        dir,
        rootPath,
        prefix,
        name,
    } = opts;

    let appRoot = dir;
    if (!isAbsolute(appRoot)) {
        appRoot = resolve(rootPath, dir);
    }

    if (!existsSync(appRoot)) {
        exit(`app root "${dir}" not exists!`);
    }

    let apps: AppConfig[] = [];

    if (existsSync(join(appRoot, 'app.js'))) {
        const configs = await loadConfig(appRoot);
        let appPrefix = prefix;
        if (configs.pluginConfig && configs.pluginConfig['@hoth/app-autoload']) {
            appPrefix = configs.pluginConfig['@hoth/app-autoload'].prefix || appPrefix;
            delete configs.pluginConfig['@hoth/app-autoload'];
        }
        apps = [{
            dir: appRoot,
            prefix: appPrefix,
            name: name || (prefix === '/' ? 'root' : prefix.slice(1)),
            rootPath,
            ...configs,
        }];
    }
    else {
        const dirs = readdirSync(appRoot, {withFileTypes: true});
        for (const dir of dirs) {
            const dirPath = resolve(appRoot, dir.name);
            if (dir.isDirectory() && existsSync(join(dirPath, 'app.js'))) {
                const configs = await loadConfig(dirPath);
                let appPrefix = prefix;
                if (configs.pluginConfig && configs.pluginConfig['@hoth/app-autoload']) {
                    appPrefix = configs.pluginConfig['@hoth/app-autoload'].prefix || appPrefix;
                    delete configs.pluginConfig['@hoth/app-autoload'];
                }
                apps.push({
                    dir: dirPath,
                    prefix: appPrefix === '/' ? `/${dir.name}` : appPrefix,
                    name: dir.name,
                    rootPath,
                    ...configs,
                });
            }
        }
    }

    if (apps.length <= 0) {
        exit(`app entry not found in ${dir}`);
    }

    return apps;
}

export default fp(async function (instance: FastifyInstance, opts: AppAutoload | AppsLoaded) {

    let apps: AppConfig[];
    if ((opts as AppsLoaded).apps) {
        apps = (opts as AppsLoaded).apps;
    }
    else {
        apps = (await getApps(opts as AppAutoload))!;
    }

    for await (const appConfig of apps) {
        await instance.register(load.bind(null, appConfig), {
            prefix: appConfig.prefix,
        });
    }

    return;

}, {
    fastify: '3.x',
    name: '@hoth/app-autoload',
});
