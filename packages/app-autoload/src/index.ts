/**
 * @file app-autoload plugin
 * @author cxtom
 */

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import Config from 'config';
import {resolve, join, isAbsolute} from 'path';
import autoload from 'fastify-autoload';
import {existsSync, readdirSync} from 'fs';
import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {bootstrap} from '@hoth/decorators';
import {exit, loadModule} from '@hoth/utils';

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
}

interface PluginAppConfig extends AppConfig {
    [key: string]: any;
    controllerPath: string;
    configPath: string;
    pluginPath: string;
    entryPath: string;
}

declare module 'fastify' {
    interface FastifyInstance {
        readonly appConfig: {
            get: (property: string) => any;
            has: (property: string) => boolean;
        };
    }
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

    const config = Config.util.loadFileConfigs(pluginAppConfig.configPath);
    Config.util.setModuleDefaults(appConfig.name, {
        ...config,
        ...appConfig,
    });

    childInstance.decorate('appConfig', {
        get(property: string | string[]) {
            const props = Array.isArray(property)
                ? [appConfig.name, ...property]
                : `${appConfig.name}.${property}`;
            if (Config.has(props)) {
                return Config.get(props);
            }
        },
    });

    // load controllers
    if (!existsSync(pluginAppConfig.controllerPath)) {
        exit(`Did not find \`controller\` dir in ${appConfig.dir}`);
        return;
    }
    await childInstance.register(bootstrap, {
        directory: pluginAppConfig.controllerPath,
        mask: /\.controller\.js$/,
        appName: appConfig.name,
    });

    // register app plugins
    const appEntryModule: FastifyPluginAsync = await loadModule(pluginAppConfig.entryPath);
    await childInstance.register(appEntryModule, {...appConfig});
    if (existsSync(pluginAppConfig.pluginPath)) {
        childInstance.register(autoload, {
            dir: pluginAppConfig.pluginPath,
            dirNameRoutePrefix: false,
            ignorePattern: /.*(test|spec).js/,
            maxDepth: 2,
            options: {
                ...appConfig,
            },
        });
    }

    return childInstance;
}

export default fp(async function (instance: FastifyInstance, opts: AppAutoload) {

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
        apps = [{
            dir: appRoot,
            prefix,
            name: name || (prefix === '/' ? 'root' : prefix.slice(1)),
            rootPath,
        }];
    }
    else {
        const dirs = readdirSync(appRoot, {withFileTypes: true});
        for (const dir of dirs) {
            const dirPath = resolve(appRoot, dir.name);
            if (dir.isDirectory() && existsSync(join(dirPath, 'app.js'))) {
                apps.push({
                    dir: dirPath,
                    prefix: `${prefix}${prefix === '/' ? '' : '/'}${dir}`,
                    name: dir.name,
                    rootPath,
                });
            }
        }
    }

    if (apps.length <= 0) {
        exit(`app entry not found in ${dir}`);
        return;
    }

    for await (const appConfig of apps) {
        await instance.register(load.bind(null, appConfig), {
            prefix: appConfig.prefix,
        });
    }

    console.log(apps);

    return;

}, {
    fastify: '3.x',
    name: '@hoth/app-autoload',
});
