# setState

1. setSate处在同步的逻辑中， 异步更新状态，更新真实dom

2. setSate 处在异步的逻辑中，同步更新状态，同步更新真实dom

3. setSate 接受第二个参数，第二个参数是回调函数，状态和dom更新后就会被触发

```js
// 在同步的 逻辑中
state = {count:0}
this.setSate({
    count: this.state.count+1
},()=>{
    //在这个回调函数中会拿到更新后的状态
    copnsole.log(this.state.count) // 2
})
copnsole.log(this.state.count) // 1
```

### 一个小案例带入第三小点

```jsx
import React, { Component } from 'react'
import BScroll from 'better-scroll'
export default class App extends Component {
  state = {
    list: []
  }
  render() {
    return (
      <div>
        <button onClick={()=>this.handlerClick()}>click</button>
        <div className='warpper' style={{ height: '200px',background:'orange',overflow:'hidden' }}>
          <ul className='content'>
            {
              this.state.list.map((m) => <li key={m}>{ m }</li>)
            }
          </ul>
        </div>
      </div>
    )
  }

  handlerClick () {
    let list = [0,1,2,3,4,5,6,7,8,9,12,31,34,56,67,87,333,90]
    this.setState({
      list:list
    }, () => { 
      console.log(this.state.list); // 回调函数这里有更新的值
      console.log(document.getElementsByTagName('li')); // 回调函数这里有更新的dom
      new BScroll('.warpper')
    })
    // console.log(this.state.list); // []
    // console.log(document.getElementsByTagName('li')); // HTMLCollection []
    // new BScroll('.warpper')
  }
}
```
