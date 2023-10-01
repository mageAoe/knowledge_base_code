# Flux与Redux

Flux 是一种架构思想，专门解决软件的结构问题。它跟MVC架构是同一类东西，但是更加简单和

清晰。Flux存在多种实现(至少15种)

https://github.com/voronianski/flflux-comparison

Facebook Flux是用来构建客户端Web应用的应用架构。它利用**单向数据流**的方式来组合React

中的视图组件。它更像一个模式而不是一个正式的框架，开发者不需要太多的新代码就可以快

速的上手Flux。

## **1. redux**介绍及设计和使用的三大原则

- state 以单一对象存储在store对象中
- state只读（每次都返回一个新的对象）
- 使用纯函数reducer最新state更新

## 2. redux工作流



## 3. 与react绑定后使用redux实现案例

- 创建一个reduxe 文件夹，下面一个store.js文件

```js
import { createStore } from 'redux'

const redux = (prevSate = {
  show:true
}, action) => {
  let newSate = {...prevSate}
  console.log(prevSate, action);
  switch (action.type) {
    case 'hide-tabbar':
      newSate.show = false
      return newSate
      case 'show-tabbar':
        newSate.show = true
        return newSate
    default:
      return newSate;
  }
}
const store = createStore(redux)
export default store
```

- 在需要使用的地方 导入,并订阅改 store
- 使用 ```store.getState()```获取

```jsx
import store from './redux/store'

const [isshow, setIsshow] = useState(store.getState().show)
  useEffect(() => { 
    store.subscribe(() => { 
      console.log('app 订阅', store.getState());
      setIsshow(store.getState().show)
    })
  },[])
```

- 在需要触发的位置，dispatch

```jsx
useEffect(() => { 
    store.dispatch({
      type:'hide-tabbar'
    })
    return () => { 
      store.dispatch({
        type:'show-tabbar'
      })
    }
  },[])
```

## 4. redux 原理

```jsx
const store = createScqStore(redux)

function createScqStore(redux) {
  const list = []
  let state = redux(undefined, {}) //之前的状态
  const dispatch = (action) => {
    state = redux(state,action)
    for (let i in list) { 
      list[i] && list[i]()
    }
  }
  const getState = () => { 
    return state
  }
  const subscribe = (callback) => { 
    list.push(callback)
  }
  return {
    dispatch,
    getState,
    subscribe
  }
}
export default store
```

## **5. reducer** **扩展**

如果如果不同的action所处理的属性之间没有联系，我们可以把 Reducer 函数拆分。不同的函数

负责处理不同属性，最终把它们合并成一个大的 Reducer 即可。

```jsx
import { createStore ,combineReducers} from 'redux'
import cityRedux from './reducers/cityReducer'
import tabbarRedux from './reducers/tabbarReducer'
const redux = combineReducers({
  cityRedux, // 这个名称是访问的名字
  a:cityRedux // 也可以写成这样，但是变量不好理解
  tabbarRedux
})

const store = createStore(redux)

export default store
```

cityRedux.js

```jsx
const cityRedux = (prevSate = {
  cityName:'北京'
}, action) => {
  let newSate = {...prevSate}
  switch (action.type) {
    case 'change-city':
      newSate.cityName = action.payload
      return newSate
    default:
      return newSate;
  }
}

export default cityRedux
```

访问：

```jsx
const {cityName } = store.getState().cityRedux
```

##  6. **redux**中间件

在redux里，action仅仅是携带了数据的普通js对象。action creator返回的值是这个action类型的

对象。然后通过store.dispatch()进行分发。同步的情况下一切都很完美，但是reducer无法处理异

步的情况。

那么我们就需要在action和reducer中间架起一座桥梁来处理异步。这就是middleware

**i.** **中间件的由来与原理、机制**

```jsx
export default function thunkMiddleware({ dispatch, getState }) { 	
	return next => action => 
		typeof action === 'function' ? 
		action(dispatch, getState) : 
		next(action);
}
```

这段代码的意思是，中间件这个桥梁接受到的参数action，如果不是function则和过去一样直接执

行next方法(下一步处理)，相当于中间件没有做任何事。如果action是function，则先执行action，

action的处理结束之后，再在action的内部调用dispatch。

**ii.** **常用异步中间件：**

a. redux-thunk (store.dispatch参数可以是一个function)

```jsx
// store 文件中
import { createStore ,combineReducers, applyMiddleware} from 'redux'
import cityRedux from './reducers/cityReducer'
import tabbarRedux from './reducers/tabbarReducer'
import CinemaListRedux from './reducers/cinemaList'
import reduxThunk from 'redux-thunk'

const redux = combineReducers({
  cityRedux,
  tabbarRedux,
  CinemaListRedux
})

const store = createStore(redux,applyMiddleware(reduxThunk))
```

```jsx
// cinema 文件中
useEffect(() => { 
    if (store.getState().CinemaListRedux.list.length === 0) { 
      //后台取数据
      store.dispatch(getCinemaListAction())
    } else {
      // 缓存
    }
    // 订阅
    const unSubscribe =  store.subscribe(() => { 
      setCinemaList(store.getState().CinemaListRedux.list)
      console.log('订阅',store.getState().CinemaListRedux.list);
    })
    return () => {
    // 组件销毁  清除订阅，类似清除定时器
      unSubscribe()
    }
  },[])

```

b. redux-promise (store.dispatch参数可以是一个promise对象)

```jsx
import promiseMiddleware from 'redux-promise'; 
// applyMiddleware 可以注册多个中间件
const store = createStore(fetchReducer, applyMiddleware(thunk,promiseMiddleware));

const getComingSoon = ()=>{ 
    //进行异步请求 ， 在使用时，直接return 一个promise，而不是一个函数
    return axios.get(`****`).then(res=>{
        return { 
            type:"cominglist", 
            info:res.data.data 
        }
    }) 
}
```

## **7. Redux DevTools Extension**

> https://github.com/zalmoxisus/redux-devtools-extension
>
> 安装完在store文件中配置一下

```jsx
import { createStore, compose} from 'redux' 
import reducer from './reducer' 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(reducer, /* preloadedState, */ composeEnhancers( 中间包含 applyMiddleware  )) 

export default store
```