# nodejs简介

## node 可以做什么

Nodejs作为一个javascript得运行环境，仅仅提供了基础得功能和API。然而，基于nodejs提供得这些基础能，很多强大得工具和框架如雨后春笋，层出不穷，所哟学会了nodejs ，可以让前端程序员胜任跟多得工作和岗位

- 基于Express(https://www.expressjs.com.cn/)框架，可以快速构建web应用
- 基于Electorn(https://www.electronjs.org/docs/latest)框架，可以构建跨平台得桌面应用
- 基于restify(restify.com)框架，可以快速构建API接口项目
- 读写和操作数据库，创建使用得命令行工具辅助前端开发

## fs文件系统模块

#### <span style='color:red'>读取</span>指定文件中得内容

##### readFile() 得语法格式
使用fs.readfile()方法，可以读取指定文件中得内容，语法格式如下：
```js
fs.readFile(path,[options],callback)
- 参数1：必选参数，字符串，表示文件得路径
- 参数2：可选参数，表示以什么编码格式来读取文件
- 参数3：必选参数，文件读取完成后，通过回调函数拿到读取得结果
```

##### fs.readFile() 得示例代码
以utf8得编码格式，读取指定文件得内容，并打印err和dataStr得值
```js
const fs = require('fs')
fs.readFile('./files/1.txt','utf8',function(err,result){
    console.log(err);
    console.log('---------');
    console.log(result);
})
```

##### 判断文件是否读取成功
可以判断err对象是否微null，从而知晓文件得读取结果
```js
const fs = require('fs')

fs.readFile('./files/1.txt','utf8',function(err,result){
    if(err){
        return console.log('文件读取失败' + err.message)
    }
    console.log('文件读取成功' + result);
})

```
#### 向指定得文件中<span style='color:red'>写入内容</span>

##### fs.writeFile() 的语法格式
使用fs.writeFile() 方法，可以向指定的文件中写入内容，语法如下
```js
fs.writeFile(path,data,[options],callback)
- 参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径
- 参数2：必选参数，表示需要写入的内容
- 参数3：可选参数，表示以什么格式写入文件内容，默认utf8
- 参数4：必选参数，文件写入完成后的回调函数
```
#### fs模块-路径动态拼接的问题 __dirname
在使用fs模块文件时，如果提供的操作路径是以./或../开头的<span style='color:red'>相对路径</span>是，很容易出现路径动态凭借错误的问题

原因：代码在运行的时候，<span style='color:red'>会议执行node命令时所处的目录</span>，动态拼接出被操作文件的完整路径

解决方案：在使用fs模块操作文件时，<span style='color:red'>直接提供完整的路径</span>，不要提供./或../开头的相对路径，从而防止路径动态拼接的问题
```js
不要使用./ 或../ 这样的相对路径
fs.readFile('./files/1.txt','utf8',function(err,result){
    if(err){
        return console.log('文件读取失败' + err.message)
    }
    console.log('文件读取成功' + result);
})

// __dirname 表示当前文件所在的目录

fs.readFile(__dirname + './files/1.txt','utf8',function(err,result){
    if(err){
        return console.log('文件读取失败' + err.message)
    }
    console.log('文件读取成功' + result);
})
```

## path 路径模块

#### 什么是path路径模块
path模块是nodejs、官方提供的、用来处理路径的模块，它提供了一系列的方法和属性，用来满足用户对路径的处理需求
例如：
- path.join() 方法，用来将多个路径片段拼接成一个完整的路径字符串
- path.basename() 方法，用来从路径字符串中，将文件名解析出来

#### 路径拼接

##### path.join() 的代码示例
```js
const pathStr = path.join('/a','/b/c','../','./d','e') // ../ 会把上一级目录给抵消
console.log(pathStr); // \a\b\d\e

const pathStr2 = path.join(__dirname,'./files/1.txt')
console.log(pathStr2); // C:\Users\scq\Desktop\study\node\files\1.txt
```
#### 获取路径中的文件名

##### path.basename() 的代码示例

使用path.basename() 方法，可以从一个文件路径中，获取到文件的名称部分
```js
const fpath = '/a/b/c/index.html' //文件的存放路径

let fullName = path.basename(fpath)
console.log(fullName); //  index.html

let nameWidthout = path.basename(fpath,'.html')
console.log(nameWidthout);
```
#### 获取路径中的扩展名

##### path.extname() 的代码示例
使用path.extname() 方法，可以获取路径中的扩展名部分
```js
const fpath = '/a/b/c/index.html' //文件的存放路径
const fext = path.extname(fpath)
console.log(fext); // .html
```

##### 注意
1. fs.writeFile() 方法只能用来创建文件，不能用来创建路径
2. 重复调用fs.wariteFile() 写入同一个文件，新写入的内容会覆盖之前旧内容




## 什么是http模块
在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供网络服务的电脑，叫做服务器

http模块是Nodejs 官方提供的，用来创建web服务器的模块，通过http模块提供的 ```http.createServer()``` 方法，就能方便的把一台普通的电脑，变成一台微博 服务器，从而对外提供web服务

```js
//调用http.createServer() 方法，可快速创建一个web服务器
const http = require('http')

const server = http.createServer()

// 使用服务器实例的 .on方法，微服务器绑定一个 require 事件：
server.on('request',(req,res)=>{
    //只要偶客户端请求我们自己的服务器，就会触发 request 事件，从而调用这个事件处理函数
    console.log('this is web server');
})

// 调用server.listen(端口号，callb) 方法，即可启动web服务器
server.listen(80,()=>{
    console.log('http server running at http://127.0.0.1');
})

```
#### req请求对象

只要服务器收到了客户端的请求，就会调用通过 <span style='color:red'>server.on()</span> 微服务器绑定的 request 事件处理函数。

如果想在事件处理函数中，访问与客户端相关的<span style='color:red'>数据或属性</span>，可以使用下面的方式

```js
server.on('request',(req,res)=>{
    //只要偶客户端请求我们自己的服务器，就会触发 request 事件，从而调用这个事件处理函数
    // req 是请求对象，它包含了与客户端相关的数据和属性，例如：
    // req.url 是客户端请求的 URL
    // req.method 是客户端的method 请求类型 
    console.log('this is web server' + req.url +"/" + req.method);
})
```

#### res 响应对象

在服务器的request事件处理函数中，如果想访问与服务器相关的数据或属性

```js
server.on('request',(req,res)=>{
    //只要偶客户端请求我们自己的服务器，就会触发 request 事件，从而调用这个事件处理函数
    const dataStr = 'this is web server' + req.url +"/" + req.method
    console.log(dataStr);

    // res 是响应对象，它包含了服务器相关的数据或属性
    // 要发送到客户端的 字符串
    // res.end() 方法的作用： 向客户端发送指定的内容，并结束这次请求的处理过程
    res.end(dataStr) 
})
```

#### 解决<span style='color:red'>中文乱码</span>问题

当调用```res.end()``` 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式

```js
server.on('request',(req,res)=>{
    const dataStr = '哈哈哈'
    // 为了防止中文显示乱码的问题，需要设置响应头，Content-Type 的值为 text/html;charset=utf-8
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(dataStr) 
})

```
#### 动态响应内容

```js
server.on('request',(req,res)=>{
    const url = req.url
    let contet = '<h1>404</h1>'
    if(url === '/' || url === 'index.html'){
        contet = '<h1>首页</h1>'
    }else if(url === 'about.html'){
        contet = '<h1>关于</h1>'
    }

    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(contet) 
})

// 调用server.listen(端口号，callb) 方法，即可启动web服务器
server.listen(80,()=>{
    console.log('http server running at http://127.0.0.1');
})
```



## Nodejs中模块得分类

Nodejs 中根据模块来源得不同，将模块分为了3大类，分别是：
- 内置模块（内置模块是由Nodejs官方提供的，例如fs、path、http等）
- 自定义模块（用户创建得每个 .js文件，都是自定义模块）
- 第三方模块（由第三方开发出来得模块），并非官方提供得内置模块，也不是用户创建得自定义模块，使用前需要下载

#### <span style='color:red'>加载</span>模块

使用强大得require() 方法，可以加载需要得内置模块、用户自定义模块、第三方模块进行使用。例如：
```js
1、加载内置fs模块
const fs = require('fs')
2、加载用户得自定义模块
const custom = require('./01fs读取.js')
3、加载第三方模块
const moment = require('moment')
```

#### 向外共享模块作用域中得成员

##### <span style='color:red'>module.exports</span> 对象

在自定义模块中，可以使用module.exports 对象，将模块内得成员共享出去，供外界使用。外界用require方法导入自定义模块时，得到得就是 module.exports 所指向得对象

##### exports 和 module.exports 得使用误区

时刻谨记，require() 模块时，得到得永远时<span style='color:red'>module.exports </span> 指向得对象：

**注意**为了防止混乱，建议大家不要在同一个模块中同时使用exports和module.exports

#### <span style='color:red'>devDependencies</span> 节点

如果某些包<span style='color:red'>只在项目开发阶段</span>会用到，在<span style='color:red'>项目上线之后不会用到</span>，则建议把这些包记录到devDenpendencies 节点中。与之对立，如果某些包在开发中和项目上线之后都需要用到，则建议吧这些包记录到dependencies节点中

可以使用如下命令

``` js
1、安装指定得包，并记录到devDependencies 节点中
npm i 包名 -D
2、上面时简写，完整写法
npm install 包名 --save-dev
```
#### 解决下包速度慢得问题

##### <span style='color:red'>切换</span>npm下包镜像源

```js
1、查看当前得下包镜像源
npm config get registry
2、将下包得镜像源切换为淘宝镜像源
npm config set registry=http://registry.npm.taobao.org/
3、检查镜像源是否下载成功
npm config get registry
```

#### nrm

为了更方便得切换下包得镜像源，我们可以安装nrm 这个小工具，利用nrm 提供得终端命令，可以快速查看和切换下包得镜像源
```
1、通过npm 包管理器，将nrm安装为全局可用得工具
npm i nrm -g
2、查看所有可用得镜像源
nrm ls
3、将下包得镜像源切换为taobao镜像
nrm use taobao
```

#### 包得分类

##### 项目包

那些被安装到项目得node_modules 目录中得包，都是项目包

项目包分为两类，分别是：
- 开发依赖包（被记录到devDpendencies节点中得包，旨在开发期间会用到）
- 核心依赖包（被记录到dependencies节点中得包，在开发期间和项目上线之后都会用到）

##### i5ting_toc

iting_toc是一个可以把md文档转为html页面得小工具，使用步骤如下：
```js
1、将i5ting_toc安装为全局包
npm install -g i5ting_toc
2、调用i5ting_toc，轻松实现md转html得功能
i5ting_toc 
```


