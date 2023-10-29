
import type {FastifyInstance, FastifyReply} from 'fastify';
import type {Swig, SwigOptions} from 'swig';
import '@hoth/decorators';
import {join, resolve} from 'path';
import fp from 'fastify-plugin';
import LRU from 'lru-cache';


type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
const supportedEngines = ['swig', 'nunjucks', 'ejs'] as const;
type supportedEnginesType = typeof supportedEngines[number];;
type EngineList = PartialRecord<supportedEnginesType, any>;

interface NunjunksOptions {
    onConfigure: (env: string) => void;
}

interface swigTagsOptions {
    parse: (...args: any[]) => boolean;
    compile: (...args: any[]) => string;
    ends: boolean;
    blockLevel: boolean;
}

interface wrapSwigOptions extends SwigOptions {
    filters?: Record<string, (...args: any[]) => string>;
    tags?: Record<string, swigTagsOptions>;
}

export interface HothViewOptions {
    engine: EngineList;
    options?: NunjunksOptions | wrapSwigOptions;
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
    const options = opts.options || ({} as HothViewOptions['options'])!;
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
        swig: viewSwig,
        nunjucks: viewNunjucks,
        ejs: viewEjs,
    };

    let swig: Swig;
    if (type === 'swig') {
        swig = new engine.Swig(options);
        let setCount = 0;
        // @ts-ignore
        swig.renderCache = {
            get: renderCaches.get.bind(renderCaches),
            set(key: string, value: any) {
                // 设置过多缓存时，考虑清理老缓存请求次数
                if (setCount > maxCache) {
                    renderCaches.prune();
                    setCount = 0;
                }
                setCount++;
                return renderCaches.set(key, value);
            },
            clean() {
                renderCaches.reset();
            },
        };

        const swigOptions = options as wrapSwigOptions;

        // 加载用户扩展
        if (swigOptions.tags) {
            Object.keys(swigOptions.tags).forEach(function (name) {
                const t = swigOptions.tags![name];
                swig.setTag(name, t.parse, t.compile, t.ends, t.blockLevel || false);
            });
        }

        if (swigOptions.filters) {
            Object.keys(swigOptions.filters).forEach(function (name) {
                const t = swigOptions.filters![name];
                swig.setFilter(name, t);
            });
        }
    }
    else if (type === 'ejs') {
        engine.cache = renderCaches;
    }

    const renderer = renders[type];

    fastify.decorateReply('render', function (
        this: FastifyReply,
        page: string,
        data: Record<string, unknown>,
        cb?: (err: Error, html: string) => void
    ) {
        if (cb && typeof cb === 'function') {
            return renderer.apply(this, [page, data, cb]);
        }
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
            renderer.apply(this, [page, data, done]);
        });
    });

    function getPage(page: string) {
        if (viewExt) {
            return `${page}.${viewExt}`;
        }
        return page;
    }

    function viewSwig(
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
        swig.renderFile(join(templatesDir!, getPage(page)), data, done);
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

    function viewNunjucks(
        this: FastifyReply,
        page: string,
        data: Record<string, unknown>,
        done: (err: Error, html: string) => void
    ) {
        if (!page) {
            this.send(new Error('Missing page'));
            return;
        }
        const env = engine.configure(templatesDir, options);
        const finalOpts = options as NunjunksOptions;
        if (typeof finalOpts.onConfigure === 'function') {
            finalOpts.onConfigure(env);
        }
        data = Object.assign({}, defaultCtx, data);
        page = getPage(page);
        env.render(join(templatesDir!, page), data, done);
    }
}

export default fp(plugin);
