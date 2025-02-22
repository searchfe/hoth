

import 'reflect-metadata';

import type {FastifyInstance} from 'fastify';

import type {AutoLoadConfig} from 'fastify-decorators/interfaces/bootstrap-config';
import fastifyPlugin from 'fastify-plugin';
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

export const bootstrap = fastifyPlugin(async function (fastify: FastifyInstance, config: BootstrapConfig) {
    const appName = config.appName;
    appFastifyInstanceTokenMap.set(appName, fastify);
    return bootstrapInner(fastify, config);
}, {
    fastify: '>=5.0.0',
});

declare module 'fastify' {
    interface FastifyRequest {
        $appConfig: {
            get: (property: string | string[]) => any;
        };
        $service: FastifyInstance;
        module?: string;
        logid?: string;
        product?: string;
    }

    interface FastifyInstance {
        readonly $appConfig: {
            get: (property: string | string[]) => any;
        };
    }
}

