import {FastifyLoggerInstance} from 'fastify';
import {Controller as IController} from '@baidu/molecule';

interface Option {
    /**
     * 日志
     */
    logger: FastifyLoggerInstance;
    /**
     * 渲染的根路径
     */
    root: string;
}

/**
 * 渲染数据格式，业务自定义
 */
interface Data {
    name: string;
    appname: string;
    title: string;
}

export class Controller implements IController {
    root: string;
    logger: FastifyLoggerInstance;

    constructor(options: Option) {
        this.logger = options.logger;
        this.root = options.root;
    }

    render(data: Data) {
        return `appname is ${data.appname}, route name is ${data.name}, title is ${data.title}`;
    }
}
