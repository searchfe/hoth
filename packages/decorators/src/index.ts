/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

import type {FastifyInstance, FastifyInstance} from 'fastify';
import type {AutoLoadConfig} from 'fastify-decorators/interfaces/bootstrap-config';

import {bootstrap as bootstrapInner} from 'fastify-decorators';

export {
    Controller,
    ControllerType,
    ControllerConfig,
    RouteConfig,
    Service,
    Inject,
    Initializer,
    Destructor,
    Hook,
    ErrorHandler,
    ALL,
    DELETE,
    GET,
    HEAD,
    OPTIONS,
    PATCH,
    POST,
    PUT,
    getInstanceByToken,
} from 'fastify-decorators';

export interface BootstrapConfig extends AutoLoadConfig {
    appName: string;
}

export const appFastifyInstanceTokenMap = new Map<string, FastifyInstance>();

export function getFastifyInstanceByAppName(name: string) {
    return appFastifyInstanceTokenMap.get(name);
}

export async function bootstrap(fastify: FastifyInstance, config: BootstrapConfig) {
    const appName = config.appName;
    appFastifyInstanceTokenMap.set(appName, fastify);
    return await bootstrapInner(fastify, config);
}

declare module 'fastify' {
    interface FastifyRequest {
        readonly $appConfig: {
            get: (property: string | string[]) => any;
        };
        readonly $service: FastifyInstance;
        module?: string;
        logid?: string;
        product?: string;
    }

    interface FastifyLoggerInstance {
        addNotice: (key: string, value: string) => void;
    }
}

