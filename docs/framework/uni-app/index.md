---
# 取二三级标题生成目录
outline: [2,3]
---

# uni-app

## 简介

**uni-app 是一个使用 Vue.js进行 开发所有前端应用的框架**。开发者编写一套代码，即可发布到 iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。


> 详细的 uni-app 官方文档，请翻阅 https://uniapp.dcloud.net.cn/



## 学习uniapp本质

1. 移动端技术太多，跨端框架或是未来发展趋势。
2. 一套代码多端发布受开发者青睐。
3. 完整的生态，受企业青睐


## uni-app和vue的关系

- 使用vueJS开发
- 在发布到H5时，支持所有vue语法
- 发布到App和小程序时，实现部分Vue语法



## uni-app和小程序有什么关系

- 组件标签靠近小程序规范
- 接口能力（JS API）靠近微信小程序开发
- 完整的小程序生命周期


## 文档相关

1. 开发文档：https://developers.weixin.qq.com/miniprogram/dev/framework/
2. 微信公众平台：https://mp.weixin.qq.com/

## 开发者工具

​	下载地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

### 使用

**appID获取**

> 微信公众平台进行appID获取


### 小程序代码构成

> 参考地址：https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/code.html#JSON-%E9%85%8D%E7%BD%AE

1. `.json` 后缀的 `JSON` 配置文件
2. `.wxml` 后缀的 `WXML` 模板文件
3. `.wxss` 后缀的 `WXSS` 样式文件
4. `.js` 后缀的 `JS` 脚本逻辑文件



**小程序基本结构**

```html
<view class="container">
  <view class="userinfo">
    <button wx:if="{{!hasUserInfo && canIUse}}"> 获取头像昵称 </button>
    <block wx:else>
      <image src="{{userInfo.avatarUrl}}" background-size="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
  </view>
</view>
```



### 小程序基本操作

- **配置信息**

  - 全局配置 -> https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html

    ```json
    {
      "pages": [
        "pages/index/index",
        "pages/logs/index"
      ],
      "window": {
        "navigationBarTitleText": "Demo"
      },
      "tabBar": {
        "list": [{
          "pagePath": "pages/index/index",
          "text": "首页"
        }, {
          "pagePath": "pages/logs/index",
          "text": "日志"
        }]
      },
      "networkTimeout": {
        "request": 10000,
        "downloadFile": 10000
      },
      "debug": true
    }
    ```

    

  - 页面配置

    ```json
    {
      "navigationBarBackgroundColor": "#ffffff",
      "navigationBarTextStyle": "black",
      "navigationBarTitleText": "微信接口功能演示",
      "backgroundColor": "#eeeeee",
      "backgroundTextStyle": "light"
    }
    ```

- **全局生命周期函数**

  ```js
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
      
    },
  
    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {
      
    },
  
    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {
      
    },
  
    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {
      
    }
  ```
  - **页面生命周期函数** -> https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html

  ```js
   onLoad: function(options) {
      // 页面创建时执行
    },
    onShow: function() {
      // 页面出现在前台时执行
    },
    onReady: function() {
      // 页面首次渲染完毕时执行
    },
    onHide: function() {
      // 页面从前台变为后台时执行
    },
    onUnload: function() {
      // 页面销毁时执行
    },
    onPullDownRefresh: function() {
      // 触发下拉刷新时执行
    },
    onReachBottom: function() {
      // 页面触底时执行
    },
    onShareAppMessage: function () {
      // 页面被用户分享时执行
    },
    onPageScroll: function() {
      // 页面滚动时执行
    },
    onResize: function() {
      // 页面尺寸变化时执行
    }
  ```

- **组件生命周期**->https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html

  ```js
  Component({
    lifetimes:{
      created() {
        console.log('created,组件实例刚刚被创建好时， created 生命周期被触发')
      },
      attached() {
        console.log('组件实力进入页面节点树时候进行执行');
      },
      detached() {
        console.log('在组件实例被从页面节点树移除时执行');
      }
    }
  })
  ```

  

- **界面跳转**

  - 新界面打开=>https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html

    ```js
    调用 API wx.navigateTo
    使用组件 <navigator open-type="navigateTo"/>
    ```

  - 页面重定向

    ```js
    调用 API wx.redirectTo
    使用组件 <navigator open-type="redirectTo"/>
    ```

  - 页面返回

    ```
    调用 API wx.navigateBack
    使用组件<navigator open-type="navigateBack">
    用户按左上角返回按钮
    ```

  - Tab切换

    ```javascript
    调用 API wx.switchTab
    使用组件 <navigator open-type="switchTab"/>
    用户切换 Tab
    ```

  - 重启动

    ```js
    调用 API wx.reLaunch
    使用组件 <navigator open-type="reLaunch"/>
    ```

