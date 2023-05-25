
## v-if和v-show的区别？
都可以控制元素的显示与隐藏  
1. v-show时控制元素的display值来让元素显示与隐藏；v-if显示隐藏时把DOM元素整个添加和删除
2. v-if有一个局部编译、卸载的过程，切换这个过程中会适当的销毁和重建内部的事件监听和子组件；v-show只是简单的css切换
3. v-if才是真正的条件渲染；v-show从false到true的时候不会触发组件的生命周期，v-if会触发生命周期
4. v-if的切换效率比较低  v-show的切换效率比较高

## 如何理解MVVM的？
是 model-view-viewModel的缩写。前端开发的架构模式
M： 模型，对象的就是data数据
v： 视图，用户界面，DOM
VM: 视图模型；VUE的实例对象，链接view和Model的桥梁
核心是提供view和viewModel的双向数据绑定，当数据改变的时候，viewModel能监听到数据的变化，自动更新视图，当用户操作视图的时候，viewModel也可以监听到视图的变化，然后通过数据进行改变，这就实现了双向数据绑定；ViewModel通过双向绑定吧View和Model连接起来，他们之间的同步是自动的，不需要人为干涉，所以我们自己需要关注业务逻辑即可，不需要操作DOM，同时也不需要关注数据的状态问题，因为他是由MVVM管理的

## v-for中的key值得作用是什么
key 属性是DOM元素的唯一标识
作用： 
  1. 提高虚拟DOM的更新
  2. 若不设置key，可能会触发一些bug
  3. 为了触发过度效果

## 说一下你对vue生命周期的理解

组件从创建到销毁的过程就是它的生命周期

创建: 
    beforeCreate
        在这个阶段属性和方法都不能使用
    created
         这里是实例创建完成之后，在这里完成了数据检测，可以使用数据，修改数据，不会触发updated，也不会更新视图 
挂载
    beforeMount
          完成了模板的编译，虚拟DOM也完成创建，即将渲染
    Mounted
          把编译好的模板挂载到页面，这里可以发送异步请求也可以访问DOM节点
更新
    beforeUpdate
          组件数据更新之前使用，数据是新的，页面上的数据是旧的，组件即将更新，准备渲染，可以改数据
    updated
          render重新做了渲染，这时数据和页面都是新的，避免在此更新数据
销毁
    beforeDestroy
          实例销毁前，在这里实例还可以用，可以清除定时器等等
    destroyed
          组件已被销毁了，全部都销毁
使用了keep-alive时多出两个周期
    activited
          组件激活时
    deactivited
          组件被销毁时


## 在created和mounted去请求数据，有什么区别

created：在渲染前调用，通常先初始化属性，然后做渲染

mounted：在模板渲染完成后，一般都是初始化页面后，在对元素节点进行操作
        在这里请求数据可能会出现闪屏的问题

一般用created比较多
请求的数据对DOM有影响，那么就使用created
如果请求的数据对DOM无关，可以放在mounted

## vue中的修饰符有哪些？

1. 事件修饰符
    .stop       : 阻止冒泡
    .prevent    ： 阻止默认行为
    .capture    ：内部元素触发的事件现在次处理
    .self       ： 只有在event.target是当前元素时触发
    .once       ：事件只触发一次
    .passive    ：立即触发默认行为
    .native     ： 把当前元素作为原生标签看待
2. 按键修饰符
    .keyup      : 键盘抬起
    .keydown    ：键盘按下
3. 系统修饰符
    .ctrl
    .alt
    .meta
4. 鼠标修饰符
    .left        : 鼠标左键
    .right        ：鼠标右键
    .middle      ： 鼠标中键
5. 表单修饰符
    .lazy        ： 等输入完之后再显示
    .trim        ： 删除内容前后的空格
    .number      ： 输入是数字或转为数字

## elementUi是怎么做表单验证的？

1. 在表单中加rules属性，然后再data里写校验规则
2. 内部添加规则
3. 自定义函数校验

## vue如何进行组件通信

1. 父传子
    props： 父组件使用自定义属性，子组件使用props接收
    $ref
2. 子传父
    $emit : 绑定自定义事件 
3. 兄弟
    事件总线
    层级较低，可以考虑中间人
4. vuex
## keep-alive是什么？怎么使用

