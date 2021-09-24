import flatstr from 'flatstr';
import {levelFormats} from './constants';
import tokens from './tokens';

export default function (line: string) {
    let o: any = {};
    try {
        o = JSON.parse(line);
        const format = levelFormats[o.level].format;
        return {
            app: o.app || 'hoth',
            level: o.level,
            result: flatstr(format(tokens, o)),
        };
    }
    catch (e) {
        return {
            app: 'hoth',
            level: 10,
            result: line,
        };
    }
}
