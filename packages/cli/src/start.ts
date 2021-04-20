/**
 * @file start server
 * @author cxtom
 */

/* eslint-disable @typescript-eslint/await-thenable */

import Fastify, {FastifyReply, FastifyRequest} from 'fastify';
import pino from 'pino';
import isDocker from 'is-docker';
import parseArgs from './parseArgs';
import {exit, requireFastifyForModule} from '@hoth/utils';
import appAutoload, {getApps} from '@hoth/app-autoload';
import createLogger from '@hoth/logger';
import {showHelpForCommand} from './util';
import {warmup} from './start/warmup';

const listenAddressDocker = '0.0.0.0';

let fastify: typeof Fastify;

function loadFastify() {
    try {
        const {module: fastifyModule} = requireFastifyForModule();
        fastify = fastifyModule;
    }
    catch (e) {
        exit(e);
    }
}

async function runFastify(opts) {

    loadFastify();

    // if (opts.debug) {
    //     if (process.version.match(/v[0-6]\..*/g)) {
    //         exit('Debug mode not compatible with Node.js version < 6');
    //     }
    //     else {
    //         // eslint-disable-next-line
    //         require('inspector').open(
    //             opts.debugPort,
    //             opts.debugHost || isDocker() ? listenAddressDocker : undefined
    //         );
    //     }
    // }

    const rootPath = process.env.ROOT_PATH || process.cwd();
    const apps = await getApps({
        dir: opts.appDir,
        prefix: opts.appPrefix,
        name: opts.appName,
        rootPath,
    });

    const logger = createLogger({
        apps,
        rootPath,
    });

    const fastifyInstance = fastify({
        logger,
        disableRequestLogging: true,
        pluginTimeout: 60 * 1000,
    });

    // eslint-disable-next-line
    require('make-promises-safe').logError = function (error) {
        fastifyInstance.log.fatal(error instanceof Error ? {err: error} : error);
    };

    await fastifyInstance.register(appAutoload, {
        apps,
    });

    if (opts.healthcheckPath) {
        fastifyInstance.get(opts.healthcheckPath, async function (req: FastifyRequest, reply: FastifyReply) {
            reply.send('ok');
        });
    }

    // use pino.final to create a special logger that
    // guarantees final tick writes
    const handler = pino.final(logger, (err, finalLogger, evt) => {
        finalLogger.error(`${evt} caught`);
        if (err) {
            finalLogger.fatal({err}, 'error caused exit');
        }
        process.exit(err ? 1 : 0);
    });
    // catch all the ways node might exit
    process.on('beforeExit', () => handler(null, 'beforeExit'));
    process.on('exit', () => handler(null, 'exit'));
    process.on('uncaughtException', err => handler(err, 'uncaughtException'));
    process.on('SIGINT', () => handler(null, 'SIGINT'));
    process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
    process.on('SIGTERM', () => handler(null, 'SIGTERM'));

    // warmup
    try {
        warmup(apps, fastifyInstance);
    }
    catch (e) {
        const errorMessage = (e && e.message) || '';
        console.error('worker init error: ' + errorMessage);
        logger.fatal('worker init error: ' + errorMessage);
        process.exit(-1);
    }

    let address;
    if (opts.address) {
        // eslint-disable-next-line
        address = await fastifyInstance.listen(opts.port, opts.address);
    }
    else if (opts.socket) {
        address = await fastifyInstance.listen(opts.socket);
    }
    else if (isDocker()) {
        address = await fastifyInstance.listen(opts.port, listenAddressDocker);
    }
    else {
        address = await fastifyInstance.listen(opts.port);
    }

    console.log(`Server listening on ${address}.`);
    console.log(fastifyInstance.printRoutes());

    // for pm2 graceful start
    if (process.send) {
        process.send('ready');
        process.send('ready');
    }

    return fastifyInstance;
}


async function start(args) {
    const opts = parseArgs(args);

    if (opts.help) {
        return showHelpForCommand('start');
    }

    return runFastify(opts);
}

export function cli(args) {
    start(args);
}

if (require.main === module) {
    cli(process.argv.slice(2));
}