Vue的一个内置组件，包裹组件的时候，会缓存不活跃的组件实例，并不是销毁他们
作用： 把组件切换的状态保存在内存里，防止重复渲染DOM节点，减少加载时间和性能消耗，提高用户

## vue路由怎么传参的

params传参
    this.$router.push({name:'index',params:{id: 123}})
路由属性传参
     this.$router.push({name: 'index/${item.id}'})
query传参(可以解决页面刷新参数丢失的问题)
     this.$router.push({name:'index',query:{id: 123}})

## history模式和hash模式的区别

1. hash的路由地址上有#号，history模式没有
2. 在做回车刷新的时候，hash模式会加载对应页面；history会报错404
3. hash模式支持低版本浏览器，history不支持，因为是H5新增的API
4. hash不会重新加载页面，单页面应用必备
5. history有历史记录，H5新增了pushState和replaceState去修改历史记录
6. history需要后台配置

## 路由拦截是怎么实现的

路由拦截
需要在路由配置中添加一个字段，它是用于判断路由是否需要拦截

再使用路由守卫

## 说一下vue的动态路由

要在路由配置里设置meta属性，扩展权限相关的字段，在路由导航守卫里通过判断这个权限标识，实现路由的动态增加和跳转

根据用户登录的账号，返回用户角色
前端再根据角色，跟路由表的meta.role进行匹配
把匹配搭配的路由形成可访问的路由

## 如何解决刷新后二次加载路由
```js
1. window.location.reload()
2. matcher
    const router = createRouter()
    export function = resetRouter(){
      const newRouter =  createRouter()
       router.matcher =   newRouter.matcher
}
```

## vuex 刷新数据会丢失吗？怎么解决

 vuex肯定会重新获取数据，页面也会丢失数据
1. 把数据直接保存在浏览器缓存里（cookie localStorage  sessionStorage）
2. 页面刷新的时候，再次请求数据，达到可以动态更新的方法

## computed和watch的区别

1. computed是计算属性
2. watch是监听，监听的是data中数据的变化
3. computed是支持缓存的，依赖的属性值发生变化，计算属性才会重新计算，否则用缓存；watch不支持缓存
4. computed不支持异步，watch是可以异步操作
5. computed是第一次加载就监听，watch是不监听
6. computed函数中必须return，watch不用

## vue的双向数据绑定原理是什么

通过数据劫持和发布订阅者模式来实现，同时利用Object.defineProperty()劫持各个属性的setter和getter，在数据发生改变的时候发布消息给订阅者，触发对应的监听回调渲染视图，也就是说数据和视图是同步的，数据发生改变，视图跟着发生改变，视图改变，数据也会发生改变

1. 需要observer的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter
2. compile模板解析指令，把模板中的变量替换成数据，然后初始化渲染视图，同时把每个指令对应的节点绑定上更新函数，添加订阅者，如果数据变化，收到通知，更新视图
3. watcher 订阅者是Observer和compile之间的通信桥梁，作用：
      1. 在自身实例化的时候往订阅器内添加自己
      2. 自身要有一个update()方法
      3. 等待属性变动时，调用自身update方法，触发compile这种的回调
4. MVVM作为数据绑定的入口，整合了observer、compile和watcher三者，通过observer来监听自己的数据变化，通过compile解析模板指令，最后利用watcher把observer和compile联系起来，最终达到数据更新视图更新，视图更新数据更新的效果

## 了解diff算法和虚拟DOM吗

虚拟DOM： 描述元素和元素之间的关系，创建一个JS对象
如果组件内有响应的数据，数据发生改变的时候，render函数会生成一个新的虚拟DOM，这个新的虚拟DOM会和旧的虚拟DOM进行对比，找到需要修改的虚拟DOM内容，然后去对应的真实DOM中修改

diff算法就是虚拟DOM的比对时用的，返回一个patch对象，这个对象的作用就是存储两个节点不同的地方，最后用patch里记录的信息进行更新真实DOM
步骤：
      1. JS对象表示真实的DOM结构，要生成一个虚拟DOM，再用虚拟DOM构建一个真实DOM树，渲染到页面
      2. 状态改变生成新的虚拟DOM，跟旧的虚拟DOM进行比对，这个比对的过程就是DIFF算法，利用patch记录差异
      3. 把记录的差异用在第一个虚拟DOM生成的真实DOM上，视图就更新了