- **数据绑定**

  ```html
  <view>{{message}}</view>
  ```

  ```js
  Page({
    data:{
      message:"hello world"
    }
  })
  ```

- **条件渲染**

  ```html
  <view wx:if="{{isShow}}">条件判断显示</view>
  ```

  ```
  Page({
  	data:{
  		isShow:false
  	}
  })
  ```

  

- **列表渲染**

  ```html
  <view wx:for="{{list}}" wx:for-index="idx" wx:for-item="itemName">
    {{idx}}: {{itemName.name}}
  </view>
  ```

  ```js
  Page({
    data: {
      list:[
        {name:'a'},
        {name:'b'}
      ]
    }
  })
  ```

## uniapp开发规范

- 页面文件遵循Vue单文件组件（SFC）规范

- 组件标签靠近小程序规范 =>https://uniapp.dcloud.io/component/README

  ```vue
  <template>
  	<view>
  		页面内容
  	</view>
  </template>
  
  <script>
  	export default {
  		data() {
  			return {
  			}
  		},
  		methods: {	
  		}
  	}
  </script>
  
  <style>
  </style>
  ```

- 接口能力（JS API）靠近微信小程序规范 => https://uniapp.dcloud.io/api/README

  ```java
  uni.getStorageInfoSync()
  ```

- 数据绑定事件处理同Vue.js规范

  ```vue
  <template>
    <view @click="onClickFn">
        点击事件绑定
    </view>
  </template>
  
  <script>
  export default {
    methods: {
      onClickFn() {
        console.log('click事件')
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>
  ```

- 兼容多端运行，使用flex布局进行开发



---



## uniapp开发环境

### 开发工具

uni-app 官方推荐使用 **HBuilderX** 来开发 uni-app 类型的项目。主要好处：

- 模板丰富
- 完善的智能提示
- 一键运行

### 下载 HBuilderX

1. 访问 HBuilderX 的官网首页 https://www.dcloud.io/hbuilderx.html
2. 点击首页的 `DOWNLOAD` 按钮
3. 选择下载 `正式版`/alpha -> `App 开发版`
4. 将下载的 `zip包` 进行解压缩
5. 将解压之后的文件夹，存放到**纯英文**的目录中（且不能包含括号等特殊字符）
6. 双击 `HBuilderX.exe` 即可启动 HBuilderX
7. 详细安装文档：=> https://hx.dcloud.net.cn/Tutorial/install/windows



## 工程搭建

1. 文件 -> 新建 -> 项目

2. 填写项目基本信息


​	**基本目录结构**

```css
项目名称
----【pages】    内部存放所有页面
----【static】   存放所有静态资源，比如图片，字体图标
----【unpackage】存放所有打包生成后的文件
----app.vue     应用配置，用来配置App全局样式以及监听 应用生命周期
----main.js			Vue初始化入口文件
----mainfast.json  配置应用名称、appid、logo、版本等打包信息
----pages.json    配置页面路由、导航条、选项卡等页面类信息
----uni.scss      用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，uni.scss文件里预置了一批scss变量预置。
```



## 项目运行

### 小程序运行

1. 填写自己的微信小程序的 AppID：


2. 在 HBuilderX 中，配置“微信开发者工具”的**安装路径**：


3. 在微信开发者工具中，通过 `设置 -> 安全设置` 面板，开启“微信开发者工具”的**服务端口**：


4. 在 HBuilderX 中，点击菜单栏中的 `运行 -> 运行到小程序模拟器 -> 微信开发者工具`，将当前 uni-app 项目编译之后，自动运行到微信开发者工具中，从而方便查看项目效果与调试：


### app真机运行

> ​	确保你的手机与电脑是在同一个局域网下面

1. 手机开启开发者模式
2. 选择数据管理
3. hbuildeX选择真机运行
4. 等待基座安装
5. 安装完成手机运行项目

### IOS模拟器运行

1.  Xcode下载
2. 定义版本进行模拟器运行

---

## 组件

文档参考地址：https://uniapp.dcloud.net.cn/component/

