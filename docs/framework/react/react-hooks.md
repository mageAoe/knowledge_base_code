# react hooks

## userState（保存组件状态）

```jsx
import React, { useState} from 'react'
const [state,setState] = useState(initial state)
```

## useEffect(处理副作用)和useLayoutEffect（同步执行副作用）

function Component 不存在生命周期，所以不要吧class Component的生命周期概念搬过来试图对号入座。

```jsx
useEffect(()=>{
	// efect
	return ()=>{
		// cleanup
	}
},[依赖的状态；空数组，表示不依赖])
```

**不要对 Dependencies 撒谎，如果你明明使用了某个变量，却没有申明在依赖中，你等于想 react 撒了谎，后果就是，当依赖的变量改变时，useEffect 也不会再次执行，eslint会报警告**

## useEffect 和useLayoutEffect 有什么区别

**简单来说就是调用时机不同，useLayouEffect和原来componentDidMount & componentDidUpdate 一致，在react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而useEffect是会在整个页面渲染完成才会调用的代码**

官方建议优先使用 ```useEffect```

在实际使用时如果想避免页面抖动的话，可以吧需要操作DOM的代码放在useLayoutEffect里，在这里做点DOM操作，这些dom修改会和react做出的更改一起被一次性渲染到屏幕上，只有一次重绘、回流的代价

## useCallback（记忆函数）

*防止因为组件重新渲染，导致方法被重新创建，起到缓存作用；只有第二个参数变化了，才重新声明一次*

```jsx
var handlerCLick = userCallback(()=>{
console.log(name)
},[name])
<button onClick={()=>handlerClick()>hello</buton>

// 只有name改变后，这个函数才会重新声明一次，
// 如果传入空数组，那么就是第一次创建后就被缓存，如果name后期改变了，拿到的还是老的name
// 如果不传入第二个参数，每次都会重新声明一次，拿到的就是新的name
```

## useMemo记忆组件

- 类似vue的computed计算属性

useCallback 的功能完全可以有useMemo所取代，如果你想通过使用useMemo返回一个记忆函数也是完全可以的

```rus
useCallback((fn,inputs)) is equivelent to useMemo(()=> fn,inputs)
```

唯一的区别是：**useCallback不会执行第一个参数函数，而是将它返回给你，而useMemo会执行一个函数并且将函数执行结果返回给你。所以在前面的例子中，可以返回handlerCLick来达到存储函数的目的**

所以useCallback常用来记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而useMemo更适合经过函数计算得到一个确定的值，比如记忆组件

## useRef(保存引用值)

```jsx
const mySwiper = useRef(null)
<input ref={mySwiper}>
const myNum = useRef(0)
<button onClick={()=> myNum++}>add</button>
// mySwiper 在元素身上绑定ref可以拿到dom元素
// myNum 直接使用useRef可以缓存变量，让react每次执行时，还能拿到之前 ++ 过的值
```

## useReduce和useContext（减少组件层级）

- useContext

```jsx
import React, { useContext,useState,useEffect } from 'react'
import axios from 'axios'
import './css/index.css'
const GlobalContext = React.createContext()
export default function App () { 
  const [info, setInfo] = useState('111')
  const [filmList, setFilmList] = useState([])
  
  useEffect(() => { 
    axios.get('/film.json').then(({data}) => { 
      console.log(data.data);
      setFilmList(data.data.films)
    })
  }, [])
  
  return (
    <GlobalContext.Provider value={{
      info: info,
      changeInfo: (value) => { 
        setInfo(value)
      }
    }}>
      <div className='app'>
        <div>
          {
            filmList.map(item => {
              return <Film key={item.filmId} {...item}></Film>
            })
          }
        </div>
        <FilmDateil></FilmDateil>
      </div>
    </GlobalContext.Provider>
  )
}

function Film (props) { 
  const { name,poster,synopsis } = props
  const value = useContext(GlobalContext)
  return <div className='film' onClick={() => {
        value.changeInfo(synopsis)
      }}>
        <img src={poster} alt={ name }></img>
        <h2>{ name }</h2>
      </div>
}

function FilmDateil () {
  const value = useContext(GlobalContext)

  return <div className='filmDetail'>
      { value.info }
    </div>
}
```

- useReducer

```jsx
import React, { useReducer} from 'react'

const reduce = (preSate,action) => { 
  const newValue = {...preSate}
  switch (action.type) { 
    case 'increase':
      newValue.count++
      return newValue
    case 'decrease':
      newValue.count--
      return newValue
    default:
      return preSate
  }
}

const initialSate = {
  count:0
}

export default function App () {
  const [state,dispatch] = useReducer(reduce,initialSate)
  return (
    <div>
      <button onClick={() => { 
        dispatch({
          type:'decrease'
        })
      }}>-</button>
      { state.count }
      <button onClick={() => { 
        dispatch({
          type:'increase'
        })
      }}>+</button>
    </div>
  )
}

```

## 自定义hooks

**当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中**

必须以 “use” 开头吗？必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数时候包含对其内部hook的调用，react将无法自动检测你的hook 是否违反hook的规则