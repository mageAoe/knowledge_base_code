# 组件的数据挂载方式

## 1、状态

```jsx
export default class App extends Component {
  state = { // 这个是固定的，响应式，类似于vue的data
     like: '收藏',
     show: true
   }
   // 也可以写成下面那样 constructor
  constructor() {
    super()
    this.state = { // 这个是固定的，响应式，类似于vue的data
      like: '收藏',
      show: true
    }
  }
  render() {
    return (
      <div>
        <h1>react开发</h1>
        <button onClick={() => { 
          // 必须要使用setState
          this.setState({
            // like:'取消收藏'
            show: !this.state.show
          })
        }}>
          { this.state.show?'收藏':'取消收藏' }
        </button>
      </div>
    )
  }
}
```

## setState 异步更新

> setState 的更新是异步的，所以在setState 更新完后面打印数据，打印的还是之前未改变的数据

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 1
  }

  render() {
    return (
      <div>
        { this.state.count }
        <button onClick={this.handleClcik}>add</button>
        <button onClick={ this.handleClcik2 }>add2</button>
      </div>
    )
  }

  handleClcik = () => { 
    this.setState({
      count: this.state.count+1
    })

    console.log(this.state.count); // 1

    this.setState({
      count: this.state.count+1
    })

    console.log(this.state.count); // 1
  }

  handleClcik2 = () => { 
    // setTimeout 是正常的 （处在异步的逻辑中）
    setTimeout(() => {
      this.setState({
        count: this.state.count+1
      })
  
      console.log(this.state.count); // 3
  
      this.setState({
        count: this.state.count+1
      })
  
      console.log(this.state.count); // 4
    }, 0);
  }
}


```



### 结论

- setState 处在同步的逻辑中 ，异步更新状态 ， 异步更新真实dom
- setState 处在异步的逻辑中， 同步更新状态， 同步更新真实dom

> setState 接受第二个参数， 第二个参数是回调函数，状态和dom更新完后就会被触发

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 1
  }

  render() {
    return (
      <div>
        { this.state.count }
        <button onClick={this.handleClcik}>add</button>
        <button onClick={ this.handleClcik2 }>add2</button>
      </div>
    )
  }

  handleClcik = () => { 
    // this.setState 会合并处理，所以都是一样的值
    this.setState({
      count: this.state.count+1
    }, () => { 
      console.log(this.state.count); // 2
    })

    this.setState({
      count: this.state.count+1
    }, () => { 
      console.log(this.state.count); // 2
    })

  }

  handleClcik2 = () => { 
    setTimeout(() => {
      this.setState({
        count: this.state.count+1
      })
  
      console.log(this.state.count); // 3
  
      this.setState({
        count: this.state.count+1
      })
  
      console.log(this.state.count); // 4
    }, 0);
  }
}


```





## 2 、属性（props）

props 正常是外部传入的，组件内部也可以通过一些方式来初始化的设，属性不能被组件自己更改，但是你可以通过父组件主动重新渲染的方式来传入新的props

（1）在组件上通过key=value 写属性，通过this.props获取属性，这样组件的可复用性提高了

(2) 注意在传参数时候，如果写成isShow="true" 那么这是一个字符串 如果写成isShow={true} 这个 是布尔值

（3）   {...对象} 展开赋值

```jsx
// leftShow不加括号就是字符串
<Navbar title="首页" leftShow={false}>
<Navbar title="购物车" leftShow={true}>
// 父组件
import React, { Component } from 'react'
export default class Navbar extends Component {
  render () {
    console.log(this.props);
    return (
      <div>index</div>
    )
  }
}

```

（4） 默认属性值

```jsx
*.defaultProps = {
}
static defaultProps = {
	myname:"默认的myname",
	myshow:true
}
```

### **属性验证**

```jsx
// 组件 Navbar
import hahapropsType from 'prop-types'
export default class Navbar extends Component {
   // 对props 属性进行验证，也可以写成下面的形式(方法二)
   static propsType = {
      title: hahapropsType.string,
      leftShow: hahapropsType.bool
   }
   // 设置props 属性默认值(方法二)
   static defaultProps = {
      leftShow: true
   }
  render () {
    const { title,leftShow } = this.props
    return (
      <div>
        {
          leftShow && <button>返回</button>
        }
        navbar-{title}
        <button>{ title }</button>
      </div>
    )
  }
}
// 对props 属性进行验证(方法一)
Navbar.prototypes = {
  title: hahapropsType.string,
  leftShow: hahapropsType.bool
}

// 设置props 属性默认值(方法一)
Navbar.defaultProps = {
  leftShow: true
}
```

### **如果有一个对象跟要传递的属性一样，可以写成下面的形式**

```jsx
import React, { Component } from 'react'
import Navbar from './Navbar'

export default class App extends Component {
  render() {
      const obj = {
          title:'测试',
          leftShow:false
      }
    return (
      <div>
        <div>
          <h2>购物车</h2>
          <Navbar title="购物车" leftShow={ true }></Navbar>
        </div>
            <Navbar {...obj}></Navbar>
      </div>
    )
  }
}
```

### 函数式组件的 prps 接收

```jsx
import React from 'react'
export default function Sidebar(props) {
  console.log(props);
  const { color } = props
  return (
    <div style={{background:color,width:'200px'}}>
      <ul>
        <li>1111</li>
        <li>1111</li>
      </ul>
    </div>
  )
}
Sidebar.propTypes = {} //  属性验证
Sidebar.defaultProps = {} // 属性默认值
```

## 3、属性 vs 状态

​	相似点：都是纯js对象，都会触发render更新，都具有确定性（状态/属性相同，结果相同）

不同点： 

1. 属性能从父组件获取，状态不能
2. 属性可以由父组件修改，状态不能 
3. 属性能在内部设置默认值，状态也可以，设置方式不一样 
4. 属性不在组件内部修改，状态要在组件内部修改
5. 属性能设置子组件初始值，状态不可以 
6. 属性可以修改子组件的值，状态不可以



state 的主要作用是用于组件保存、控制、修改自己的可变状态。 state 在组件内部初始化，可以被 组件自身修改，而外部不能访问也不能修改。你可以认为 state 是一个局部的、只能被组件自身控制 的数据源。 state 中状态可以通过 this.setState 方法进行更新， setState 会导致组件的重新渲 染。

props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参 数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props ，否则组件的 props 永远保持 不变

没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件 （stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有 状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性