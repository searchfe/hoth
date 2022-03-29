const {src, dest, series} = require('gulp');

function copyAssets() {
    return src('server/**/*.{tpl,json}').pipe(dest('dist'));
}

exports.default = series(copyAssets);