## 基础组件

> 基础组件在uni-app框架中已经内置，无需将内置组件的文件导入项目，也无需注册内置组件，随时可以直接使用，比如`<view>`组件。


**组件演示参考地址** => https://hellouniapp.dcloud.net.cn/pages/component/view/view

### 基础组件列表

- 视图容器
  - view 视图容器，类似于html中的div
  - scroll-view 可滚动试图容器 => https://uniapp.dcloud.net.cn/component/scroll-view
  - swiper 滑块视图容器，比如用于轮播banner
- 基础内容
  - icon 图标 => uni-icons
  - text 文字
  - rich-text 文字
  - progress 进度条
- 表单组件（Form）
  - button 按钮
  - checkbox 多项选择器
  - editor 富文本输入框
  - form 表单
  - input 输入框
  - label 标签
  - picker 弹出式聊表选择器
  - picker-view 窗体内嵌入式聊表选择器
  - radio 单项选择器
  - slider 滑动选择器
  - switch 开关选择器
  - textarea 多行文本输入框
- 路由与页面跳转（Navigation）
  - navigator 页面链接，类似于html中的a标签
- 媒体组件
  - audio 音频
  - camera 相机
  - image 图片
  - video 视频


## 扩展组件

Demo地址：https://hellouniapp.dcloud.net.cn/pages/component/scroll-view/scroll-view

参考地址：https://ext.dcloud.net.cn/search?q=uni-icons

## 自定义组件

1. componets文件夹下定定义组件
2. 页面引用组件，无需倒入适量，直接使用即可
3. 其他操作（组件传值，事件绑定同vue）


## 基础API

**参考地址**：https://uniapp.dcloud.net.cn/api/README

### API列表

- **网络请求**

  - uni.request 发起网络请求

    > 为了解决uni.request网络请求API相对简单的问题，可使用@escook/request-miniprogram进行网路请求的处理
    >
    > 参考地址：https://www.npmjs.com/package/@escook/request-miniprogram
    >
    > **在小程序中，无法使用fetch及axios进行网络请求发送**
    
    **测试接口地址：https://study.duyiedu.com/api/herolist**

- 上传、下载

  - uni.unloadFile 上传文件  => https://uniapp.dcloud.net.cn/api/request/network-file
  - uni.downloadFile 下载文件

- 图片处理

  - uni.chooseImage 从相册选择图片，或者拍照 =>https://uniapp.dcloud.net.cn/api/media/image?id=chooseimage
  - uni.previewImage 预览图片
  - uni.getImageInfo 获取图片信息

- 数据缓存 => https://uniapp.dcloud.net.cn/api/storage/storage?id=setstorage

  - uni.getStorage 异步获取本地数据缓存
  - uni.getStorageSync 同步获取本地数据缓存
  - uni.setStorage 异步设置本地数据缓存
  - uni.setStorageSync 同步设置本地数据缓存
  - uni.removeStorage 异步删除本地数据缓存
  - uni.reoveStorageSync 同步删除本地数据缓存

- 交互反馈 => https://uniapp.dcloud.net.cn/api/ui/prompt?id=showtoast

  - uni.showToast 显示提示框
  - uni.showLoading 显示加载提示框
  - uni.hideToast 隐藏提示框
  - uni.hideLoading 隐藏加载提示框
  - uni.showModal 显示模态框
  - uni.showActionSheet 显示菜单列表

- 路由

  - uni.navigateTo 保留当前页面，跳转到应用内某个界面，使用uni.navigateBack 返回原页面

  - uni.redirectTo 关闭当前界面，跳转到应用内的某个界面

  - uni.reLaunch 关闭所有界面，打开应用内的某个界面

  - uni.switchTab 跳转到tab Bar页面


## 页面布局相关

**page**

> 页面容器css属性

```css
page:{
  height:100%;
  background-color:red;
}
```

**尺寸单位**

可使用单位：px rpx,upx, rem vh  vw

**外部样式文件引入**

同vue使用相同	



## uniapp生命周期

**参考地址：**https://uniapp.dcloud.net.cn/collocation/frame/lifecycle?id=%e5%ba%94%e7%94%a8%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f

### 应用生命周期

- onLaunch 初始化完成时触发（全局🈯️触发一次）

- onShow uni-app启动，或从后台进入前台显示

- onHide 当uni-app 应用从前台进入后台

  > 只能在App.vue里面进行监听，在其他界面监听无效

