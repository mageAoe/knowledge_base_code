# JSX语法与组件

## 1、JSX语法

JSX 将 HTML 语法直接加入到 JavaScript 代码中，再通过翻译器转换到纯 JavaScript 后由浏览器执行。 在实际开发中，JSX 在产品打包阶段都已经编译成纯 JavaScript，不会带来任何副作用，反而会让代码 更加直观并易于维护。 编译过程由Babel 的 JSX 编译器实现。

原理是什么呢？ 要明白JSX的原理，需要先明白如何用 JavaScript 对象来表现一个 DOM 元素的结构? 看下面的DOM结构

```jsx
<div class='app' id='appRoot'>
    <h1 class='title'>欢迎进入React的世界</h1>
    <p>React.js 是一个帮助你构建页面 UI 的库</p>
</div>
```

上面这个 HTML 所有的信息我们都可以用 JavaScript 对象来表示：

```jsx
{
	tag: 'div',
	attrs: { className: 'app', id: 'appRoot'},
	children: [
		{
			tag: 'h1',
			attrs: { className: 'title' },
			children: ['欢迎进入React的世界']
		},
		{
		tag: 'p',
		attrs: null,
		children: ['React.js 是一个构建页面 UI 的库']
		}
	]
}
```

但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 HTML 的方式写起来就方便很多了。 

于是 React.js 就把 JavaScript 的语法扩展了一下，让 JavaScript 语言能够支持这种直接在 JavaScript 代 码里面编写类似 HTML 标签结构的语法，这样写起来就方便很多了。编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。 

下面代码:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
    render () {
        return (
            <div className='app' id='appRoot'>
                <h1 className='title'>欢迎进入React的世界</h1>
                <p>
                    React.js 是一个构建页面 UI 的库
                </p>
            </div>
        )
    }
}
ReactDOM.render(
<App />,
document.getElementById('root')
)
```

编译之后将得到这样的代码:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
render () {
    return (
            React.createElement("div",{className: 'app',id: 'appRoot'})
            React.createElement("h1",{ className: 'title' },"欢迎进入React的世界"),
            React.createElement("p",null,"React.js 是一个构建页面 UI 的库")
		)
	}
}

ReactDOM.render(
    React.createElement(App),
document.getElementById('root')
)
```

所谓的 JSX 其实就是 JavaScript 对象，所以使用 React 和 JSX 的时候一定要经过编译的过程:

> JSX —使用react构造组件，bable进行编译—> JavaScript对象 — ReactDOM.render() —>DOM 元素 —>插入页面

## 2、Class 组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
render () {
		return (<h1>欢迎进入React的世界</h1>)
	 }
}

ReactDOM.render(
<App />,
document.getElementById('root')
)

```

- es6 class 组件其实就是一个构造器,每次使用组件都相当于在实例化组件，像这样：

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
render () {
	return (<h1>欢迎进入{this.props.name}的世界</h1>)
	}
}

const app = new App({
name: 'react'
}).render()

ReactDOM.render(
app,
document.getElementById('root')
```

## 3、 函数式组件

```jsx
function App(){
    return (
        <div>hello function component
            <div>111</div>
            <div>222</div>
        </div>
    )
}

export default App

import App from './01-base/02-函数式组件'
ReactDOM.render(<App></App>, document.getElementById('root'))
```



## 组件嵌套

```jsx
import { Component } from "react";

class Child extends Component { 
  render () { 
    return <div>Child</div>
  }
}

class Navbar extends Component { 
  render () { 
    return <div>
      navbar
      <Child></Child>
    </div>
  }
}

function Swiper() {
  return <div>swiper</div>
}

const Tabber = () => <div>tabber</div>


class App extends Component {
  render () { 
    return (
      <div>
        <Navbar></Navbar>
        <Swiper></Swiper>
        <Tabber></Tabber>
      </div>
    )
  }
}

export default App
```

## 4、组件的样式

- 行内样式

