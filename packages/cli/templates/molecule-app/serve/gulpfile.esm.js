import {src, dest, series, parallel} from 'gulp';

function copyAssets() {
    return src('./config/*').pipe(dest('../dist/config'));
}

function copyMock() {
    return src('./mock/*').pipe(dest('../dist/mock'));
}

export default process.env.NODE_ENV === 'development' ? parallel(copyAssets, copyMock) : series(copyAssets);