### 页面生命周期

- onLoad 监听页面加载（可获取上个界面传递的参数）
- onShow 监听页面显示，每次出现在屏幕上都进行触发
- onReady 监听页面初次渲染完成
- onHide 监听页面隐藏
- onUnload 监听页面卸载
- onReachBottom 页面滚动到底部事件

### 组件生命周期

- beofreCreate 
- created
- boforeMount
- mounted
- boforeDestroy
- destroyed



---


## uniApp特色

### 条件编译

> 条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**条件编译支持的文件**

- .vue
- .js
- .css
- pages.json
- 各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug

> ​		条件编译是利用注释实现的，在不同语法里注释写法不一样，js使用 `// 注释`、css 使用 `/* 注释 */`、vue/nvue 模板里使用 `<!-- 注释 -->`；


#### 插件安装

1. ​	**scss安装**

   > 可以使用多种预编译处理器进行安装使用，以scss文件为例
   >
   > 下载地址：**https://ext.dcloud.net.cn/plugin?name=compile-node-sass**

## hbuilderX中使用unicloud云开发平台

### 文档

- 参考文档：https://uniapp.dcloud.io/uniCloud/README
- web控制台文档：https://unicloud.dcloud.net.cn/login



### 什么是unicloud

> `uniCloud` 是 DCloud 联合阿里云、腾讯云，为开发者提供的基于 serverless 模式和 js 编程的实现后端服务的云开发平台。不需要服务器的购买配置即可快速创建一个完整的后端服务。


### unicloud优点

- 用JavaScript开发前后台整体业务
- 非h5项目免域名使用服务器
- 敏捷性业务处理，不需要前后端分离开发

#### 云存储及CDN

> 可进行文件的相关存储操作

参考文档：https://uniapp.dcloud.io/uniCloud/storage

---





#### 创建云函数工程



1. **指定unicloud工程创建**


2. **保证uni-app应用标识appID填写**（保证用户为登录状态）


3. **进行云服务空间创建**

   > 如果未进行实名认证，会跳转至实名认证页面进行实名认证，等待实名认证审核之后可以开通服务空间。若腾讯云实名认证提示身份证下已创建过多账户，则需要在腾讯云官网注销不用的账户

4. 进行云函数创建


   ```js
   'use strict';
   // 一个通过nodeJS运行的函数在服务器端使用
   exports.main = async (event, context) => {
   	//event为客户端上传的参数
   	//context 包含了调用信息及运行状态,获取每次调用的上下文
   	console.log('event : ', event)
   	
   	//返回数据给客户端
   	return {
   		"code":0,
   		"msg":"云函数调用成功"
   	}
   };
   ```

   

5. **云WEB控制台查看**

6. **云数据库操作**

   > 在云数据库中进行数据操作，全部使用双引号进行值的定义

7. 云存储

   > 在云存储中进行文件的上传
   >
   > api使用：
   >
   > ```js
   > uniCloud.uploadFile({})
   > ```

8. 跨域处理

   参考文档https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5



## unicloud api操作

### 云函数调用

**参考文档**：https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=clientcallfunction

```js
// promise方式
uniCloud.callFunction({
    name: 'test', // 云函数名称
    data: { a: 1 }   // 请求参数
  })
  .then(res => {});

// callback方式
uniCloud.callFunction({
    name: 'test',
    data: { a: 1 },
    success(){},  // 成功
    fail(){},   // 失败
    complete(){}   // 完成（不管成功与失败）
});
```

### 云函数实现云数据库基本增删改查

#### 1. 获取数据库引用

```js
const db = uniCloud.database()
```

2. 获取数据库集合引用

   ```
   const collection = db.collection('unicloud-test-714') // uncloud-test-714 为数据表名称
   ```

3. 新增记录

   ```js
   const res = collection.add({user:'alan'})
   ```

   ```js
   'use strict';
   const db = uniCloud.database() // 获取数据库引用
   
   exports.main = async (event, context) => {
   	// 获取集合引用
   	const collection = db.collection('unicloud-test-714')
   	// 新增数据
   	const res = await collection.add({user:'alan'})
   	console.log(res)
   	return {
   		"code":0,
   		"msg":"云函数调用成功"
   	}
   };
   ```

4. 删除记录

   ```js
   	const res = await collection.doc('60ee51103b7d3500014124c1').remove()
   ```

