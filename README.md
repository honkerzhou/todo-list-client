# todo-list-client &middot; [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
一个体验全栈开发的由浅入深练手项目，前后端分离。本仓库为前端部分，后端部分见[todo-list-server](https://github.com/honkerzhou/todo-list-server)  
前端：Vue CLI 4.x + Vue 2.x + Vue Router + Vuex + Element-UI + Axios + ES6  
后端：Node.js(Koa2) + MongoDB + Restful API  
测试：Vue Test Utils + Jest 

如果有兴趣的话，欢迎大家加入，随意造作
## Features
- 离线可用
- JWT用户验证
- REST风格的 API
- ......

## Resource
在线地址：[todo.honkerzhou.com](http://todo.honkerzhou.com)  
体验账号/密码：honkerzhou  
配套教程（完善中）：[手把手带你入门全栈](https://honkerzhou.com/tutorial/todo-list/)


## Installing / Getting started
```shell
git clone https://github.com/honkerzhou/todo-list-client.git
cd todo-list-client
npm install
npm run dev
```
各步骤运行完后，在浏览器中输入`http://localhost:8080/`即可进入项目首页  
如需API配合，请与后端部分配套使用：[todo-list-server](https://github.com/honkerzhou/todo-list-server)


## Developing

### Built With
1. Vue CLI 3.x  
2. Vue 2.x 
3. Vue Router 
4. Vuex 
5. Element-UI 
6. Axios

### Prerequisites
1. Node.js >= 12.x


### Setting up Dev
没啥要求，遵守GitHub Flow就行

### Building
```shell
npm run build
```

### Deploying / Publishing
将`npm run build`后生成的`dist`目录扔到服务器上的存放静态资源的地方即可

## Configuration
暂无

## Tests
```shell
npm run test
```

## Style guide

[Standard](https://github.com/standard/standard)

## Api Reference
暂无


## Todos

- [ ] 首屏渲染性能优化
  - [x] Element UI 按需加载(`chunk-vendors.js`从803KB降至321KB，目标244KB)
  - [x] 路由懒加载
  - [ ] 使用 CDN 外部加载资源（今天尝试了一下，有两个问题：1、CDN可能会挂；2、开发和线上环境暂时无法完全分离配置，待继续研究）
- [ ] 节流与防抖
- [ ] HTTP缓存
- [ ] 单元测试
- [ ] E2E测试
- [ ] PWA
- [ ] 开发V2版本
  - [ ] 每日待办重置（可选择恢复前一日未做完的待办）
  - [ ] 历史待办清单

## Licensing
[MIT](./LICENSE)





