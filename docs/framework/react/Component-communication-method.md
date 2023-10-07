---
# 取二三级标题生成目录
outline: [2,3]
---
# 组件通信方式

- 少写有状态的组件，多写无状态组件

## 1.父子组件通信方式	

1）传递数据（父传子）与传递方法（子传父）

- 子传父 

> 子传父传 回调函数
>
> 父传子传 属性

```jsx
import React, { Component } from 'react'
class Navbar extends Component{
  render () {
    return (
      <div style={{background:'red'}}>
        <button onClick={() => { 
          // console.log(this.props.event)
          // 使用this.props 拿到父组件传递过来的属性或函数
          this.props.event()
        }}>click</button>
      </div>
    )
  }
}
class Sidebar extends Component { 
  render () { 
    return (
      <div style={{background:'yellow'}}>
        <ul>
          <li>11111</li>
          <li>11111</li>
          <li>11111</li>
        </ul>
      </div>
    )
  }
}
export default class App extends Component {
  state = {
    isShow: true
  }
  render() {
    return (
      <div>
        // 传递的是一个函数
        <Navbar event={() => {
          // 可以写成箭头函数，也可以是函数名称。event是要传递的属性名，可以是任何名字
          this.setState({
            isShow: !this.state.isShow
          })
        }}></Navbar>
        {
          this.state.isShow && <Sidebar></Sidebar>
        }
      </div>
    )
  }
}
```

2）ref标记（父组件拿到子组件的引用，从而调用子组件的方法）

​		在父组件中清除子组件的input输入框的值。**this.refs.form.reset()**

​		也可以用 ```username = React.createRef() ``` ```this.username.current```

```jsx
import React, { Component } from 'react'
class Field extends Component {
  state = { value: ''}
  clear () { 
    this.setState({
      value:''
    })
  }
  set (value) { 
    this.setState({
      value:value
    })
  }
  render() {
    return (
      <div>
        <label>{ this.props.label }</label>
        <input type={this.props.type} onChange={(evt) => {
          this.setState({
            value: evt.target.value
          })
        }} value={  this.state.value }></input>
      </div>
    )
  }
}

export default class App extends Component {
  username = React.createRef()
  password = React.createRef()
  render() {
    return (
      <div>
        <Field label="账号" type="text" ref={ this.username }></Field>
        <Field label="密码" type="password" ref={this.password}></Field>
        <button onClick={() => {
          console.log(this.username.current.state.value,this.password.current.state.value);
        }}>登录</button>
        <button onClick={() => {
          this.username.current.clear()
          this.password.current.clear()
        }}>清空</button>
      </div>
    )
  }
}
```

## 2.非父子组件通信方式

## 状态提升（中间人模式）

react中的状态提升概括来说，就是将多个组件需要共享的状态提升到它们最近的父组件上，在父组件上改变这个状态然后通过props分发给子组件

```jsx
import React, { Component } from 'react'
import axios from 'axios'
import './css/communincation.css'
export default class App extends Component {
  constructor() { 
    super()
    this.state = {filmList:[],info:''}
    axios.get('/film.json').then(({data}) => { 
      this.setState({
        filmList: data.data.films,
      })
    })
  }
  render() {
    return (
      <div className='app'>
        <div>
          {
            this.state.filmList.map(item => {
              return <Film key={item.filmId} {...item} event={(value) => {
                this.setState({
                  info:value
                })
              }}></Film>
            })
          }
        </div>
        <FilmDateil detail={ this.state.info }></FilmDateil>
      </div>
    )
  }
}
class Film extends Component { 
  render () {
    const { name,poster,synopsis } = this.props
    return (
      <div className='film' onClick={() => {
        this.props.event(synopsis)
      }}>
        <img src={poster} alt={ name }></img>
        <h2>{ name }</h2>
      </div>
    )
  }
}
class FilmDateil extends Component { 
  render () {
    return (
      <div className='filmDetail'>
        { this.props.detail }
      </div>
    )
  }
}

```

