import fs from 'fs';
import path from 'path';
import pino from 'pino';
import * as fileStreamRotator from 'file-stream-rotator';
import type {FastifyRequest, FastifyReply} from 'fastify';

import stream from './stream';
import {fieldSym, noticeSym, performanceSym} from './constants';
import {Stream} from 'stream';

declare module 'fastify' {
    interface FastifyRequest {
        [noticeSym]: {
            [key: string]: string;
        };
        [fieldSym]: {
            [key: string]: string;
        };
        [performanceSym]: {
            [key: string]: number[];
        };
    }

    interface FastifyLoggerInstance {
        addField: (key: string, value: string | number) => void;
        addNotice: (key: string, value: string | number) => void;
        addPerformance: (name: string, value: number) => void;
    }
}



interface LoggerOptions {
    apps: Array<{name: string}>;
    rootPath: string;
}

interface StreamItem {
    fullpath: string;
    level: string;
    app: string;
    stream: Stream;
}


export default function createLogger(options: LoggerOptions) {
    let {
        apps,
        rootPath,
    } = options;

    let streams: StreamItem[] = [];

    apps = [{name: 'hoth'}, ...apps];

    for (const {name} of apps) {
        const logPath = path.join(rootPath, 'log', name);
        fs.mkdirSync(logPath, {recursive: true});
        const files = [
            `${name}.log.ti`,
            `${name}.log`,
            `${name}.log.wf`,
        ];
        const levels = ['trace', 'notice', 'warn'];
        for (let i = 0; i < files.length; i++) {
            const fullpath = path.join(logPath, files[i]);
            streams.push({
                app: name,
                fullpath,
                level: levels[i],
                stream: fileStreamRotator.getStream({
                    filename: `${fullpath}.%DATE%`,
                    frequency: '1h',
                    verbose: process.env.NODE_ENV === 'development',
                    date_format: 'YYYYMMDDHH',
                })
            });
        }
    }

    const logger = pino({
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
                    module: request.module,
                    product: request.product,
                    logid: request.logid,
                    fields: request[fieldSym],
                    notices: request[noticeSym],
                    performance: request[performanceSym],
                };
            },
            err: pino.stdSerializers.err,
        },
    }, stream(streams));

    return logger;
}


export function preHandler(req: FastifyRequest, reply: FastifyReply, done) {
    req[noticeSym] = {};
    req[fieldSym] = {};
    req[performanceSym] = {};
    req.log.addField = (key: string, value: string | number) => {
        req[fieldSym][key] = String(value);
    };
    req.log.addNotice = (key: string, value: string | number) => {
        req[noticeSym][key] = String(value);
    };

    req.log.addPerformance = (key: string, value: number) => {
        if (!req[performanceSym][key]) {
            req[performanceSym][key] = [0, 0];
        }
        req[performanceSym][key][0]++;
        req[performanceSym][key][1] += value;
    };
    done();
}

// eslint-disable-next-line max-len
// message: NOTICE: 2021-08-09 13:28:35 [-:-] errno[-] status[200] logId[2e45e4f4-56e8-4496-abf2-9731c083f0ee] pid[14871] uri[/app/other] cluster[-] idc[-] product[quickstart] module[test] clientIp[127.0.0.1] ua[Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36] refer[-] cookie[-] parseTime[0.2] validationTime[0.6] tm[-] responseTime[1.2]

export function parse(line: string): Record<string, string | number> | undefined {
    let regexp = /^(\w+):\s(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\s\[([\w-\/\.]+):([\d-]+)\]\s+(.*)$/;
    const match = regexp.exec(line);
    if (!match) {
        return;
    }

    const extra = match[5];
    const records: Record<string, string> = {};
    const reg = /(\w+)\[([^\]]*)\](\s|$)/g;
    let m;
    let lastIndex;

    while ((m = reg.exec(extra)) != null) {
        const value = m[2].trim();
        if (value && value !== '-') {
            records[m[1].trim()] = isNaN(value) ? value : +value;
        }
        lastIndex = reg.lastIndex;
    }

    let msg = extra.slice(lastIndex);

    if (!records.app && records.cluster) {
        records.app = records.cluster;
        delete records.cluster;
    }

    if (records.logId === 'warmup') {
        return;
    }

    return {
        level: match[1].toLowerCase(),
        app: 'hoth',
        msg,
        timestamp: new Date(match[2]).getTime(),
        ...records,
    };
}

export * as pino from 'pino';
