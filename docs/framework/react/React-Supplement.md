#  React补充

## 1. Portal

Portals 提供了一个最好的在父组件包含的DOM结构层级外的DOM节点渲染组件的方法。

```js
ReactDOM.createPortal(child,container);
```

第一个参数child是可渲染的react子项，比如元素，字符串或者片段等。第二个参数container是一个DOM元素。

1、用法	

普通的组件，子组件的元素将挂载到父组件的DOM节点中。

```js
render() {
// React 挂载一个div节点，并将子元素渲染在节点中
return (
<div>
{this.props.children}
</div>
);
}

```

有时需要将元素渲染到DOM中的不同位置上去，这是就用到的portal的方法。

```js
render(){
// 此时React不再创建div节点，而是将子元素渲染到Dom节点上。domNode，是一个有效的任意位置的dom节点。
return ReactDOM.createPortal(
this.props.children,
domNode
)
}
```

一个典型的用法就是当父组件的dom元素有 overflow:hidden 或者 z-inde 样式，而你又需要显示的子元素超出 父元素的盒子。举例来说，如对话框，悬浮框，和小提示

2. 在protal中的事件冒泡

虽然通过portal渲染的元素在父组件的盒子之外，但是渲染的dom节点仍在React的元素树上，在那个dom元素上 的点击事件仍然能在dom树中监听到。

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const getDiv = () => {
const div = document.createElement('div');
document.body.appendChild(div);
return div;
};
const withPortal = (WrappedComponent) => {
class AddPortal extends Component {
constructor(props) {
super(props);
this.el = getDiv();
}
componentWillUnmount() {
document.body.removeChild(this.el);
}
render(props) {
return ReactDOM.createPortal(<WrappedComponent {...props} />, this.el);
}
}
return AddPortal;

};
class Modal extends Component {
render() {
return (
<div>
<div>amodal content</div>
<button type="button">Click</button>
</div>
);
}
}
const PortalModal = withPortal(Modal);
class Page extends Component {
constructor(props) {
super(props);
this.state = { clicks: 0 };
this.handleClick = this.handleClick.bind(this);
}
handleClick() {
this.setState(state => ({
clicks: state.clicks + 1
}));
}
render() {
return (
<div onClick={this.handleClick}>
<h3>ppppppppp</h3>
<h3>num: {this.state.clicks}</h3>
<PortalModal />
</div>
);
}
}
export default Page;
```

## 2.懒加载（Lazy 和 Suspense）

1、React.lazy 定义

React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。 

什么意思呢？其实就是懒加载。 

(1) 为什么代码要分割 当你的程序越来越大，代码量越来越多。一个页面上堆积了很多功能，也许有些功能很可能都用不到，但是一样下 载加载到页面上，所以这里面肯定有优化空间。就如图片懒加载的理论

 (2) 实现原理 当 Webpack 解析到该语法时，它会自动地开始进行代码分割(Code Splitting)，分割成一个文件，当使用到这个文 件的时候会这段代码才会被异步加载。

 (3) 解决方案 在 React.lazy 和常用的三方包 react-loadable ，都是使用了这个原理，然后配合webpack进行代码打包拆分达 到异步加载，这样首屏渲染的速度将大大的提高。 由于 React.lazy 不支持服务端渲染，所以这时候 react-loadable 就是不错的选择。

2、如何使用React.lazy



这是最简单的 React.lazy ，但是这样页面会报错。这个报错提示我们，在React使用了 lazy 之后，会存在一个加 载中的空档期，React不知道在这个空档期中该显示什么内容，所以需要我们指定。接下来就要使用到 Suspense 

 (1) Suspense

如果在 App 渲染完成后，包含 OtherComponent 的模块还没有被加载完成，我们可以使用加载指示器为此组件做 优雅降级。这里我们使用 Suspense 组件来解决。 这里将 App 组件改一改



我们指定了空档期使用Loading展示在界面上面，等 OtherComponent 组件异步加载完毕，把 OtherComponent 组 件的内容替换掉Loading上



为了演示我把chrome网络调到 lower-end mobile ，不然看不到loading出现。 可以从上面图片看出，当点击加载的时候,页面的head会插入 `这段代码，发出一个get请求，页面开始显示loading， 去请求 2.chunk.js`文件。 请求结束返回内容就是 OtherComponent 组件的内容,只是文件名称和文件内容经过webpack处理过

> 注意： Suspense 使用的时候， fallback 一定是存在且有内容的， 否则会报错。

```js
import React, { Component,Suspense } from 'react'

