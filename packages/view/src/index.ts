import type {FastifyInstance, FastifyReply} from 'fastify';
import '@hoth/decorators';
import {join, resolve} from 'path';
import fp from 'fastify-plugin';
import LRU from 'lru-cache';

declare module 'fastify' {
    interface FastifyInstance {
        readonly $appConfig: {
            get: (property: string | string[]) => any;
        };
    }
}

type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
const supportedEngines = ['ejs'] as const;
type supportedEnginesType = typeof supportedEngines[number];;
type EngineList = PartialRecord<supportedEnginesType, any>;

export interface HothViewOptions {
    engine: EngineList;
    options?: any;
    maxCacheAge?: number;
    maxCache?: number;
    templatesDir?: string;
    viewExt?: string;
    renderOnly?: boolean;
}

declare module 'fastify' {
    interface FastifyReply {
        render(page: string, data?: Record<string, unknown>, cb?: (err: Error, html: string) => void): Promise<string>;
        // locals?: object;
    }
}

async function plugin(fastify: FastifyInstance, opts: HothViewOptions) {
    if (!opts.engine) {
        throw new Error('Missing engine');
    }

    const type = Object.keys(opts.engine)[0] as supportedEnginesType;
    if (!supportedEngines.includes(type)) {
        throw new Error(`'${type}' not yet supported`);
    }

    const engine = opts.engine[type];
    // const options = opts.options || ({} as HothViewOptions['options'])! ;
    const viewExt = opts.viewExt || '';
    const maxCacheAge = opts.maxCacheAge || 1000 * 60 * 60;
    const maxCache = opts.maxCache || 20 * 1024 * 1024;
    const defaultCtx = {};
    const renderOnly = opts.renderOnly || false;

    let templatesDir = opts.templatesDir;
    if (!templatesDir && fastify.$appConfig) {
        templatesDir = join(fastify.$appConfig.get('dir'), 'view');
    }
    else if (!templatesDir) {
        templatesDir = resolve('./view');
    }

    const renderCaches = new LRU({
        max: maxCache,
        length(n: string) {
            return n.length;
        },
        maxAge: maxCacheAge,
    });

    const renders = {
        ejs: viewEjs,
    };

    if (type === 'ejs') {
        engine.cache = renderCaches;
    }

    const renderer = renders[type];

    fastify.decorateReply('render', function (
        this: FastifyReply,
        page: string,
        data?: Record<string, unknown> | undefined
    ) {
        return new Promise((resolve, reject) => {
            const done = (error: Error, html: string) => {
                if (error) {
                    if (!renderOnly) {
                        this.send(error);
                    }
                    reject(error);
                }

                if (!renderOnly) {
                    this.header('Content-Type', 'text/html; charset=utf-8');
                    this.send(html);
                }

                resolve(html);
            };
            renderer.apply(this, [page, data || {}, done]);
        });
    });

    function getPage(page: string) {
        if (viewExt) {
            return `${page}.${viewExt}`;
        }
        return page;
    }

    function viewEjs(
        this: FastifyReply,
        page: string,
        data: Record<string, unknown>,
        done: (err: Error, html: string) => void
    ) {
        if (!page) {
            this.send(new Error('Missing page'));
            return;
        }

        data = Object.assign({}, defaultCtx, data);
        engine.renderFile(join(templatesDir!, getPage(page)), data, done);
    }
}

export default fp(plugin);
