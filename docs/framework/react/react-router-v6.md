# react路由（V6.2）

## 简介

- react-router： **核心模块**，包含react路由大部分的核心功能，包括路由匹配算法和大部分核心组件和钩子
- react-router-dom： react应用中用于路由的软件包，包括react-router的所有内容，并添加了一些特定于DOM的API，包括但不限于BrowserRouter、HashRouter和Link
- react-router-native：用于开发React Nactive应用，包括react-router的所有内容，并添加了一些特定谷雨react Native的API,包括但不限于NativeRouter和Link

## 对比V5

1. 包大小对比

   react-router@5.1.2   ：20.8kb

   react-router@6.2.1： 10.8kb

2. ```<Route>``` 特性变更

   path：当前页面对应的URL匹配

   element： 新增，用于决定路由匹配时，渲染哪个组件。代替v5的 component 和 render

3. ```<Router> 代替了<Switch>```

4. ```<Outlet></Outlet>```  让嵌套路由更简单

5. useNavigate代替useHistory

6. 移除了```<NavLink />```的activeClassName 和 activeStyle

7. 钩子useRoutes 代替 react-router-config

## 用法详解

### 一级路由和多级路由

```tsx
<Routes>
        <Route index element={ <Film />} />
        <Route path='/film' element={ <Film />} />
        <Route path='/cinema' element={<Cinema />} />
        <Route path='/center' element={ <Center/> } />
 </Routes>
```

> index 用于嵌套路由，仅匹配父路径时，设置渲染的组件
>
> 解决当嵌套路由有多个子路由但本身无法确认默认渲染哪个子路由的时候，可以增加index属性来指定默认路由。index路由和其他路由不同的地方是它没有path属性，他和父路由共享同一个路径

### 路由重定向

1. 使用 ```*```号

```js
<Routes>
        <Route path='/film' element={ <Film />} />
        <Route path='/cinema' element={<Cinema />} />
        <Route path='/center' element={ <Center/> } />

        {/* 重定向 */}
        <Route path="*" element={ <Navigate to='/film'/> } />
      </Routes>
```

2. 官方推荐方案2： 自定义 Redirect 组件

```js
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect ({ to }) {
  const navigate = useNavigate()

  useEffect(() => { 
    navigate(to, {replace: true})
  })
  return null
}
// 路由
 <Route path="*" element={ <Redirect to='/film'/> } />
```

3. 404 如何实现？

```js
 <Route path="/" element={<Redirect to='/film' />} />
 <Route path="*" element={ <NotFound/> } />
```

### 路由重定向

```js
<Route path='/film' element={<Film />} >
          <Route path="" element={ <Redirect to='/film/nowplaying' /> } /> 
          <Route path="nowplaying" element={<Nowplaying />} />
          <Route path="comingsoon" element={ <Comingsoon /> } />
</Route>

// film
<Outlet></Outlet> 
```

### 声明式导航与编程式导航 

声明式导航

```js
import { NavLink } from 'react-router-dom'	
<ul>
        <li>
          <NavLink to='/film' className={({ isActive }) => isActive?'scqactive':''}>电影</NavLink>
        </li>
        <li>
          <NavLink to='/cinema' className={({ isActive }) => isActive?'scqactive':''}>影院</NavLink>
        </li>
        <li>
          <NavLink to='/center' className={({ isActive }) => isActive?'scqactive':''}>我的</NavLink>
        </li>
      </ul>
```

编程式导航 

```js
// url传参
import { useNavigate } from 'react-router-dom'
const navigate = useNavigate()
navigate(`/detail?id=${filmId}`)

// detail
import { useSearchParams } from 'react-router-dom'
const [searchParams, setSearchParams] = useSearchParams()
// 获取参数
searchParams.get('id')
// 判断参数时候存在
searchParams.has('id')
// 同时页面内也可以用set方法来改变路由
setSearchParams({id: 2})

```

### 动态路由

```js
 {/* 动态路由 */}
<Route path='/detail/:id' element={ <Detail/> } />

 //detail
import { useSearchParams,useParams } from 'react-router-dom'
const params = useParams()
<div>Detai - {  params.id }</div>
```

### 路由拦截

```js
<Route path='/center' element={<AuthComponent>
   <Center/>
</AuthComponent> } />
 // 封装一个路由鉴权的组件                     
function AuthComponent ({ children}) { 
  const isLogin = localStorage.getItem('token')
  // console.log(props);
  return isLogin ? children: <Redirect to='/login' />
}
```

### 路由模式

```js
import { HashRouter, BrowserRouter} from 'react-router-dom'
// HashRouter 带#
// BrowserRouter 会请求后端的页面

```

### withRoute / 类组件跳转方法

```js
// 使用 useNavigate 替代
import { useNavigate } from 'react-router-dom'
 const handleChangePage = (filmId) => { 
    navigate(`/detail/${filmId}`)
  }
```

**类组件**

```js
import React, { Component } from 'react'
import withRouter from './WithRouter';
class FilmItem_class extends Component {
  render () {
    console.log(this.props);
    return (
      <div>FilmItem_class</div>
    )
  }
}

export default withRouter(FilmItem_class)


// 自己封装一个函数
import React from 'react'
import { useNavigate,useParams,useLocation } from 'react-router-dom'

export default function withRouter (Component) {
  return function (props) { 
    const push = useNavigate()
    const match = useParams()
    const location = useLocation()
    return <Component a='1' {...props} history={{ push,match,location }}  />
  }
}
```



### 路由懒加载

```js
<Route path='/cinema' element={LazyLoad('Cinema')} />

const LazyLoad = (path) => {
  const Comp = React.lazy(() => import(`../views/${path}`))
  return (
    <React.Suspense fallback={ <div>加载中...</div>}>
      <Comp/>
    </React.Suspense>
  )
}
```

### useRoutes钩子匹配路由

类似vue的路由方案

```js
import { useRoutes} from 'react-router-dom'
import Redirect from '../components/Redirect';

export default function IndexRouter () {
  const element = useRoutes([
    {
      path: '/film',
      element: LazyLoad('Film'),
      children: [
        {
          path: '',
          element: <Redirect to='/film/nowplaying' />
        },
        {
          path: 'nowplaying',
          element: LazyLoad('film/Nowplaying')
        },
        {
          path: 'comingsoon',
          element: LazyLoad('film/Comingsoon')
        }
      ]
    },
    {
      path: '/cinema',
      element: LazyLoad('Cinema')
    },
    {
      path: '/center',
      element: <AuthComponent>
                { LazyLoad('Center')}
             </AuthComponent>
    },
    {
      path: '/login',
      element: LazyLoad('Login')
    },
    {
      path: '/detail/:id',
      element: LazyLoad('Detail')
    },
    {
      path: '/cinema/search',
      element: LazyLoad('Search')
    },
    {
      path: '/',
      element: <Redirect to='/film' />
    },
    {
      path: '*',
      element: LazyLoad('NotFound')
    }
  ])
  return (element)
}
```

