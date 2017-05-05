# 项目配置说明文档

## 开发环境

- nodejs

- npm


## 使用

``` bash
$ npm install
$ npm run dev
```

如果本机8080端口被占用，在`/config/index.js`中修改端口号。 否则执行 `npm run dev` 会失败。

## 命令

- `npm run dev`
  启动本地server，server具有热启动功能，修改代码后，浏览会自动刷新。

- `npm run build`:
	生成带哈希值目标代码，默认放在dist目录，用于生产环境。

## 目录说明

### build
存放webpack配置脚本，无特别需求不用修改。

### config
存放项目构建配置，根据需要修改其中的配置。

#### build配置项如下：

| 配置项 	| 功能 	| 默认 	|
|---------------------	|----------------------------	|-----------------------------	|
| index 	| 配置生成的html文件位置 	| yourproject/dist/index.html 	|
| assetsRoot 	| 配置生成的文件存放的根目录 	| yourproject/dist 	|
| assetsSubDirectory 	| 配置目标代码的静态资源目录 	| yourproject/dist/static 	|
| assetsPublicPath 	| 配置目标代码的线上地址 	| / 	|
| productionSourceMap 	| 配置是否使用source map 	| false 	|

#### dev配置项如下

| 配置项 	| 功能 	| 默认 	|
|--------------------	|------------------------	|--------	|
| port 	| 配置本地开发端口号 	| 8080 	|
| assetsSubDirectory 	| 配置静态资源目录 	| static 	|
| assetsPublicPath 	| 配置线上地址 	| / 	|
| proxyTable 	| 配置代理 	| 空 	|
| cssSourceMap 	| 配置是否使用source map 	| true 	|
| autoOpenBrowser 	| 是否自动打开浏览器 	| false 	|
