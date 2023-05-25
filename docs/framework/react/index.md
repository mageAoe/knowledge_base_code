**VS CODE 快速生成 函数式组件：RFC  || 类组件： RCC**

## create-react-app

全局安装create-react-app

```shell
npm install -g create-react-app
```

如果不想全局安装，可以直接使用npx

```shell
npx create-react-app your-app
```

创建一个项目

```shell
create-react-app your-app 注意命名方式
```

这需要等待一段时间，这个过程实际上会安装三个东西

- react ：react顶级库
- react-dom ： 因为react有很多的运行环境，比如app端的react-native，我们要在web上运行就使用react-dom
- react-script ：包含运行和打包react应用程序的所有脚本及配置

> 全局安装 npm install -g nrm 管理镜像源
>
> nrm ls
>
> nrm use  镜像名



```js
// 从react 的包当中引入了react。只要你写react.JS组件就必须引入react，因为react里有一种语法叫JSX，要写JSX，就必须引入react
// reactDom 可以帮助我们把react 组件渲染到页面上去，没有其他的作用了。它是react-dom 中引入的，而不是react

// react-dom里有一个render方法，功能就是把组件渲染并构造DOM树，然后插入到页面上某个特定的元素上
reactDom.render()
```