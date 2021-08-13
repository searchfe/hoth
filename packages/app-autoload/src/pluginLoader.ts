import fp from 'fastify-plugin';
import {promises} from 'fs';
import path from 'path';
import type {FastifyInstance} from 'fastify';
import {pathToFileURL} from 'url';

const {readdir, stat} = promises;

interface PluginLoaderOptions {
    dir: string;
    options?: Record<string, unknown>;
    dirNameRoutePrefix?: boolean;
}

interface PluginItem {
    file: string;
}

type PluginTree = Record<string, PluginItem[]>;

const scriptPattern = /((^.?|\.[^d]|[^.]d|[^.][^d])\.js|\.cjs|\.mjs)$/i;

async function findPlugins(dir: string, pluginTree: PluginTree = {}, prefix: string = '/', depth: number = 0) {
    const list = await readdir(dir, {
        withFileTypes: true
    });

    pluginTree[prefix] = pluginTree[prefix] || [];

    for await (const dirent of list) {

        const atMaxDepth = 2 <= depth;
        const file = path.join(dir, dirent.name);

        if (dirent.isDirectory() && !atMaxDepth) {
            await findPlugins(file, pluginTree, `${prefix}${prefix.endsWith('/') ? '' : '/'}${dirent.name}`, depth + 1);
        }
        else if (dirent.isFile() && scriptPattern.test(dirent.name)) {
            pluginTree[prefix].push({
                file,
            });
        }
        else if (dirent.isSymbolicLink() && scriptPattern.test(dirent.name)) {
            const fileStat = await stat(file);
            if (fileStat.isFile()) {
                pluginTree[prefix].push({
                    file,
                });
            }
        }
    }

    return pluginTree;
}

function loadModule(file: string) {
    if (typeof require !== 'undefined') {
        /* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
        return require(file);
    }
    return import(pathToFileURL(file).toString());
}

export default fp(async function pluginAutoLoad(fastify: FastifyInstance, opts: PluginLoaderOptions) {

    const pluginTree = await findPlugins(opts.dir);

    for await (const [prefix, pluginArray] of Object.entries(pluginTree)) {
        if (pluginArray.length <= 0) {
            continue;
        }

        for await (const {file} of pluginArray) {
            const content = await loadModule(file);
            const plugin = content.default || content;

            if (plugin.autoload === false || content.autoload === false) {
                continue;
            }

            const pluginConfig = (content.default && content.default.autoConfig) || content.autoConfig || {};
            const pluginOptions = {
                ...pluginConfig,
                ...opts.options
            };

            if (opts.dirNameRoutePrefix) {
                pluginOptions.prefix = prefix;
            }

            plugin[Symbol.for('skip-override')] = true;

            await fastify.register(plugin, pluginOptions);
        }
    }

}, {
    name: '@hoth/app-plugin-autoload'
});
