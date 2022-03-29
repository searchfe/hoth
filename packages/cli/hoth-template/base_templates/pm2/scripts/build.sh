#!/bin/bash
set -ex

export BUILD_REPO_WS=$PWD                   # 获取代码根目录

workspace=$(cd "$(dirname "$0")/.." && pwd)
echo use "${workspace}"
cd "${workspace}"

node --version
npm --version

cd "${workspace}"
export npm_config_cache=$BUILD_REPO_WS/.npm
npm install yarn@1.16.0 pm2@4.5.4 --product -g --registry https://registry.npmmirror.com
npm set strict-ssl false
yarn install --registry=https://registry.npmmirror.com --unsafe-perm --prefer-offline --cache-folder "$BUILD_REPO_WS/.yarn"
mkdir -p output

npm run build

mkdir -p app
cp -r ./dist/* app

# 再安装一遍依赖，只按照运行时需要的
rm -rf node_modules
yarn install --production --registry=https://registry.npmmirror.com --unsafe-perm --prefer-offline --cache-folder "$BUILD_REPO_WS/.yarn"

# 把上线依赖输出到构建产物
cp -r conf bin node_modules app package.json yarn.lock pm2.config.js main.js output
