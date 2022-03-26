/**
 * @file 命令行参数解析
 * @author cxtom
 */

import yargsParser from 'yargs-parser';

export interface Args {
    _: any[];
    '--': any[];
    port: number | string;
    debug: boolean;
    help: boolean;
    debugPort: number;
    debugHost: string;
    address: string;
    socket: string;
    pluginOptions: {
        [key: string]: any;
    };
    appDir: string;
    appPrefix: string;
    appName: string;
    healthcheckPath: string;
    subApp: boolean;
    repo: string;
}

export default function (args: string[]): Args {
    const parsedArgs = yargsParser(args, {
        configuration: {
            'populate--': true,
        },
        number: ['port', 'debug-port', 'plugin-timeout'],
        boolean: ['debug', 'help', 'sub-app'],
        string: ['address', 'socket', 'debug-host', 'app-dir', 'app-prefix', 'app-name', 'healthcheck-path',
            'app-type', 'repo'],
        envPrefix: 'HOTH_',
        alias: {
            port: ['p'],
            socket: ['s'],
            help: ['h'],
            address: ['a'],
            debug: ['d'],
            'debug-port': ['I'],
        },
        default: {
            port: 8250,
            debug: false,
            debugPort: 9320,
            appDir: 'app',
            subApp: false,
            appPrefix: '/',
            repo: ''
        },
    });

    const additionalArgs = parsedArgs['--'] || [];
    const {_, ...pluginOptions} = yargsParser(additionalArgs);

    return {
        _: parsedArgs._,
        '--': additionalArgs,
        port: parsedArgs.port,
        debug: parsedArgs.debug,
        debugPort: parsedArgs.debugPort,
        debugHost: parsedArgs.debugHost,
        address: parsedArgs.address,
        socket: parsedArgs.socket,
        help: parsedArgs.help,
        appDir: parsedArgs.appDir,
        appPrefix: parsedArgs.appPrefix,
        appName: parsedArgs.appName,
        healthcheckPath: parsedArgs.healthcheckPath,
        subApp: parsedArgs.subApp,
        repo: parsedArgs.repo,
        pluginOptions,
    };
}
