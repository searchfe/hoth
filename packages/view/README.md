# @hoth/molecule

### Demo

controller.ts

```
import {FastifyLoggerInstance} from 'fastify';
import {Controller as IController} from '@baidu/molecule';

export class Controller implements IController {
    root: string;
    logger: FastifyLoggerInstance;

    constructor(options: Option) {
        this.logger = options.logger;
        this.root = options.root;
    }

    render(data: Data) {
        return `appname is ${data.appname}, route name is ${data.name}, title is ${data.title}`;
    }
}
```

node server

```
import {molecule} from '@hoth/molecule';

let ret = await molecule(ctrlPath, data, {
    root: '/dist',
    appName: 'appname',
    name: 'route name',
    logger: fastify.log,
});
```