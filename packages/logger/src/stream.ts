/**
 * @file logger stream
 * @author cxtom
 */

import chalk from 'chalk';
import format from './format';
import {defaultLevels} from './constants';

const metadata = Symbol.for('pino.metadata');
const isDevelopment = process.env.NODE_ENV === 'development';

export default function (streamsArray) {
    let counter = 0;

    streamsArray = streamsArray || /* istanbul ignore next */ [];

    let levels = defaultLevels;
    let res;

    // we can exit early because the streams are ordered by level
    function write(data) {
        const {streams} = this;
        let stream;

        let info = format(data);

        for (let dest of streams) {
            if (dest.app === info.app && dest.level <= info.level) {
                stream = dest.stream;

                /* istanbul ignore next */
                if (stream[metadata]) {
                    const {
                        lastTime,
                        lastMsg,
                        lastObj,
                        lastLogger,
                        lastLevel,
                    } = this;
                    stream.lastLevel = lastLevel;
                    stream.lastTime = lastTime;
                    stream.lastMsg = lastMsg;
                    stream.lastObj = lastObj;
                    stream.lastLogger = lastLogger;
                }
            }
            if (stream) {
                break;
            }
        }

        /* istanbul ignore next */
        if (!stream) {
            stream = info.level >= 40 ? process.stderr : process.stdout;
        }

        /* istanbul ignore else */
        if (isDevelopment || process.env.CONSOLE_LOG === 'true') {
            const arr = info.result.split(':');
            arr[0] = (['FATAL', 'ERROR'].includes(arr[0]))
                ? chalk.red(arr[0]) : (arr[0] === 'WARN')
                    ? chalk.yellow(arr[0]) : chalk.green(arr[0]);

            // with \n
            process.stdout.write(arr.join(':'));
        }

        stream.write(info.result);
    }

    function flushSync() {
        for (const {stream} of this.streams) {
            if (stream && typeof stream.flushSync === 'function') {
                stream.flushSync();
            }
        }
    }

    function add(dest) {
        const {streams} = this;
        /* istanbul ignore next */
        if (typeof dest.write === 'function') {
            return add.call(this, {stream: dest});
        }
        /* istanbul ignore next */
        else if (typeof dest.levelVal === 'number') {
            return add.call(this, Object.assign({}, dest, {level: dest.levelVal, levelVal: undefined}));
        }
        else if (typeof dest.level === 'string') {
            return add.call(this, Object.assign({}, dest, {level: levels[dest.level]}));
        }
        /* istanbul ignore next */
        else if (typeof dest.level !== 'number') {
            dest = Object.assign({}, dest, {level: 30});
        }
        else {
            dest = Object.assign({}, dest);
        }
        dest.id = counter++;

        streams.unshift(dest);

        this.minLevel = streams[0].level;

        return res;
    }

    function clone(level) {
        let streams = new Array(this.streams.length).map(/* istanbul ignore next */ (_, i) => ({
            level: level,
            stream: this.streams[i].stream,
        }));

        return {
            write,
            add,
            minLevel: level,
            streams,
            clone,
            flushSync,
            [metadata]: true,
        };
    }

    res = {
        write,
        add,
        flushSync,
        minLevel: 0,
        streams: [],
        clone,
        [metadata]: true,
    };

    streamsArray.forEach(add, res);

    // clean this object up
    // or it will stay allocated forever
    // as it is closed on the following closures
    streamsArray = null;

    return res;
}