## 发布订阅模式实现

```jsx
import React, { Component } from 'react'
import axios from 'axios'
import './css/communincation.css'

const bus = {
  list: [],
  //订阅
  subscribe (callback) { 
    this.list.push(callback)
  },
  // 发布
  publish (value) { 
    this.list.forEach(callback => {
      callback && callback(value)
    })
  }
}
export default class App extends Component {
  constructor() { 
    super()
    this.state = {filmList: []}
    axios.get('/film.json').then(({data}) => { 
      this.setState({
        filmList: data.data.films,
      })
    })
  }
  render() {
    return (
      <div className='app'>
        <div>
          {
            this.state.filmList.map(item => {
              return <Film key={item.filmId} {...item}></Film>
            })
          }
        </div>
        <FilmDateil></FilmDateil>
      </div>
    )
  }
}
class Film extends Component { 
  render () {
    const { name,poster,synopsis } = this.props
    return (
      <div className='film' onClick={() => {
        bus.publish(synopsis)
      }}>
        <img src={poster} alt={ name }></img>
        <h2>{ name }</h2>
      </div>
    )
  }
}
class FilmDateil extends Component { 
  constructor() {
    super()
    this.state = { info: ''}
    bus.subscribe((value) => {
      this.setState({
        info:value
      })
    })
  }
  render () {
    return (
      <div className='filmDetail'>
        { this.state.info }
      </div>
    )
  }
}
```

## context状态树传参

```jsx
import React, { Component } from 'react'
import axios from 'axios'
import './css/communincation.css'
// 创建全局的 context()
const GlobalContext = React.createContext()

export default class App extends Component {
  constructor() { 
    super()
    this.state = {
      filmList: [],
      info:'1111'
    }
    axios.get('/film.json').then(({data}) => { 
      console.log(data.data);
      this.setState({
        filmList: data.data.films,
      })
    })
  }
  render() {
    return (
       // 最外 层的 APP 组件用 Provider
      <GlobalContext.Provider value={{
        info: this.state.info,
        changeInfo: (value) => { 
          this.setState({
            info:value
          })
        }
      }}>
        <div className='app'>
          <div>
            {
              this.state.filmList.map(item => {
                return <Film key={item.filmId} {...item}></Film>
              })
            }
          </div>
          <FilmDateil></FilmDateil>
        </div>
      </GlobalContext.Provider>
    )
  }
}
class Film extends Component { 
  render () {
    const { name,poster,synopsis } = this.props
    return (
        // 所有后面要用的组件 都用  Consumer
      <GlobalContext.Consumer>
        {
          (value) => { 
            return <div className='film' onClick={() => {
              value.changeInfo(synopsis)
            }}>
              <img src={poster} alt={ name }></img>
              <h2>{ name }</h2>
            </div>
          }
        }
      </GlobalContext.Consumer>
    )
  }
}
class FilmDateil extends Component { 
  constructor() {
    super()
    this.state = {
      info: ''
    }
  }
  render () {
    return (
        // 所有后面要用的组件 都用  Consumer
      <GlobalContext.Consumer>
        {
          (value) => { 
            return <div className='filmDetail'>
                { value.info }
            </div>
          }
        }
      </GlobalContext.Consumer>
    )
  }
}
```

## 插槽

- 为了复用
- 一定程度减少父子通信

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <Child>
          {/* <div>11111</div> */}

          <div>1111</div>
          <div>2222</div>
          <div>3333</div>
        </Child>
      </div>
    )
  }
}
class Child extends Component {
  render() {
    return (
      <div>
        children
        {/* react 插槽 */}
        {/* {this.props.children} */}
        {/* react 这样可以让元素对号入座  类似vue 的具名插槽 */}
        {this.props.children[0]}
        {this.props.children[1]}
        {this.props.children[2]}
      </div>
    )
  }
}
```