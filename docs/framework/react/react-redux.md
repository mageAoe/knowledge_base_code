---
# 取二三级标题生成目录
outline: [2,3]
---
# **十二**. react-redux

>  "react": "^18.1.0",
>
>  "react-dom": "^18.1.0",
>
>  这两个包的版本装不上 react-redux，必须要 ```^18.2.0```

> https://github.com/reactjs/react-redux

## **2.** **容器组件与UI组件**

(1）UI组件

- 只负责 UI 的呈现，不带有任何业务逻辑

- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供

- 不使用任何 Redux 的 API

 (2) 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现

- 带有内部状态

- 使用 Redux 的 API

## **3. Provider与connect**

（1）React-Redux 提供Provider组件，可以让容器组件拿到state

```jsx
import React from 'react' 
import ReactDOM from 'react-dom' 
import { Provider } from 'react-redux' 
import store from './store' 
import App from './App' 
const rootElement = document.getElementById('root') 

// 将store 注入到组件中
ReactDOM.render( 
    <Provider store={store}> 
        <App /> 
    </Provider>, 
    rootElement 
)
```

（2）React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来.

```jsx
// 这是直接使用redux时的写法
import React, { Component } from 'react'
import MRouter from './01-filmList'
import Tabbar from './components/tabBar'
 import store from './redux/store'
import './style/app.css'
export default class App extends Component {
     state = {
         isShow:store.getState()
     }
    componentDidMount () {
         store.subscribe(() => { 
             // console.log('app 订阅', store.getState());
             this.setState({
                 isShow:store.getState().tabbarRedux.show
             })
         })
    }

    render() {
        return (
           <div>
                {/* 其他的内容 */}
                <MRouter>
                    { this.props.isShow && <Tabbar></Tabbar> }
                </MRouter>
           </div>
        )
    }
}
```

```jsx
// 这是使用react-redux 的写法
import React, { Component } from 'react'
import MRouter from './01-filmList'
import Tabbar from './components/tabBar'
import './style/app.css'
import {connect} from 'react-redux'
class App extends Component {
    render() {
        return (
           <div>
                {/* 其他的内容 */}
                <MRouter>
                    { this.props.isShow && <Tabbar></Tabbar> }
                </MRouter>
           </div>
        )
    }
}
// connect 的第一个参数是一个函数 用来处理 mapStateToProps
// connect 的第二个参数是一个对象，用来处理 mapDispatchToProps 方法
export default connect((state) => {
    return {
        isShow:state.tabbarRedux.show
    }
})(App)
```

```jsx
// 处理方法 redux 写法
import React, { useEffect} from 'react'
import store from '../redux/store'
import { show,hide } from '../redux/actionCreator/tabberShow'
export default function Detail (props) {
  
  useEffect(() => {
     store.dispatch(hide())
    return () => { 
       store.dispatch(show())
    }
  },[hide,show])

  return (
    <div>detail- { props.match.params.id}</div>
  )
}
```

```jsx
// react-redux 写法
import React, { useEffect} from 'react'
import { show,hide } from '../redux/actionCreator/tabberShow'
import { connect } from 'react-redux'
function Detail (props) {
  const { hide,show} = props
  useEffect(() => {
    hide()
    return () => { 
      show()
    }
  },[hide,show])

  return (
    <div>detail- { props.match.params.id}</div>
  )
}
export default connect(null, {
  show,hide
})(Detail)

```

- 使用react-redux修改异步组件

```jsx
// redux 写法
import React, { useEffect, useState } from 'react'
import store from '../redux/store'
import getCinemaListAction from '../redux/actionCreator/getCinemaListAction'

function Cinemas (props) {
   const { cityName } = store.getState().cityRedux
   const [cinemaList,setCinemaList] = useState(store.getState().CinemaListRedux.list)
  useEffect(() => { 
    if (store.getState().CinemaListRedux.list.length === 0) { 
      //后台取数据
      store.dispatch(getCinemaListAction())
      console.log(store.getState().CinemaListRedux.list);
    } else {
      
    }
    // 订阅
    const unSubscribe =  store.subscribe(() => { 
      setCinemaList(store.getState().CinemaListRedux.list)
    })
    return () => {
      // 销毁
      unSubscribe()
    }
  },[])

  return (
    <div>
      <div style={{overflow:'hidden'}}>
        <div style={{float:'left'}} onClick={() => { 
          props.history.push('/city')
        }}>{cityName}</div>
        <div style={{float:'right'}} onClick={() => { 
          props.history.push('/cinemas/search')
        }}>
          搜索
        </div>
      </div>
      {
        cinemaList.map(m =>
          <dl key={m.cinemaId} style={{padding:'10px'}}>
            <dt>{m.name }</dt>
            <dd style={{fontSize:'12px',color:'gray'}}>{ m.address}</dd>
        </dl>)
      }  
    </div>
  )
}
```

```jsx
// react-redux 写法
import React, { useEffect } from 'react'
import getCinemaListAction from '../redux/actionCreator/getCinemaListAction'
import { connect } from 'react-redux'

function Cinemas (props) {
  const {cityName,list,getCinemaListAction }  = props

  useEffect(() => { 
    if (list.length === 0) { 
      //后台取数据
      getCinemaListAction()
    } else {
      console.log('缓存');
    }
  },[list,getCinemaListAction])

  return (
    
    <div>
      <div style={{overflow:'hidden'}}>
        <div style={{float:'left'}} onClick={() => { 
          props.history.push('/city')
        }}>{cityName}</div>
        <div style={{float:'right'}} onClick={() => { 
          props.history.push('/cinemas/search')
        }}>
          搜索
        </div>
      </div>
      {
        list.map(m =>
          <dl key={m.cinemaId} style={{padding:'10px'}}>
            <dt>{m.name }</dt>
            <dd style={{fontSize:'12px',color:'gray'}}>{ m.address}</dd>
        </dl>)
      }  
    </div>
  )
}
const mapStateToProps = (state) => { 
  return {
    cityName: state.cityRedux.cityName,
    list: state.CinemaListRedux.list
  }
}
const mapDispachToProps = {
  getCinemaListAction
}
export default connect(mapStateToProps,mapDispachToProps)(Cinemas)
```

## 4. HOC与context通信在react-redux底层中的应用

(1) connect 是HOC， 高阶组件

(2) Provider组件，可以让容器组件拿到state ， 使用了context

## **5.** 高阶组件构建与应用

HOC不仅仅是一个方法，确切说应该是一个组件工厂，获取低阶组件，生成高阶组件。

(1)代码复用，代码模块化

(2)增删改props

(3) 渲染劫持

```jsx
// react-redux 原理及实现
import React from 'react'

function NotFound (props) {
  console.log(props);
  return (
    <div>404 NotFound</div>
  )
}

const scqConnect = (cb,obj) => {
  const value = cb()
  return (NotFound) => {
    return (props) => { 
      return <div style={{ color:'red'}}>
        <NotFound {...value} {...props} {...obj}></NotFound>
      </div>
    }
  }
}

export default scqConnect(() => { 
  return {
    a: 1,
    b:2
  }
}, {
  aa () { },
  bb () { }
})(NotFound)
```

## **6. Redux** **持久化**

> npm install redux-persist

```jsx
import {persistStore, persistReducer} from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; 

const persistConfig = { 
    key: 'kerwin', 
    storage: storage, 
    //localStorage: import storage from 'redux-persist/lib/storage' 
    //sessionStorage: import storageSession from 'redux-persist/lib/storage/session' 
    stateReconciler: autoMergeLevel2 
    //控制在本地存储中，新老状态怎么合并，覆盖？或者合并？ 
};

//改造reducer 
const myPersistReducer = persistReducer(persistConfig, reducer) 

//改造store 
export const persistor = persistStore(store) 

//改造根组件 
import {persistor} from './Store' 
import {PersistGate} from 'redux-persist/lib/integration/react'; 

<PersistGate loading={null} persistor={persistor}> ... </PersistGate>
```