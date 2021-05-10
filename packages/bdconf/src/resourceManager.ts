/**
  * 资源管理
  */

import * as path from 'path';
import * as fs from 'fs';
import {FastifyLoggerInstance} from 'fastify';

import {IAdapter} from './adapter/adapter';
import {Resource} from './Resource';

export interface DictItem {
    filename: string;
    pathname?: string;
}

export class ResourceManager {
    /**
     * 适配器列表
     */
    private readonly adapterMap: Map<string, IAdapter> = new Map();
    /**
     * 资源列表
     */
    private readonly resourceList: Map<string, Resource> = new Map<string, Resource>();

    private readonly logger: FastifyLoggerInstance;
    private readonly rootDir: string;
    /**
     * 入口配置文件的路径
     */
    private readonly entryConfPath: string;

    constructor(rootDir: string, logger: FastifyLoggerInstance) {
        this.logger = logger;
        this.rootDir = rootDir;
        this.entryConfPath = path.join(this.rootDir, 'data.conf');
    }

    /**
     * 重新加载
     */
    async reload(nameList?: string[]): Promise<boolean> {
        const promiseList: Array<Promise<boolean>> = [];
        if (nameList && nameList.length) {
            nameList.forEach(key => {
                let resource = this.resourceList.get(key);
                if (resource) {
                    promiseList.push(resource.reload());
                }
            });
        } else {
            this.resourceList.forEach(resource => {
                promiseList.push(resource.reload());
            });
        }

        await Promise.all(promiseList);
        return true;
    }

    /**
     * 判断该资源是否存在
     * @param name 资源名
     */
    has(name: string): boolean {
        return this.resourceList.has(name);
    }

    /**
     * 获取单个资源数据
     * @param name 资源名
     */
    fetch(name: string) {
        let resource = this.resourceList.get(name);
        return resource.fetchData();
    }

    /**
     * 获取全部数据
     */
    fetchAll() {
        const data: Map<string, Record<string, any>> = new Map();
        this.resourceList.forEach((resource, key) => {
            data.set(key, resource.fetchData());
        });
        return data;
    }

    /**
     * 从配置文件解析加载资源
     * @param filename 配置文件名/路径
     */
    async registerResourceFromConfig(filename?: string): Promise<boolean> {
        let fullpath = filename ? path.join(this.rootDir, filename) : this.entryConfPath;

        if (!fs.existsSync(fullpath)) {
            this.logger.fatal(`load conf error: ${fullpath} not exist`);
            return false;
        }

        const name = this.getAdapterName(fullpath);
        const adapter = this.getAdapter(name);
        if (!adapter) {
            this.logger.fatal(`load conf error: ${name} adapter not exist`);
            return false;
        }

        let dictData;
        try {
            dictData = adapter.loadSync(fullpath);
        }
        catch (e) {
            this.logger.fatal(`load conf error: ${fullpath} parser error`);
        }
        if (!dictData) {
            return false;
        }

        const promiseList: Array<Promise<boolean>> = [];
        Object.keys(dictData).forEach(dictName => {
            const dictItem: DictItem = dictData[dictName];

            const adapterName = this.getAdapterName(dictItem.filename);
            const dictAdapter = this.getAdapter(adapterName);
            if (dictAdapter) {
                const filePath = path.join(dictItem.pathname || '', dictItem.filename);

                const resource = new Resource({
                    rootDir: this.rootDir,
                    filePath: filePath,
                    adapter: dictAdapter,
                    // autoload: dictItem.autoload,
                }, this.logger);
                promiseList.push(this.registerResource(dictName, resource));
            }
        });

        await Promise.all(promiseList);
        return true;
    }

    /**
     * 添加适配器
     * @param name 适配器名称
     * @param adapter 适配器
     */
    registerAdapter(name: string, adapter: IAdapter): boolean {
        if (this.adapterMap.has(name)) {
            return false;
        }
        this.adapterMap.set(name, adapter);
        return true;
    }

    /**
     * 根据文件名获取adapter
     * @param fileName 文件名
     */
    getAdapterName(fileName: string): string {
        let extname = path.extname(fileName); // 如 .conf
        return extname.substr(1);
    }

    /**
     * 根据名字获取适配器
     * @param name 适配器名称
     */
    getAdapter(name: string): IAdapter {
        return this.adapterMap.get(name);
    }

    /**
     * 添加资源
     * @param name 资源名
     * @param resource 资源
     */
    async registerResource(name: string, resource: Resource): Promise<boolean> {
        if (this.has(name)) {
            return false;
        }
        let loadResult = await resource.loadAsync();
        if (!loadResult) {
            return false;
        }
        this.resourceList.set(name, resource);
        return true;
    }
}