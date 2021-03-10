/**
 * @file start server
 * @author cxtom
 */

import Fastify from 'fastify';
import isDocker from 'is-docker';
import parseArgs from './parseArgs';
import {exit, requireFastifyForModule} from '@hoth/utils';
import appAutoload, {getApps} from '@hoth/app-autoload';
import createLogger from '@hoth/logger';
import {showHelpForCommand} from './util';

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

    if (opts.debug) {
        if (process.version.match(/v[0-6]\..*/g)) {
            exit('Debug mode not compatible with Node.js version < 6');
        }
        else {
            // eslint-disable-next-line
            require('inspector').open(
                opts.debugPort,
                opts.debugHost || isDocker() ? listenAddressDocker : undefined
            );
        }
    }

    const rootPath = process.env.ROOT_PATH || process.cwd();
    const apps = await getApps({
        dir: opts.appDir,
        prefix: opts.appPrefix,
        name: opts.appName,
        rootPath,
    });

    const fastifyInstance = fastify({
        logger: createLogger({
            apps,
            rootPath,
        }),
        disableRequestLogging: true,
        pluginTimeout: 60 * 1000,
    });

    await fastifyInstance.register(appAutoload, {
        apps,
    });

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
