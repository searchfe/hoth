# __appName__

### 快速启动

```sh
$ npm install
$ npm run dev
```

### 目录说明

- `serve`：nodeui 服务器端相关代码
    - `config/molecule.json`: molecule配置文件
    - `mock`：本地预览 mock 数据，里面的文件名与路由一致
    - `app.ts`: 入口文件（基本啥也不用做）
- `src`：前端模板文件


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

### nodeui渲染相关

参考 serve/README.md