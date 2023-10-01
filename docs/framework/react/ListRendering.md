# 列表渲染

```jsx
export default class App extends Component {
  state = {
    list:[111,222,333]
  }
  // 也可以使用变量来接收
  render () {
    let myList  = this.state.list.map((m) => <li key={m}>{ m }</li>)
    return (
      <div>
        <ul>{
            // this.state.list.map((m) => <li key={m}>{ m }</li>)
            // 这两个方法都可以
            myList
            }</ul>
      </div>
    )
  }
}
```

react 的高效依赖于所谓的virtual-dom，尽量不碰dom。对于列表元素来说会有一个问题：元素可能会在一个列表中改变位置。要实现这个操作，只需要交换一下dom位置就行了，但是react并不知道其实我们只是改变了元素的位置，所以它会重新渲染后面两个元素（在执行virtual-dom），这样会大大增加dom操作。但如果给每个元素加上唯一的标识，react就可以知道这两个元素只是交换了位置，这个标识就是key，这key必须是每个元素唯一的标识

## 修改列表的值

```jsx
export default class App extends Component {
  myRef = React.createRef()
  state = {
    list: [
      {id:0,text:'aa'},
      {id:1,text:'bb'},
      {id:3,text:'cc'}
    ]
  }
  render () {
    return (
      <div>
        <input ref={this.myRef}></input>
        <button onClick={this.handlerClick}>按钮2</button>
        <ul>{this.state.list.map((m,index) => <li key={m.id}>{m.text}<button onClick={() => this.handleDelClick(index)}>del</button></li>)}</ul>
      </div>
    )
  }
  handlerClick = () => { 
    console.log('click2', this.myRef.current.value);  // this.myRef.current就是原生dom
    let newList = [...this.state.list]
    newList.push({
      id: Math.random(),
      text: this.myRef.current.value
    })
    this.setState({
      list:newList
    })
    this.myRef.current.value = ''
  }
  handleDelClick = (index) => { 
    let newList = this.state.list.slice()
    newList.splice(index, 1)
    this.setState({
      list: newList
    })
  }
}
```

## 解析富文本 - 类似与vue的 V-HTML

```jsx
<ul>{this.state.list.map((m, index) => <li key={m.id}>
        <span dangerouslySetInnerHTML={
           {
              __html: m.text
           }
         }></span>
 <button onClick={() => this.handleDelClick(index)}>del</button></li>)}</ul>
```