# @hoth/view

config/plugin.ts

```ts
import path from 'path';
export default {
    '@hoth/view': {
        engine: {
            swig: require('swig'),
        }
        rootPath: path.resolve(__dirname, '../templates')
    },
};
```