import {generateSchema} from '@hoth/typescript-to-json-schema';
import path from 'path';
import through from 'through2';
import type File from 'vinyl';

export function compileInterfaceToSchema(options: {
    fileName: string,
    getId?: (filePath: string) => string
}) {
    const {
        fileName,
        getId = filePath => 'hoth/' + path.basename(filePath)
    } = options;
    if (!fileName) {
        throw Error('fileName must be specified.');
    }

    const files = [] as string[];
    let latestFile: File;

    function compileContents(file: File, encoding: string, callback: Function) {
        files.push(file.path);
        latestFile = file;

        callback();
    }

    function endStream(this: {}, cb: Function) {
        const {schemas} = generateSchema(files, {
            getId
        });

        const outputFile = latestFile.clone({contents: false});
        outputFile.path = path.join(latestFile.base, fileName);
        outputFile.contents = Buffer.from(JSON.stringify(schemas));
        
        cb(null, outputFile);
    }

    return through.obj(compileContents, endStream);
}