5. 数据更新

   ```js
   const res = await collection.doc('60ee52a1827eca0001e56bc4').update({
   		name:"joob"
   	})
   
   const res = await collection.doc('60ee52a1827eca0001e56bc4').set({   // 如果说获取不到内容，从新进行插入记录的操作
   		name:"joob",
     	type:"javascript"
   	})
   ```

   > update与set的区别：
   >
   > 当没有找到指定记录时，使用update无法进行更新操作，set在没有查找到指定记录的时候，可以进行新增内容的操作（不存在进行创建添加操作）

5. 数据查找

   ```js
   // 查询全部
   	const res = await collection.get()
   // 指定条件进行查询-id查询
     const res = await collection.doc('id').get()  // id为需要查询的指定id
   // 指定条件查询-其他条件进行查询
     const res = await collection.where({name:"alan"}).get()
   ```

   

   #### 云存储操作

   1. 使用uni.chooseImage方法进行图片选择获取

      参考地址：https://uniapp.dcloud.io/api/media/image?id=chooseimage

      ```js
      	uni.chooseImage({
      					count: 1,
      					success(res) {
      						console.log(JSON.stringify(res.tempFilePaths))
      					}
      				})
      ```

   2. 使用uniCloud.uploadFile进行文件上传

      参考文档：https://uniapp.dcloud.io/uniCloud/storage?id=clouduploadfile

      ```js
      uni.chooseImage({
      					count: 1,
      					async success(res) {
      						let result = await uniCloud.uploadFile({
      							filePath:res.tempFilePaths[0],
      							cloudPath:'a.jpg',
      							success(res) {
      								console.log(res)
      							},
      							fail(err) {
      								console.log(err)
      							}
      						});
      					}
      				})
      ```

   3. 使用uniCloud.deleteFile进行图片删除

      参考文档：https://uniapp.dcloud.io/uniCloud/storage?id=clouddeletefile

      **阿里云函数删除不能在客户端进行删除操作，下列代码在云函数中进行使用**

      ```js
      let result = await uniCloud.deleteFile({
      	   fileList:['https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ce25980-c28e-4e78-bdef-a96eb40ad98b/06a1cb3a-84b7-47a0-b554-8aff299cb255.jpg'],
      	});
      	console.log(result)
      ```


## 项目启动-结构搭建



### 一、初始化数据库

1. 定义（选择）云服务空间

2. 初始化数据库

   1. 使用db_init.json文件 

      参考文档：https://uniapp.dcloud.io/uniCloud/hellodb?id=db-init

   2. 初始化db_init.json文件使用课程里面提供的文件即可

      source 文件夹 => db._init.json文件

      uniCloud目录找到database目录 添加db_init.json文件

### 二、静态文件配置

#### 1、static文件导入

> ​	导入项目中需要的图片文件
>
> ​	文件在当天课程资料source文件夹下进行查找
>
> ​	source文件目录：
>
> - app_logo =>**应用打包目录**
> - project_img => **工程所需图片文件**		

#### 2、css预编译处理器定义

1. uni.scss文件定义公共变量及混编方法

2. 每个页面下直接进行样式方法及变量使用

   ```scss
   /* 多行注释 */
   @mixin flex($level_style:space-between, $vertical_style:row, $isWrapper:nowrap) {
       display: flex;
       align-items: center;
       justify-content: $level_style;
       flex-wrap: $isWrapper;
       flex-direction: $vertical_style;
   }
   
   // $base-color:#ff6600;
   /* 全局系统样式定义 */
   $base-color:#f25037;
   ```

   

#### 3、page.json文件-tabBar创建

文档参考地址：https://uniapp.dcloud.net.cn/collocation/pages

> 在 `pages` 目录中，创建首页(home)、我的(self)、关注(follow)这 3 个 tabBar 页面。在 HBuilderX 中，可以通过如下的两个步骤，快速新建页面：



1. 在 `pages` 目录上鼠标右键，选择**新建页面**

2. 在弹出的窗口中，填写**页面的名称**、**勾选 scss 模板**之后，点击创建按钮


