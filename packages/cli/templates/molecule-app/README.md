# __appName__

### 快速启动

```sh
$ npm install
$ npm run dev
```

### 目录说明

- `serve`：nodeui 服务器端相关代码
    - `config/molecule.json`: molecule配置文件
    - `app.ts`: 入口文件（基本啥也不用做）
- `src`：前端模板文件
- `mock`：本地预览 mock 数据，里面的文件名与路由一致

### 发布目录规范

服务器端ssr目录规范如下：

```
├── app.js
├── config
│   └── molecule.json
└── view  # src 下的编译产出放在这个文件
    └── main
        └── index.js
```

前端 static 文件目录随意

### config/molecule.json 说明

```
{
    "controllers": [
        {
            "name": "index",  // 路由名称，必选
            "ctrlPath": "view/main/index",  // 路由对应的 molecule controller 文件，必选
            "httptype": "get", // 路由请求类型，必选
            "json": true // 可选，为true是，路由返回值会封装为json，具体如下
        },
        {
            "name": "test",
            "ctrlPath": "view/main/index",
            "httptype": "post"
        }
    ]
}

```

json=true，路由返回格式如下：

- 渲染正常

```
{
    statusCode: 200,
    data: ''  // controller.render的返回值
}
```

- 渲染错误
```
{
    statusCode: 500,
    message: 'render error'
}
```

json=false 或者 json字段不存在，路由返回如下：

- 渲染正常，直接返回controller.render的返回值

- 渲染错误，返回null

### 渲染数据说明
- 路由为 post：会将 request.body 数据透传给 controller，作为渲染所需数据
- 路由为 get：会将 request.query 透传给 controller，作为渲染所需数据
