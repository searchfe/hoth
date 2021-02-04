/**
 * @file 命令行参数解析
 * @author cxtom
 */

import yargsParser from 'yargs-parser';

interface Args {
    _: any[];
    '--': any[];
    port: number | string;
    debug: boolean;
    debugPort: number;
    debugHost: string;
    address: string;
    socket: string;
    pluginOptions: object;
}

export default function (args): Args {
    const parsedArgs = yargsParser(args, {
        configuration: {
            'populate--': true
        },
        number: ['port', 'debug-port', 'plugin-timeout'],
        boolean: ['debug'],
        string: ['address', 'socket', 'debug-host'],
        envPrefix: 'HOTH_',
        alias: {
            port: ['p'],
            socket: ['s'],
            help: ['h'],
            address: ['a'],
            debug: ['d'],
            'debug-port': ['I'],
            'plugin-timeout': ['T'],
        },
        default: {
            debug: false,
            debugPort: 9320,
            'plugin-timeout': 10 * 1000, // everything should load in 10 seconds
        }
    });

    const additionalArgs = parsedArgs['--'] || []
    const { _, ...pluginOptions } = yargsParser(additionalArgs);

    return {
        _: parsedArgs._,
        '--': additionalArgs,
        port: parsedArgs.port,
        debug: parsedArgs.debug,
        debugPort: parsedArgs.debugPort,
        debugHost: parsedArgs.debugHost,
        address: parsedArgs.address,
        socket: parsedArgs.socket,
        pluginOptions,
    };
}
