# @hoth/bdconf

支持的conf文件类型： `.conf`，`.json`，`.dict`.

## Usage

```
import {resourceManager} from '@hoth/bdconf';
import {resolve} from 'path';
import {FastifyLoggerInstance, fastify} from 'fastify';

const rootDir = resolve('./conf'); // conf 根路径(绝对路径)
const logger: FastifyLoggerInstance = fastify.log;

let manager = resourceManager(rootDir, logger);
// 从 data.conf 注册加载所有conf
await manager.registerResourceFromConfig('data.conf');

// 获取所有 conf 数据
let data = manager.fetchAll();

// 获取单个 conf 数据，参数为 conf 名称
let data = manager.fetch('dict1');

```

## conf 目录示例

```
└── conf
    ├── conf.json
    ├── data.conf
    ├── dict1.conf
    ├── dict2.dict
```

data.conf 作为注册入口，示例如下：

```
[dict1]
filename: dict1.conf

[dict2]
filename: dict2.dict

[conf]
filename: conf.json
```

## hoth 工程使用

基于 hoth cli 搭建的工程，已自动加载 conf 数据。conf 数据已挂载 request 上：`req.$appConfData.get('dict2')`
