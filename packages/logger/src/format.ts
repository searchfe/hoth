import {parse} from 'secure-json-parse';
import flatstr from 'flatstr';
import {levelFormats} from './constants';
import tokens from './tokens';

export default function (line: string) {
    const o = parse(line);
    if (!o) {
        return {
            app: 'hoth',
            level: 10,
            result: line,
        };
    }
    const format = levelFormats[o.level].format;
    return {
        app: o.app || 'hoth',
        level: o.level,
        result: flatstr(format(tokens, o)),
    };
}
