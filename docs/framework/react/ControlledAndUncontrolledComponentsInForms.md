# 表单中的受控组件与非受控组件

## 1.非受控组件

**默认值**

在react渲染生命周期时，表单元素上的value将会覆盖DOM节点中的值，在非受控组件中，你经常希望react能赋予组件一个初始值，但是不去控制后续的更新。在这种情况下，你可以指定一个defaultValue属性，而不是value

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  myText = React.createRef()
  render () {
    return (
      <div>
        <h1>登录</h1>
        <input ref={ this.myText } defaultValue='val'></input>
        <button onClick={() => { 
          console.log(this.myText.current.value)
        }}>登录</button>
        <button onClick={() => {
          this.myText.current.value = ''
        }}>重置</button>
      </div>
    )
  }
}
```

```同样<input type="checkbox">和<input type="radio">,<select> <textarea> 都支持defaultValue```

## 2、受控组件

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    username: 'val'
  }
  render () {
    return (
      <div>
        <h1>登录</h1>
        <input value={this.state.username} onChange={(evt) => { 
          this.setState({
            username: evt.target.value
          })
        }}></input>
        <button onClick={() => { 
          console.log(this.state.username)
        }}>登录</button>
        <button onClick={() => {
          this.setState({
            username: ''
          })
        }}>重置</button>
      </div>
    )
  }
}
```

受控组件的优势是，当调用setSate函数时，会重新调用render函数渲染，这样当有一个子组件时，当input值发生改变时可以通知自己的子组件

- input 在原生与react中的区别：

input 在react中区别于受控与非受控，react中input的onChange与onInput事件等同，react中的非受控默认值是设置defaultValue，而原生的input则直接设置vlaue

- 受控组件的应用

```jsx
import React, { Component } from 'react'
import axios from 'axios'


export default class cinema extends Component {
  constructor() { 
    super()
    this.state = {
      cinemaList: [],
      value: ''
      // BFcinemaList:[]
    }
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=1719167',
      method: "get",
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1654354904879699496534017"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(({ data }) => { 
      console.log(data.data.cinemas);
      this.setState({
        cinemaList: data.data.cinemas,
        // BFcinemaList: data.data.cinemas // 受控组件的应用，不用在多浪费内存存储一个列表的值
      })
    })
  }
  render() {
    return (
      <div className='cinema'>
        <input value={this.state.value} onChange={(e) => { 
          this.setState({
            value: e.target.value
          })
        }}></input>
        {
          // 使用函数的返回值作为列表的渲染，类似与vue的computed
          this.getCinemaList().map((m) => 
          <dl key={m.cinemaId}>
            <dt>{ m.name }</dt>
            <dd>{ m.address }</dd>
          </dl>
          )
        }
      </div>
    )
  }
  getCinemaList = () => {
    return this.state.cinemaList.filter((f) => {
      return f.name.toUpperCase().includes(this.state.value.toUpperCase()) || f.address.toUpperCase().includes(this.state.value.toUpperCase())
    })
  }
}

```