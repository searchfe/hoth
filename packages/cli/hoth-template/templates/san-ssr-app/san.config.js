const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {

    publicPath: '/__appName__/',

    assetsDir: 'static',

    extract: false,

    css: {
        cssPreprocessor: 'less'
    },

    pages: {
        main: {
            entry: './src/main.ts',
            filename: 'view/index.tpl'
        }
    },

    chainWebpack: webpackConfig => {

        webpackConfig.resolve.extensions.merge(['.ts']);

        webpackConfig.module.rule('html').use('html-loader').tap(options => {
            return {};
        });

        webpackConfig.resolve.alias.set(
            'san',
            path.join(path.dirname(require.resolve('san')), !isProduction ? 'san.dev.js' : 'san.js')
        );

        webpackConfig.module
            .rule('ts')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
            .options({
                transpileOnly: true,
                configFile: path.resolve(__dirname, './tsconfig.csr.json'),
            });

        webpackConfig
            .plugin('san-ssr')
            .use(require('san-ssr-plugin').default, [{
                tsConfigPath: path.resolve(__dirname, './tsconfig.ssr.json'),
                output: {
                    path: 'ssr'
                }
            }])
            .before('san');

    },
};
