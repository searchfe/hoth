import {src, dest, series} from 'gulp';

function copyAssets() {
    return src('server/**/*.{tpl,json}').pipe(dest('dist'));
}

export default series(copyAssets);