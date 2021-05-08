import {FastifyLoggerInstance} from 'fastify';
import {ResourceManager} from './ResourceManager';
import {ConfAdapter} from './adapter/confAdapter';
import {JsonAdapter} from './adapter/jsonAdapter';
import {DictAdapter} from './adapter/dictAdapter';

export function resourceManager(rootDir: string, logger: FastifyLoggerInstance) {
    const resourceManager = new ResourceManager(rootDir, logger);
    resourceManager.registerAdapter(ConfAdapter.dataType, new ConfAdapter());
    resourceManager.registerAdapter(JsonAdapter.dataType, new JsonAdapter());
    resourceManager.registerAdapter(DictAdapter.dataType, new DictAdapter());
    return resourceManager;
}

export {ConfAdapter, JsonAdapter, DictAdapter};