想给虚拟dom添加行内样式，需要使用表达式传入样式对象的方式来实现

```jsx
// 注意这里的两个括号，第一个表示我们在要JSX里插入JS了，第二个是对象的括号
<p style={{color:'red', fontSize:'14px'}}>Hello world</p>
```

- 使用 class

**React推荐我们使用行内样式，因为React觉得每一个组件都是一个独立的整体**

其实我们大多数情况下还是大量的在为元素添加类名，但是需要注意的是， class 需要写成 className （因为毕竟是在写类js代码，会收到js规则的现在，而 class 是关键字）

```jsx
<p className="hello">Hello world</p>
```

> 注意： 
>
> class ==> className , for ==> htmlFor(label)

## 5、事件处理

### 5、1绑定事件

采用on+事件名的方式来绑定一个事件，注意，这里和原生的事件是有区别的，原生的事件全是小写 onclick , React里的事件是驼峰 onClick ，React的事件并不是原生事件，而是合成事件。

### 5、2 事件handler的写法

- 直接在render里写行内的箭头函数(不推荐) 
- 在组件内使用箭头函数定义一个方法(推荐) 
- 直接在组件内定义一个非箭头函数的方法，然后在render里直接使用 onClick= {this.handleClick.bind(this)} (不推荐) 
- 直接在组件内定义一个非箭头函数的方法，然后在constructor里bind(this)(推荐)

```jsx
import React, { Component } from 'react'
export default class APP extends Component {
  a = 10
    
  render() {
    return (
      <div>
          <input></input>
           // 逻辑过多，不推荐
          <button onClick={()=>{console.log(111, this.a)}}>add</button>
           // 需要bind 来改变，不推荐
          <button onClick={this.handleClick2.bind(this)}>add2</button>
           // 推荐
          <button onClick={this.handleClick3}>add3</button>
           // 比较推荐 - 传参
          <button onClick={ ()=>this.handleClick4()}>add4</button>
      </div>
    )
  }
  handleClick2(){
      // handleClick2 访问不到this
      // 必须使用bind ， call、apply 会立即执行一次函数
    console.log('clik2', this.a);
  }

  // 箭头函数可以拿到this，保存外部作用域
  handleClick3 = ()=>{
    console.log('clik3', this.a);
  }

  // 箭头函数可以拿到this，保存外部作用域
  handleClick4 = ()=>{
    console.log('clik4', this.a);
  }
}
```

### 5、3Event 对象

> react 并不会真正的绑定事件到每一个具体的元素上，而是采用事件代理的模式

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  render () {
    return (
      <div>
        <button onClick={this.handleClick2}>按钮2</button>
        <button onClick={this.handleClick3}>按钮3</button>
      </div>
    )
  }

  // 这里可以拿到事件对象
  handleClick2 (event) { 
    console.log(event);
  }

  // 这里可以拿到事件对象
  handleClick3 =  (event)=>{ 
    console.log(event);
  }
}
```

### 事件绑定-2

**react 并不会真正的绑定事件到每一个具体的元素上，而是采用事件代理的模式**

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  render () {
    return (
      <div>
        <button onClick={this.handleClick2}>按钮2</button>
        <button onClick={this.handleClick3}>按钮3</button>
      </div>
    )
  }

  // 这里可以拿到事件对象
  handleClick2 (event) { 
    console.log(event);
  }

  // 这里可以拿到事件对象
  handleClick3 =  (event)=>{ 
    console.log(event);
  }
}
```

## ref 的应用

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  myRef = React.createRef()
  render () {
    return (
      <div>
        <input ref="txtname"></input>
        <button onClick={() => { 
          console.log(11,this.refs.txtname.value);
        }}>按钮2</button>

        <input ref={this.myRef}></input>
        <button onClick={
          this.handlerClick
        }>
        按钮2
        </button>
      </div>
    )
  }
  handlerClick = () => { 
    console.log('click2', this.myRef.current.value);  // this.myRef.current就是原生dom
  }
}
```