3. 配置tabBar效果，修改项目根目录中的 `pages.json` 配置文件，新增 `tabBar` 的配置节点如下：

   ```json
   "tabBar": {
       "color": "#666",
       "selectedColor": "#f25037",
       "backgroundColor": "#fff",
       "list": [   // 显示页面信息
         {
           "pagePath": "pages/tabBar/index/index",   // 页面路径
           "iconPath": "static/home.png",   // 默认图片
           "selectedIconPath": "static/home-active.png",  // 选中图片
           "text": "首页"   // 文字描述信息
         },
         {
           "pagePath": "pages/tabBar/follow/follow",
           "iconPath": "static/follow.png",
           "selectedIconPath": "static/follow-active.png",
           "text": "关注"
         },
         {
           "pagePath": "pages/tabBar/self/self",
           "iconPath": "static/my.png",
           "selectedIconPath": "static/my-active.png",
           "text": "我的"
         }
       ]
     }
   ```

4. 删除默认index界面

   1. 在 HBuilderX 中，把 `pages` 目录下的 `index首页文件夹` 删除掉
   2. 同时，把 `page.json` 中记录的 `index 首页` 路径删除掉

5. 修改globalStyle样式

   ```json
    "globalStyle": {
       "navigationBarTextStyle": "white",
       "navigationBarTitleText": "渡一教育",
       "navigationBarBackgroundColor": "#f25037",
       "backgroundColor": "#F8F8F8"
     },
   ```

#### 4、页面定义

> ​	创建tabBar需要的页面文件 
>
> index页面
>
> follow页面
>
> self页面



#### 5、index（首页）界面制作

- 导航栏-navBar组件实现

  > 同名组件名不需要使用import 进行导入

  ```css
  easyCom components/组件名/组件名.vue   // 特点：局部引入
  ```

  **微信及APP进行状态栏高度进行占位处理**

  方法参考地址：https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync

  ```js
   // 获取手机系统信息
      const info = uni.getSystemInfoSync()
      // 设置状态栏高度
      this.statusBarHeight = info.statusBarHeight
  ```

  **胶囊信息获取**

  文档参考地址：https://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect

  **需要进行条件编译实现**

  ```js
  // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
      this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
  ```

  **page.json进行前景色设置**

  ```json
  "navigationBarTextStyle": "white"
  ```

- **tabBar组件实现**

  > 配置tabBar效果，修改项目根目录中的 `pages.json` 配置文件，新增 `tabBar` 的配置节点如下：

```js
 "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "渡一教育",
    "navigationBarBackgroundColor": "#f25037",
    "backgroundColor": "#F8F8F8"
  },
"tabBar": {
    "color": "#666",
    "selectedColor": "#f25037",
    "backgroundColor": "#fff",
    "list": [   // 显示页面信息
      {
        "pagePath": "pages/index/index",   // 页面路径
        "iconPath": "static/home.png",   // 默认图片
        "selectedIconPath": "static/home-active.png",  // 选中图片
        "text": "首页"   // 文字描述信息
      },
      {
        "pagePath": "pages/follow/follow",
        "iconPath": "static/follow.png",
        "selectedIconPath": "static/follow-active.png",
        "text": "关注"
      },
      {
        "pagePath": "pages/self/self",
        "iconPath": "static/my.png",
        "selectedIconPath": "static/my-active.png",
        "text": "我的"
      }
    ]
  }
```

## 发布-wap端发行打包

> 打包参考地址：[https://uniapp.dcloud.io/collocation/manifest?id=h5](https://uniapp.dcloud.io/collocation/manifest?id=h5)


#### unicloud网页托管配置

> 使用unicloud前端网页托管的话需要进行安全域名配置

参考地址：[https://uniapp.dcloud.io/uniCloud/hosting](https://uniapp.dcloud.io/uniCloud/hosting)


## 发布-微信小程序发布

> 打包参考地址：[https://uniapp.dcloud.io/collocation/manifest?id=h5](https://uniapp.dcloud.io/collocation/manifest?id=h5)

1. 打包配置文件

   - 获取小程序ID；

   - 进行安全域名配置

2. 小程序发布

3. 提交预发布版本

4. 提交审核

   参考地址：https://mp.weixin.qq.com/wxamp/wacodepage/getcodepage?token=1374043880&lang=zh_CN


## 发布-app安卓系统应用打包发布

### 一、配置

1. 基础配置

   ![image-20210821192748903](https://tva1.sinaimg.cn/large/008i3skNly1gtomw2nqlvj612a0fqta302.jpg)

2. 图标使用

   > 使用1024*1024图标

3. 其他配置暂时忽略

### 二、证书下载

> 证书下载地址：[https://www.dibaqu.com/utils/android-cert](https://www.dibaqu.com/utils/android-cert)







