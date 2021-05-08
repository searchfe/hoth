/**
 * 资源类
 */

import fs from 'fs';
import path from 'path';
import {IAdapter} from './adapter/adapter';
import {FastifyLoggerInstance} from 'fastify';

interface ResourceOptions {
    rootDir: string;
    filePath: string;
    adapter: IAdapter;
    // autoload: boolean;
}

export class Resource {
    /**
     * 全路径
     */
    private readonly fullname: string;
    /**
     * 自动加载
     */
    private readonly autoload: boolean;
    /**
     * 上次更新的时间
     */
    private lastModified: number;
    /**
     * 适配器
     */
    private readonly adapter: IAdapter;
    /**
     * 数据
     */
    private data: Record<string, any>;
    /**
     * 是否有效
     */
    private avail: boolean;

    /**
     * 日志
     */
    private readonly logger: FastifyLoggerInstance;

    constructor(options: ResourceOptions, logger: FastifyLoggerInstance) {
        this.fullname = path.resolve(options.rootDir, options.filePath);
        this.adapter = options.adapter;
        // this.autoload = options.autoload;
        this.lastModified = 0;
        this.data = {};
        this.avail = false;
        this.logger = logger;
    }

    /**
     * 同步加载
     */
    load(): boolean {
        try {
            const stats = fs.statSync(this.fullname);
            if (this.lastModified >= stats.mtimeMs) {
                return true;
            }

            this.data = this.adapter.loadSync(this.fullname);
            this.lastModified = stats.mtimeMs;
            this.avail = true;
        }
        catch (e) {
            this.logger.fatal(`load resource ${this.fullname} error: ${e.message}`);
            this.avail = false;
        }
        return this.avail;
    }

    /**
     * 异步加载
     */
    async loadAsync(): Promise<boolean> {
        try {
            const mtimeMs = await new Promise<number>((resolve, reject) => {
                fs.stat(this.fullname, (err, stats) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(stats.mtimeMs);
                    }
                });
            });

            if (this.lastModified >= mtimeMs) {
                return true;
            }

            this.data = await this.adapter.loadAsync(this.fullname);
            this.lastModified = mtimeMs;

            this.avail = true;
            return true;
        }
        catch (err) {
            this.avail = false;
            this.logger.fatal(`load resource ${this.fullname} error: ${err.message}`);

            return false;
        }
    }

    /**
     * 重新加载
     */
    async reload(): Promise<boolean> {
        // if (!this.autoload) {
        //     return true;
        // }
        let result = await this.loadAsync();
        return result;
    }

    /**
     * 资源是否有效
     */
    isAvail(): boolean {
        return this.avail;
    }

    /**
     * 获取数据
     */
    fetchData(): Record<string, any> {
        return Object.freeze(this.data);
    }
}
