import fs from 'fs-extra';
import path from 'path';
import pino from 'pino';

import stream from './stream';

interface LoggerOptions {
    apps: Array<{name: string}>;
    rootPath: string;
}

interface StreamItem {
    stream: any;
    level: string;
    app: string;
}

export default function (options: LoggerOptions) {
    let {
        apps,
        rootPath,
    } = options;

    let streams: StreamItem[] = [];

    apps = [{name: 'hoth'}, ...apps];

    for (const {name} of apps) {
        const logPath = path.join(rootPath, 'log', name);
        fs.ensureDirSync(logPath);
        const files = [
            `${name}.log.ti`,
            `${name}.log`,
            `${name}.log.wf`,
        ];
        const levels = ['trace', 'notice', 'warn'];
        for (let i = 0; i < files.length; i++) {
            const fullpath = path.join(logPath, files[i]);
            if (!fs.existsSync(fullpath)) {
                fs.ensureFileSync(fullpath);
            }
            streams.push({
                app: name,
                stream: pino.destination(fullpath),
                level: levels[i],
            });
        }
    }

    return pino({
        level: process.env.NODE_ENV === 'development' ? 'trace' : 'info',
        customLevels: {
            notice: 35,
        },
        serializers: {
            res(reply) {
                return {
                    statusCode: reply.statusCode,
                };
            },
            req(request) {
                return {
                    method: request.method,
                    url: request.url,
                    parameters: request.parameters,
                    headers: request.headers,
                    ip: request.ip,
                    module: request.product,
                    product: request.product,
                    logid: request.logid,
                };
            },
            err: pino.stdSerializers.err,
        },
    }, stream(streams));
}