## vue 和jquery区别是什么

1. 原理不同
      vue就是数据绑定，jq是先获取dom再处理
2. 着重点不同
      vue是数据驱动，jq是着重与页面
3. 操作不同
      
## vuex的响应式处理

vuex是vue的状态管理工具
Vue.use（vuex），调用install方法，通过applyMixin（vue）在任意组件内执行this.$store就可以访问到store对象

## 如何封装一个组件
1. 使用Vue.extend() 创建一个组件
2. 使用Vue.components()方法注册组件
3. 如果子组件需要数据，可以在props中接收定义
4. 子组件修改好数据，要把数据传递给父组件，可以用emit()方法


## vue中如何做强制刷新？

1. localtion.reload()
2. this.$router.go(0)
3. provide和inject

## vue3和vue2有哪些区别？

1. 双向数据绑定的原理不同，v2是Object.property，v3是proxy
2. 是否支持多个根节点
3. API不同，v2是配置式，v3是组合式
4. 定义数据变量方法不同
5. 生命周期不同
6. 传值不同
7. 指令和插槽不同
8. main.js不同

## vue的性能优化怎么做

1. 编码优化
      不要把所有数据都放在data中
       v-for时给每个元素绑定事件用事件代理
       keep-alive缓存组件
       尽可能拆分组件，提高复用性、维护性
        key值要保证唯一
        合理使用路由懒加载，异步组件
        数据持久化存储的使用尽量用防抖、节流优化
2. 加载优化
        按需加载
        内容懒加载
        图片懒加载
3. 用户体验
        骨架屏
4. SEO优化
        预渲染
        服务端渲染SSR
5. 打包优化
        CDN形式加载第三方模块
        多线程打包
        抽离公共文件
6. 缓存和压缩
        客户端缓存、服务端缓存
        服务端GZIP压缩

## 首屏优化该如何去做

1. 使用路由懒加载
2. 非首屏组件使用异步组件
3. 首屏不重要的组件延迟加载
4. 静态资源放在CDN上
5. 减少首屏上JS\CSS等资源文件的大小
6. 使用服务端渲染
7. 减少DOM的数量和层级
8. 使用精灵图请求
9. 做一些loading
10. 开启GZIP压缩
11. 图片懒加载


## vue3的性能为什么比vue2好

1. diff算法的优化
2. 静态提升
3. 事件侦听缓存

## vue3为什么使用proxy？

1. proxy可以代理整个对象，defineproperty只代理对象上的某个属性
2. proxy对代理对象的监听更加丰富
3. proxy代理对象会生成新的对象，不会修改被代理对象本身
4. proxy不兼容IE

## SEO 如何优化

1. SSR服务端渲染
2. 预渲染 prerender-spa-plugin

## Echarts有用过吗？常用的组件有哪些

title 标题组件 show  text link
toolbox 工具栏组件  导出图片 数据视图  切换 缩放 show orient feature
tooltip 提示组件 
markPoint 标注点
markLine 图标的标线

## uniapp 有没有做过分包
分包作用： 优化小程序的下载和启动速度
![](https://img2023.cnblogs.com/blog/2450634/202303/2450634-20230301163828766-35455622.png)

小程序启动默认下载主包并启动页面，当用户进入分包时，才会下载对应的分包，下载完进行展示

## webpack打包和不打包的区别

1. 运行效率 
2. 对技术的支持不够

## webpack 是怎么打包的，babel是做什么的

wbepack会把js css image看做一个模块，用import、require引入
找到入口文件，通过入口文件找到关联的依赖文件，把他们打包到一起
把bundle文件，拆分成多个小的文件，异步按需加载所需要的文件
如果一个被多个文件引用，打包时只会生成一个文件
如果引用的文件没有调用，不会打包，如果引入的变量和方法没有调用也不会打包
对于多个入口文件，加入引入了相同的代码，可以用插件把他抽离到公共文件中

babel： 用于给语法降级的

## git如何合并、拉取代码

拉取代码： git pull
查看状态： git sattus
合并： git merge

## git 如何解决冲突问题

1. 两个分支中修改了同一个文件
2. 两个分支中修改了同一个文件的名字

      