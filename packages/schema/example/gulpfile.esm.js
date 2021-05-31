import {src, dest, series} from 'gulp';
import {compileInterfaceToSchema} from '@hoth/schema/dist/gulp';

function compile() {
    return src('src/interfaces/**/*.ts')
        .pipe(compileInterfaceToSchema({
            fileName: 'schema.json'
        }))
        .pipe(dest('dist/interfaces'));
}

export default series([compile]);
