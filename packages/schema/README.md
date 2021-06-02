# @hoth/schema

提供将 interface 转换为 json schema 并在 hoth 中使用的能力。

## 使用方式

### 编译

提供了一个 gulp 插件，用于编译所有 interfaces。

```javascript
import {compileInterface} from '@hoth/schema';

function compile() {
    return src('src/interfaces/**/*.ts')
        .pipe(compileInterface({
            fileName: 'schema.json'
        }))
        .pipe(dest('dist/interfaces'));
}
```

所有 interface 会编译为一个文件，在运行时需要加载这个文件。

### 运行时初始化

使用 initSchema 函数来初始化生成的 schema。

```ts
import path from 'path';
import {FastifyInstance} from 'fastify';
import {initSchema} from '@hoth/schema';
export default async function main(fastify: FastifyInstance, config) {
    await initSchema(fastify, {
        schemaPath: path.resolve(__dirname, './interfaces/schema.json')
    });
    return fastify;
}
```

### 在 controller 中使用

所有的 interface 都会转为 json schema，并通过 fastify 的 addSchema 函数添加到当前应用。通过 ref 语法使用即可：

```ts
import {Controller, GET, Inject} from '@hoth/decorators';
import {FastifyReply, FastifyRequest} from 'fastify';

@Controller('/index')
export default class AppController {

    @GET({
        url: '',
        options: {
            schema: {
                querystring: {$ref: 'hoth/aaa.ts#/definitions/bbb'}
            }
        }
    })
    getApp(req: FastifyRequest, reply: FastifyReply) {

        return '';
    }
}
```

### 自定义 schema id

默认生成的 id 为 `hoth/${文件名}`，不同目录下的同名文件可能会冲突。

可以在编译时通过以下方式自定义 schema id：

```js
import {compileInterfaceToSchema} from '@hoth/schema/dist/gulp';

function compile() {
    return src('src/interfaces/**/*.ts')
        .pipe(compileInterfaceToSchema({
            fileName: 'schema.json',
            getId(filePath) {
                return ''; // 这里根据 filePath 生成一个新的 id 来返回。
            }
        }))
        .pipe(dest('dist/interfaces'));
}
```