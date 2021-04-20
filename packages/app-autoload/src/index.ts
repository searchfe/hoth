/**
 * @file app-autoload plugin
 * @author cxtom
 */

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import Config from 'config';
import {resolve, join, isAbsolute} from 'path';
import autoload from 'fastify-autoload';
import {existsSync, readdirSync} from 'fs';
import {FastifyInstance, FastifyPluginAsync, FastifyRequest} from 'fastify';
import fp from 'fastify-plugin';
import resolveFrom from 'resolve-from';
import {bootstrap} from '@hoth/decorators';
import {exit, loadModule} from '@hoth/utils';
import onErrorFactory from './hook/onErrorFactory';
import onResponse from './hook/onResponse';
import preHandlerFactory from './hook/preHandlerFactory';
import onRequestFactory from './hook/onRequestFactory';
import {preHandler as loggerMiddleware} from '@hoth/logger';
import {molecule} from '@hoth/molecule';

interface AppAutoload {
    dir: string;
    rootPath: string;
    prefix: string;
    name: string;
}

interface AppConfig {
    dir: string;
    prefix: string;
    name: string;
    rootPath: string;
    pluginConfig: {
        [name: string]: any;
    };
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
interface MoleculeController {
    ctrlPath: string;
    name: string;
    httpType: string;
    json?: boolean;
}

interface MoleculeConfig {
    controllers: MoleculeController[];
}

/**
 * 加载 molecule app
 */
async function loadMoleculeApp(appConfig: AppConfig, instance: FastifyInstance) {
    const moleculeConfPath = join(appConfig.dir, 'config/molecule.json');
    if (!existsSync(moleculeConfPath)) {
        return;
    }
    const {controllers} =  await loadModule(moleculeConfPath) as MoleculeConfig;

    controllers.forEach(item => {
        let httpType = item.httpType;
        let ctrlName = item.name;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        instance[httpType](`/${ctrlName}`, async (request: FastifyRequest, reply) => {
            let data = {} as any;

            if (httpType === 'post') {
                data = request.body || request.query || {};
            }
            else if (httpType === 'get') {
                data = request.query;
            }
            // 本地 mock 数据
            if (process.env.DATA_MOCK) {
                data = await loadModule(join(appConfig.dir, `mock/${ctrlName}.json`));
            }

            // @ts-ignore
            let ret = await instance.molecule(item.ctrlPath, data, {
                root: appConfig.dir,
                appName: appConfig.name,
                name: ctrlName,
                logger: instance.log,
            });
            if (item.json) {
                return ret ? {
                    statusCode: 200,
                    data: ret,
                } : {
                    statusCode: 500,
                    message: 'render error',
                };
            }
            return ret;
        });
    });
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

    // load module plugins
    if (appConfig.pluginConfig) {
        for await (const [name, config] of Object.entries(appConfig.pluginConfig)) {
            if (name === '@hoth/app-autoload') {
                if (config.prefix) {
                    appConfig.prefix = config.prefix;
                }
                continue;
            }
            let mod: any = resolveFrom.silent(appConfig.dir, name);
            mod = mod.__esModule ? mod.default : mod;
            if (mod) {
                await childInstance.register(mod, config);
            }
        }
    }

    const config = Config.util.loadFileConfigs(pluginAppConfig.configPath);
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

    // register app plugins
    const appEntryModule: FastifyPluginAsync = await loadModule(pluginAppConfig.entryPath);
    await appEntryModule(childInstance, {...appConfig});

    if (existsSync(pluginAppConfig.pluginPath)) {
        await childInstance.register(autoload, {
            dir: pluginAppConfig.pluginPath,
            dirNameRoutePrefix: false,
            ignorePattern: /.*(test|spec).js/,
            maxDepth: 2,
            options: {
                ...appConfig,
            },
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
    loadMoleculeApp(appConfig, childInstance);

    childInstance.addHook('onRequest', onRequestFactory(configProxy, childInstance));
    childInstance.addHook('preHandler', preHandlerFactory(appConfig.name));
    childInstance.addHook('preHandler', loggerMiddleware);
    childInstance.addHook('onResponse', onResponse);

    return childInstance;
}

async function loadPluginConfig(appRoot: string) {
    try {
        const result = await loadModule(join(appRoot, 'config/plugin'));
        return result;
    }
    catch (e) {
        return null;
    }
}

export async function getApps(opts: AppAutoload) {
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
        return;
    }

    let apps: AppConfig[] = [];

    if (existsSync(join(appRoot, 'app.js'))) {
        const pluginConfig = await loadPluginConfig(appRoot);
        apps = [{
            dir: appRoot,
            prefix,
            name: name || (prefix === '/' ? 'root' : prefix.slice(1)),
            rootPath,
            pluginConfig,
        }];
    }
    else {
        const dirs = readdirSync(appRoot, {withFileTypes: true});
        for (const dir of dirs) {
            const dirPath = resolve(appRoot, dir.name);
            if (dir.isDirectory() && existsSync(join(dirPath, 'app.js'))) {
                const pluginConfig = await loadPluginConfig(dirPath);
                apps.push({
                    dir: dirPath,
                    prefix: `${prefix}${prefix === '/' ? '' : '/'}${dir.name}`,
                    name: dir.name,
                    rootPath,
                    pluginConfig,
                });
            }
        }
    }

    if (apps.length <= 0) {
        exit(`app entry not found in ${dir}`);
        return;
    }

    return apps;
}

export default fp(async function (instance: FastifyInstance, opts: AppAutoload | AppsLoaded) {

    let apps: AppConfig[];
    if ((opts as AppsLoaded).apps) {
        apps = (opts as AppsLoaded).apps;
    }
    else {
        apps = await getApps(opts as AppAutoload);
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
