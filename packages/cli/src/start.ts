/**
 * @file start server
 * @author cxtom
 */

/* eslint-disable @typescript-eslint/await-thenable */

import Fastify, {FastifyReply, FastifyRequest, RouteOptions} from 'fastify';
import isDocker from 'is-docker';
import {existsSync} from 'fs';
import {join} from 'path';
import parseArgs, {Args} from './parseArgs';
import {exit, loadModule, requireFastifyForModule} from '@hoth/utils';
import appAutoload, {getApps} from '@hoth/app-autoload';
import createLogger, {pino} from '@hoth/logger';
import {showHelpForCommand} from './util';
import {warmup} from './start/warmup';
import closeWithGrace from 'close-with-grace';

const listenAddressDocker = '0.0.0.0';

// eslint-disable-next-line @typescript-eslint/init-declarations
let fastify: typeof Fastify;

// 初始化全局变量
if (!process.env.ROOT_PATH) {
    process.env.ROOT_PATH = process.cwd();
}

function loadFastify() {
    const {module: fastifyModule} = requireFastifyForModule()!;
    fastify = fastifyModule;
}

function initFinalLogger(logger: pino.Logger) {
    // use pino.final to create a special logger that
    // guarantees final tick writes
    return pino.final(logger, (err, finalLogger, evt) => {
        if (err) {
            finalLogger.fatal({err}, evt);
        }
        else {
            finalLogger.info(`${evt} caught`);
        }
        process.exit(err ? 1 : 0);
    });
}

async function runFastify(opts: Args) {

    loadFastify();

    const rootPath = process.env.ROOT_PATH || process.cwd();
    const apps = (await getApps({
        dir: opts.appDir,
        prefix: opts.appPrefix,
        name: opts.appName,
        rootPath,
    }))!;

    const logger = createLogger({
        apps,
        rootPath,
    });

    if (apps.length <= 0) {
        logger.warn('app not found!');
        exit();
        return;
    }

    const fastifyInstance = fastify({
        logger,
        disableRequestLogging: true,
        pluginTimeout: 60 * 1000,
    });

    const routes: RouteOptions[] = [];

    fastifyInstance.addHook('onRoute', routeOptions => {
        routes.push(routeOptions);
    });

    await fastifyInstance.register(appAutoload, {
        apps,
    });

    if (opts.healthcheckPath) {
        fastifyInstance.get(opts.healthcheckPath, async function (req: FastifyRequest, reply: FastifyReply) {
            reply.send('ok');
        });
    }

    const finalLogger = initFinalLogger(logger);

    // delay is the number of milliseconds for the graceful close to finish
    const closeListeners = closeWithGrace({delay: 500}, async function ({signal, err, manual}) {
        if (!manual) {
            finalLogger(err!, signal);
        }
        await fastifyInstance.close();
    } as closeWithGrace.CloseWithGraceAsyncCallback);

    // eslint-disable-next-line
    require('make-promises-safe').logError = async function (error: Error | string) {
        finalLogger(error instanceof Error ? error : null, error);
        await fastifyInstance.close();
    };

    fastifyInstance.addHook('onClose', async () => {
        closeListeners.uninstall();
    });

    const rootEntryPath = join(rootPath, 'main.js');
    if (existsSync(rootEntryPath)) {
        const entryMod = await loadModule(rootEntryPath);
        entryMod[Symbol.for('skip-override')] = true;
        try {
            await fastifyInstance.register(entryMod, {
                apps,
                rootPath
            });
        }
        catch (err) {
            finalLogger(err as any);
        }
    }

    // warmup
    try {
        await warmup(apps, fastifyInstance);
    }
    catch (e) {
        const errorMessage = (e && (e as any).message) || '';
        logger.fatal(`warmup error: ${errorMessage}`);
        process.exit(-1);
    }

    let address = '';
    if (opts.address) {
        address = await fastifyInstance.listen(opts.port, opts.address);
    }
    else /* istanbul ignore next */ if (opts.socket) {
        address = await fastifyInstance.listen(opts.socket);
    }
    else /* istanbul ignore next */ if (isDocker()) {
        address = await fastifyInstance.listen(opts.port, listenAddressDocker);
    }
    else {
        address = await fastifyInstance.listen(opts.port);
    }

    console.log(`Server listening on ${address}.`);
    for (const route of routes) {
        console.log('——', `${address}${route.url} (${route.method})`);
    }

    // for pm2 graceful start
    if (process.send) {
        process.send('ready');
        process.send('ready');
    }

    return fastifyInstance;
}


export async function start(args: string[]) {

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('dotenv').config();
    }

    const opts = parseArgs(args);

    if (opts.help) {
        return showHelpForCommand('start');
    }

    return runFastify(opts);
}

/* istanbul ignore next */
export function cli(args: string[]) {
    start(args);
}

/* istanbul ignore if */
if (require.main === module) {
    cli(process.argv.slice(2));
}
