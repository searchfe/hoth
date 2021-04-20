import {src, dest, series} from 'gulp';

function copyAssets() {
    return src('./config/*').pipe(dest('../dist/config'));
}

export default series(copyAssets);
