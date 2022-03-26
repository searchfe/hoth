const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const isServer = !!process.env.SSR;

module.exports = {

    publicPath: '/__appName__/',

    assetsDir: isServer ? 'ssr' : 'static',

    indexPath: 'view/index.tpl',

    css: {
        extract: process.env.NODE_ENV === 'production' && !isServer,
    },

    filenameHashing: !isServer,

    chainWebpack: webpackConfig => {
        // We need to disable cache loader, otherwise the client build
        // will used cached components from the server build
        webpackConfig.module.rule('vue').uses.delete('cache-loader');
        webpackConfig.module.rule('js').uses.delete('cache-loader');
        webpackConfig.module.rule('tsx').uses.delete('cache-loader');

        webpackConfig.module
            .rule('ts')
            .use('ts-loader')
            .tap(options => {
                return {
                    ...options,
                    configFile: isServer ? './tsconfig.ssr.json' : './tsconfig.csr.json',
                };
            });

        if (!isServer) {
            // Point entry to your app's client entry file
            webpackConfig
                .entry('app')
                .clear()
                .add('./src/entry-client.ts');
            return;
        }

        webpackConfig.plugins.delete('html');

        // Point entry to your app's server entry file
        webpackConfig
            .entry('app')
            .clear()
            .add('./src/entry-server.ts');

        // This allows webpack to handle dynamic imports in a Node-appropriate
        // fashion, and also tells `vue-loader` to emit server-oriented code when
        // compiling Vue components.
        webpackConfig.target('node');
        // This tells the server bundle to use Node-style exports
        webpackConfig.output.libraryTarget('commonjs2');

        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // Externalize app dependencies. This makes the server build much faster
        // and generates a smaller bundle file.

        // Do not externalize dependencies that need to be processed by webpack.
        // You should also whitelist deps that modify `global` (e.g. polyfills)
        webpackConfig.externals(nodeExternals({allowlist: /\.(css|vue)$/}));

        webpackConfig.optimization.splitChunks(false).minimize(false);

        webpackConfig.plugins.delete('preload');
        webpackConfig.plugins.delete('prefetch');
        webpackConfig.plugins.delete('progress');
        webpackConfig.plugins.delete('friendly-errors');

        webpackConfig.plugin('limit').use(
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            })
        );
    },
};