// import NowPlaying from './components/NowPlaying'
// import Comingsoon from './components/Comingsoon'
const NowPlaying = React.lazy(()=> import('./components/NowPlaying'))
const Comingsoon = React.lazy(() => import('./components/Comingsoon'))

export default class App extends Component {
  state = {
    type: 1
  }
  render() {
    return (
      <div>
        <button onClick={() => { 
          this.setState({
            type: 1
          })
        }}>正在热映</button>
        <button onClick={() => { 
          this.setState({
            type: 2
          })
        }}>即将上映</button>

        <Suspense fallback={ <div>正在加载...</div>}>
          {
            this.state.type === 1 ?
              <NowPlaying></NowPlaying>
              :
              <Comingsoon></Comingsoon>
          }
        </Suspense>
      </div>
    )
  }
}

```

## 3. forwordRef

引用传递（Ref forwading）是一种通过组件向子组件自动传递 引用ref 的技术。对于应用者的大多数组件来说没什 么作用。但是对于有些重复使用的组件，可能有用。例如某些input组件，需要控制其focus，本来是可以使用ref来 控制，但是因为该input已被包裹在组件中，这时就需要使用Ref forward来透过组件获得该input的引用。可以透传 多层

**未使用forwordRef**

```js
import React, { Component } from 'react'

export default class App extends Component {
  mytext = null
  render() {
    return (
      <div>
        <button onClick={() => { 
          this.mytext.current.focus()
          this.mytext.current.value = ''
        }}>获取焦点</button>

        <Child callback={(el) => { 
          console.log(el);
          this.mytext = el
        }}></Child>
      </div>
    )
  }
}

class Child extends Component{
  mytext = React.createRef()
  componentDidMount () { 
    console.log(this.mytext);
    this.props.callback(this.mytext)
  }
  render() {
    return (
      <div style={{background: 'yellow'}}>
        <input ref={this.mytext} defaultValue='111'></input>
      </div>
    )
  }
}
```

**使用forwardRef**

```js
import React, { Component, forwardRef } from 'react'

export default class App extends Component {

  mytext = React.createRef()
  render() {
    return (
      <div>
        <button onClick={() => { 
          console.log(this.mytext)
        }}>获取焦点</button>

        <Child ref={this.mytext}></Child>
      </div>
    )
  }
}

const Child = forwardRef((props, ref) => { 
  return (
    <div style={{background:'red'}}>
      <input ref={ ref }></input>
    </div>
  )
})
```

## 4. Functional Component缓存

为啥起memo这个名字？

在计算机领域，记忆化是一种主要用来提升计算机程序速度的优化技术方案。它将开销较大的函数调用的返回结果 存储起来，当同样的输入再次发生时，则返回缓存好的数据，以此提升运算效率

作用

组件仅在它的 props 发生改变的时候进行重新渲染。通常来说，在组件树中 React 组件，只要有变化就会走一遍渲 染流程。但是React.memo()，我们可以仅仅让某些组件进行渲染

与PureComponent 区别

**PureComponent 只能用于class 组件，memo 用于functional 组件**

用法

```js
import React, { Component,memo } from 'react'

export default class App extends Component {
  state = {
    name: 'kerwin',
    title: 'aaa'
  }
  render() {
    return (
      <div>
        App
        <button onClick={() => { 
          this.setState({
            name: 'xiaoming'
          })
        }}>click</button>

        <button onClick={() => { 
          this.setState({
            title: 'bbbb'
          })
        }}>click2</button>

        <Child title={ this.state.title }></Child>
      </div>
    )
  }
}

// memo 只会在与自己相关的属性改变的时候才会更新
const Child  = memo(() =>
{ 
  console.log('child');
  return <div>child</div>
}) 
```