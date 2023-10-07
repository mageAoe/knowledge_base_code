---
# 取二三级标题生成目录
outline: [2,3]
---
# React 生命周期

## 1.初始化阶段

```js
// componentWillMount 现在已经被遗弃了

// componentWillMount : render之前最后一次修改状态的机会
// render: 只能访问this.props 和 this.state ，不允许修改状态和DOM输出
// * componentDidMount: 成功render 并渲染完成真实DOM之后触发，可以修改DOM
	// 这里可以进行数据请求
    // setIntervl
    // 订阅函数
```

## 2.运行中阶段 

> *是重要的

```
* componentWillReceiveProps : 父组件修改属性触发 - 被弃用了
* shouldComponentUpdated : 返回false会阻止render调用
componentWillUpdate ： 不能修改属性和状态 - 也被弃用了，UNSAFE_componentWillUpdate
render ： 只能访问this.props和this.state，不允许修改状态和DOM输出
* componentDidUpdate：可以修改DOM和拿到DOM元素 ， 拿到更新后的元素
```

> 每个生命周期都有两个参数，相当于 vue 的watch(newVal,oldVal)

```jsx
shouldComponentUpdated(nextProps,nextSate){
	return true // 更新
	return false // 不更新
	this.state //老的状态
	nextSate // 新的状态
    nextProps // 是个空的
}
```

- shouldComponentUpdated 案例

```jsx
import React, { Component } from 'react'

class Box extends Component { 

  // 不使用这个，每次都会更新 5次子组件
  shouldComponentUpdate (nextPops,nextState) { 
    console.log(nextPops, nextState);
    // 阻止子组件的无用render
    if (this.props.current === this.props.index || nextPops.current ===  nextPops.index) {
      return true
    }
     return false
  }

  render () {
    return <div style={{
      width: '100px',
      height: '100px',
      border: this.props.current === this.props.index ? '5px solid red' : '1px solid gray',
      margin: '10px',
      float: 'left'
    }}>
    </div>
  }
}

export default class App extends Component {

  state = {
    list: ['00', '01', '02', '03', '04', '05'],
     current: 0
  }
  render() {
    return (
      <div>
        <input type='number' onChange={(evt) => {
          this.setState({
            current: Number(evt.target.value)
          })
        }}></input>

        <div style={{overflow:'hidden'}}>
          {
            this.state.list.map((item,index) => 
              <Box key={item} current={this.state.current} index={ index }></Box>  
            )
          }
        </div>
      </div>
    )
  }
}

```

- componentWillReceiveProps 

```
1.组件初次渲染时不会执行componentWillReceiveProps；
2.当props发生变化时执行componentWillReceiveProps；
3.在这个函数里面，旧的属性仍可以通过this.props来获取；
4.此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。即可以根据属性的变化，通过调用this.setState()来更新你的组件状态，在该函数中调用 this.setState() 将不会引起第二次渲染
5.也可在此函数内根据需要调用自己的自定义函数，来对prop的改变做出一些响应 比如 ajax
6.该函数接收一个形参，可以在更新之前拿到最新的 props，相当于更新时的 created
```

## 3.销毁阶段

```jsx
componentWillUnmount : 在删除组件之前进行清理操作，比如计时器和事件监听器
```

## 老生命周期的问题

- componentWillMount在ssr中这个方法将会被多次调用，所以会重复触发多遍，同时在这里如果绑定事件，将无法解绑，导致内存泄漏，变得不够安全高效逐步废弃
- componentWillReceiveProps 外部组件多次频繁更新传入多次不同的props，会导致不必要的异步请求
- componentWillupdate 更新前记录DOM状态，可能会做一些处理，与componentDidUpdate相隔如果过长，会导致状态 不太信

## 新生命周期的代替

（1）getDerivedStateFromProps 第一次的初始化组件以及后续的更新过程中（包括自身状态更新以及父传子），返回一个对象作为新的state，返回null则说明不需要在这里更新state

```jsx
// 老的生命周期的写法
componentDidMount(){
	if(this.props.value !== undefined){
		this.setState({
			current:this.prop.vlaue
		})
	}
}
componentWillReceiveProps(nextProps){
	if(nextProps.value !== undefined){
		this.setState({
			current:this.prop.vlaue
		})
	}
}

// 新生命周期的写法
 static getDerivedStateFromProps (nextProps) {
    if(nextProps.value !== undefined){
    	return {
    		current:nextProps.value
    	}
    }
  }
```

- 案例

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list: [],
    type: 1
  }
  componentDidMount () { 
    this.setState({
      list:[1,2,3,4,5,6,7,8,9,10]
    })
  }
  static getDerivedStateFromProps (preprops, prvstate) {
    console.log(preprops,prvstate);
    return {
      type:prvstate.type
    }
  }
  componentDidUpdate (preprops, prvstate) {
    console.log(prvstate); // 拿到的是上一个生命周期的  prvstate 的值
    if (this.state.type === prvstate.type) return

    if (this.state.type === 1) {
      this.setState({
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      })
    } else { 
      this.setState({
        list: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      })
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            type:1
          })
        }}>0-10</button>
        <button onClick={() => {
          this.setState({
            type:2
          })
        }}>11-20</button>
        <ul>
          {
            this.state.list.map((m) => { 
              return <li key={ m }>{ m }</li>
            })
          }
        </ul>
      </div>
    )
  }
}

```

(2) getSnapshotBeforeUpdate 取代了componentWillUpdate，触发时间为update发生的时候，在 **render之后dom渲染之前**返回一个值，作为componentDidUpdate的第三个参数。

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    list:[1,2,3,4,5,6,7,8,9,0]
  }
  myref = React.createRef()
  getSnapshotBeforeUpdate () { 
    return this.myref.current.scrollHeight
  }
  componentDidUpdate (preState, preProps, value) {
    this.myref.current.scrollTop +=this.myref.current.scrollHeight - value
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            list:[...[12,334,45,65,778],...this.state.list]
          })
        }}>发邮件</button>
        <div style={{ height: '200px', overflow: 'auto', background: 'yellow' }} ref={ this.myref }>
          <ul>
            {
              this.state.list.map((m) => { 
                return <li key={m} style={{height:'100px'}}>{ m }</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

```

## react中性能优化的方案

1. shouldComponentUpdate

控制组件自身或者 子组件是否需要更新，尤其在子组件非常多的情况下，需要进行优化。

2. **PureComponent **

PureComponent 会帮你比较新props跟旧的props，新的state和老的state（值相等或者含有相同的属性、且属性值相等），决定shouldComponentUpdate 返回true或者false，从而决定要不要呼叫render function

**注意**

​	如果你的state或props【永远在变】，那pureComponent并不会比较快，因为shllowEqual 也需要花时间