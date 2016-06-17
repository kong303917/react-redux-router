# react-redux-router

## 说明  
本仓库保存的是 react + redux + react-router + 服务端渲染 的案例,
服务端采用的是 express 框架, 打包工具使用的是 webpack

存在一定的问题, 欢迎提出  

## 安装  
一. 克隆仓库
```bash
git clone https://github.com/kong303917/react-redux-router.git
cd react-redux-router
```  
  
二. 安装依赖
```bash
npm install
```  
  
三. 安装webpack(如果没有)
```bash
npm install -g webpack
```  

## 使用  
一. 编译\打包文件
```bash
npm run server
```  
等待编译完成.  
  
二. 运行
新开控制台窗口,运行下面命令
```bash
npm start
```  
  
三. 访问
浏览器输入 localhost:3000 访问

## 目录 

-- bin  
　　-- www (启动入口)  
　　-- wwwApp.js (webpack 打包 www 后的启动入口)   
-- public (静态资源)  
-- routes (路由)  
　　-- server.js ( 页面路由 )  
　　-- users.js (接口路由,fetch 请求使用 )  
-- views (视图文件)  
　　-- react (react各种文件)  
　　　　--actions (redux 的 action)  
　　　　--components (react 的 各个组件 )  
　　　　--containers (组合 组件的 容器页面, 一般直接用在路由中)  
　　　　--history (react-router 的 history模块, 需要是引入,可改变 路由地址(跳转))  
　　　　--reducers (redux 的 reducer)  
　　　　--routes (路由排版文件)  
　　　　--selectors (引入reselect, 将store 的 state 变成 props 插入 containers中)  
　　　　--store (redux 的 createStore 加入中间件后的新函数 )  

-- app.js (express 配置入口)  
-- package.json (包详情)  
-- README.md (说明)  
-- webpack.server.config.json (webpack 服务端打包配置文件 )  
-- webpack.static.config.json (webpack 客户端打包配置文件 )  

## 问题  
### 一. 服务端打包
心里一直觉得毛毛的, 服务端到底需不需要webpack打包,应该如何打包.  
如果不打包, 服务端渲染就会遇到很多问题 ES6语法(例如 import ) 或者 (jsx) 的某些语句无法实现,  
打包了感觉整个文件很大, 很乱, 没有找到合适的教程, 希望有人指点  

### 二. __dirname    

****
感谢react中文社区的 [oneapm](http://react-china.org/users/oneapm/activity)
<font color=#DC143C >(已解决,在webpack配置文件上添加以下配置即可:)</font>
```
module.exports = {
	node: {
		__filename: true,
		__dirname: true
	}
        ...
};
```  
<font color=#DC143C >(现在已经正常使用了 ejs 视图模板引擎 和 静态文件 了)</font>  

***

(原问题)
这也是服务端使用webpack 打包遗留的问题, __dirname在服务器很常使用, 例如在 express 中,
<pre>app.use('/public',express.static(__dirname + '/public'));</pre>
用来设置静态文件路由  
<pre>app.set('views', path.join(__dirname, 'views'));</pre>
用来设置视图模板路径  

然而, 利用webpack 打包后, 
```js
console.log(__dirname);// 等于'/'  
console.log(__filename);// 等于'/index.js'
```
这对我造成很大的困扰,无法使用静态文件(css,js),也无法使用视图模板, 最终只能新开一个服务器输送静态文件, 也只能直接输出视图字符串  
不知是不是我哪里造成了错误,或者有什么解决方案  
后续有解决方法也会更新  

### 三. 文件过大的问题  
#### 优化一  
****
<font color=#DC143C >(已解决, 原来的配置文件添加了devtool: 'eval', 使得所有注释都无法删除,删掉降到了296k)</font>
结果
```bash
Time: 6312ms
    Asset    Size  Chunks             Chunk Names
bundle.js  293 kB       0  [emitted]  bundle
    + 257 hidden modules
```
****
#### 优化二  
****
使用了 @wyvernnot 的 [webpack_performance](https://github.com/wyvernnot/webpack_performance/tree/master/compress-example), 一篇webpack优化的文章,
利用 DefinePlugin 消除环境监测的代码 <code>if (process.env.NODE_ENV !== 'production')</code> 之类的.
在plugins 加上相应配置,如下:
```js
plugins:[
    ...
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
 ]
```
然后在执行webpack的时候加上NODE_ENV环境变量 
```bash
NODE_ENV=production webpack --config webpack.static.config.js
```
结果
```bash
Time: 6738ms
    Asset    Size  Chunks             Chunk Names
bundle.js  276 kB       0  [emitted]  bundle
    + 256 hidden modules
```
这个时候发现减少了 10多k (一分钱也是肉 -_-)  
然而, 还有更加神奇的事  
运行webpack 的时候加上<code>--optimize-minimize</code>(就是压缩指令)
```
NODE_ENV=production webpack --config webpack.static.config.js --optimize-minimize
```
结果
```bash
Time: 9200ms
    Asset    Size  Chunks             Chunk Names
bundle.js  222 kB       0  [emitted]  bundle
    + 252 hidden modules
```
又节省了50多k, 加起来足足缩小了70k.
虽然明明我的配置里已经有了压缩插件, 却还是需要用<code> --optimize-minimize</code>来配合DefinePlugin 去压缩, 确实很神奇呢  

****

(原问题)
静态js资源|打包丑化完成后,足足有1M大小,不得了啊, 到底是什么原因: 引入文件过多? webpack配置有问题 ? 有什么解决方案

## 后续  
目前正在练习,代码还很乱,之后会不断优化,各种bug如果有解决方法也会更新上来,希望能对个人刚接触react的朋友有所帮助,也希望大神们能指点迷津


