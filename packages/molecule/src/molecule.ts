/* eslint-disable @typescript-eslint/no-require-imports */
import path from 'path';
import {FastifyLoggerInstance} from 'fastify';

interface IController<T> {
    render(data: any): Promise<T> | T;
}

interface ControllerInfo<T> {
    /**
     * 控制器实例
     */
    ctrl: IController<T>;
    /**
     * 控制器路径
     */
    ctrlPath: string;
}
interface MoleculeOption {
    /**
     * 日志
     */
    logger: FastifyLoggerInstance;
    /**
     * 渲染的根路径，绝对路径
     */
    root: string;
    /**
     * app name
     */
    appName: string;
    /**
     * 路由名字
     */
    name: string;
}

let controllerCache: Map<string, ControllerInfo<any>> = new Map();

function getOrSetCache<T>(appName: string, ctrlPath: string, option?: ControllerInfo<T>): ControllerInfo<T> | null {
    let cacheK = `${appName}_${ctrlPath}`;

    if (option) {
        controllerCache.set(cacheK, option);
        return null;
    }

    if (controllerCache.has(cacheK)) {
        const tmp = controllerCache.get(cacheK) as ControllerInfo<T>;
        return tmp;
    }
    return null;
}

/**
 *
 * @param ctrlPath molecule controller 的路径
 * @param data controller 渲染所需数据
 * @param option MoleculeOption
 * @returns 返回 controller.render 的返回值 或 null
 */
export async function molecule<T = string>(ctrlPath: string, data: any, option: MoleculeOption) {
    let ctrlInfo = getOrSetCache<T>(option.appName, ctrlPath);
    let ctrl: IController<T>;
    let logger = option.logger;

    try {
        if (ctrlInfo) {
            ctrl = ctrlInfo.ctrl;
        }
        else {
            const fullCtrlPath = path.join(option.root, ctrlPath);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const CtrlClass = require(fullCtrlPath).Controller;
            ctrl = new CtrlClass({
                logger: option.logger,
                root: option.root,
            });
            getOrSetCache(option.appName, ctrlPath, {
                ctrlPath,
                ctrl,
            });
        }

        let result = await ctrl.render(data);
        return result;
    }
    catch (err) {
        logger.fatal(`Error when render ${option.appName}/${option.name}: ${(err as any).message}`);
        return null;
    }
}
