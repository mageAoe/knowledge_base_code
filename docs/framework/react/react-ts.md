# TS

### 1-typescript

> 文档：https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook

1. TypeScript 的定位是静态类型语言，在写代码阶段就能检查错误，而非运行阶段 
2. 类型系统是最好的文档，增加了代码的可读性和可维护性。 
3. 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）等 
4. ts最后被编译成js

## 2-安装

```create-react-app my-app --template typescript```

## 3-声明

1. ·可以在当前文件加上declare const $: any; 
2. 安装 npm i @types/jquery @types是npm的一个分支，用来存放*.d.ts文

```js
npm i --save react-router-dom
npm i --save @types/react-router-dom // 编译器需要通过这个声明文件，进行类型检查工作
```



## 4-变量声明



## 5-定义普通函数

```tsx
function test(a: string, b: string): string { 
  return a + b
}
// -----------------

interface IFunc {
  (a:string,b:string, c?:number):string
}

export default {}
```

## 6-定义普通类

```tsx
interface IFunc { 
  getName: ()=> string
}

class A implements IFunc{ 
  a() { }
  b() { }
  getName(): string {
    return ''
  }
}

function setname(obj:IFunc) { 
  obj.getName()
}

let a1 = new A()

console.log(setname(a1));

export default {}
```

## 7-定义类组件

```tsx
import React, { Component } from 'react'

interface IState { 
  name: string
}

/**
 * 类用泛型约束
 *  第一个参数是： 约束props
 *  第二个参数是： 约束 state 
 */
export default class App extends Component<any, IState> {
  
  state = {
    name: 'scq'
  }
  render() {
    return (
      <div>
        {
          this.state.name
        }
        <button onClick={() => { 
          this.setState({
            name: this.state.name.substring(0, 1).toUpperCase() + this.state.name.substring(1)
          })
        }}>click</button>
      </div>
    )
  }
}

```

## 8-定义函数式组件

```tsx
import React from 'react'

export default function App() {
  return (
    <div>
      app
      <Child name="aaa"></Child>
    </div>
  )
}
interface IProps { 
  name: string
}
// function Child(props:IProps) {
//   return (
//     <div>child - { props.name }</div>
//   )
// }
const Child:React.FC<IProps> = (props) => { 
  return (
        <div>child - { props.name }</div>
      )
}
```

```tsx
import React, { useRef, useState } from 'react'

export default function App() {
  const mytext = useRef<HTMLInputElement>(null)
  const [list,setList] = useState<string[]>([])
  return (
    <div>App
      <input ref={mytext}></input>
      <button onClick={() => { 
        console.log(mytext.current?.value)
        setList([...list, (mytext.current as HTMLInputElement).value])
      }}>add</button>
    </div>
  )
}
```



## 9-父子通信



## 10-路由



## 11-redux