---
# 取二三级标题生成目录
outline: [2,3]
---
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

### 一级路由

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

### 多级路由or嵌套路由

> 多级路由 又叫 嵌套路由

```js
 <Routes>
    <Route path='/' element={<Main />}>
      <Route index element={<Home />}></Route>
      <Route path='/html' element={<HtmlPage />}></Route>
      <Route path='/js' element={<JsPageWidget />}></Route>
      <Route path='/css' element={<CssPage />}>
        <Route index element={<CardsPage />}></Route>
        <Route path='/css/menu-radius' element={<MenuRadius />}></Route>
      </Route>
    </Route>
  </Routes>
```

设置二级路由出口 `<Outlet></Outlet>`

> `<Outlet></Outlet>` 跟vue的 `<router-view />` 是一样的用法

```js
export default function Home() {
    return (
        <>
          <aside>
              <ul>
                  <li><NavLink to="/categroy">分类管理</NavLink></li>
                  <li><NavLink to="/goods">商品管理</NavLink></li>
              </ul>
          </aside>
          <section>
                 {/* 二级路由出口 */}
                <Outlet></Outlet>
          </section>
        </>
    )
}
```

### 默认路由设置

```js
<Route path='/' element={<Home/>}>
  {/*默认二级路由，添加index属性，删除掉path属性*/}
  <Route index element={<Main/>}></Route>
  <Route path='category' element={<Category/>}></Route>
  <Route path='goods' element={<Goods/>}></Route>
</Route>
```

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

如果在跳转时不想加历史记录，可以添加额外参数replace为true

```js
 const register=(e)=>{
    e.preventDefault()
    navigate('/login',{replace:true})
  }
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

## 补充

### 路由配置

1）首先在react项目的入口文件index.js文件中，在APP.tsx`<App>`中使用`<BrowserRouter>`

```js
import {BrowserRouter} from 'react-router-dom'
​
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes></Routes>
    </BrowserRouter> 
    // or
    <HashRouter>
      <Routes></Routes>
    </HashRouter>
);
```

BrowserRouter：包裹这个应用，一个React应用只需使用一次

在 React Router 中提供了两种路由模式：hash 和 history。

对应的的路由组件分别是：

HashRouter：hash 模式的路由

BrowserRouter：history 模式的路由

实际使用时，任选其中一个模式引入即可

### 路由传参

1、searchParams传参
实现步骤

传参

```js
import {useNavigate} from 'react-router-dom'
export default function CategroyList() {
  let navigate=useNavigate();
  return (
    <div>
        <h2>CategroyList</h2>
        <button onClick={()=>{navigate('/categroyDetail?id=12')}}>详情</button>
    </div>
  )
}
```
获取参数

```js
import {useSearchParams} from 'react-router-dom'
 
export default function CategoryDetail() {
  let [params]=useSearchParams()
  return (
    <div>
        <h2>CategroyDetail</h2>
        <div>
            ID:{params.get('id')}
        </div>
    </div>
  )
}
```
2、params传参
实现步骤

路由设置

```js
 <BrowserRouter>
     <Routes>
        <Route path='/home' element={<Layout/>}>
           <Route path='categroy-detail/:id' element={<CategoryDetail/>}></Route>
         </Route>
      </Routes>
 </BrowserRouter>
```

传参

```js
import {useNavigate} from 'react-router-dom'
export default function CategroyList() {
  let navigate=useNavigate();
  return (
    <div>
        <h2>CategroyList</h2>
        <button onClick={()=>{navigate('/home/categroy-detail/13')}}>详情</button>
    </div>
  )
}
```
获取参数

```js
import React from 'react'
import {useParams} from 'react-router-dom'
 
export default function CategoryDetail() {
  let params=useParams()
  return (
    <div>
        <h2>CategroyDetail</h2>
        <div>
            ID:{params.id}
        </div>
    </div>
  )
}
```

### 解决路由闪屏

配置完路由懒加载后出现当进行路由跳转时，出现闪屏现象，要向解决这个问题可以使用 react-loadable插件进行解决

先下载react-loadable依赖包

> yarn add react-loadable
建立一个`loadable.js`，放在`src/utils/loadable.js`

```js
import Loadable from 'react-loadable';
export default function withLoadable(comp) {
    return Loadable({
    	//懒加载组件页面
        loader: comp,
        loading: () => null,
        delay: "",
    })
}

```

修改`router/index.js`

```js
import loadable from '../utils/loadable'
const Main=loadable(()=>import('../pages/Home/Main'))

<Route path='/' element={<Main />}>
```
