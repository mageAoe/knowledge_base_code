---
# 取二三级标题生成目录
outline: [2,3]
---
# React **路由**（V5）

## **路由安装**

```cmd
npm install react-router-dom@5
```

## **路由使用**

```jsx
import { HashRouter,Route } from 'react-router-dom'
export default function App() {
  return (
    <div>
      <HashRouter>
        <Route path='/films' component={ Films }></Route>
        <Route path='/cinemas' component={ Cinemas }></Route>
        <Route path='/center' component={  Center }></Route>
      </HashRouter>
    </div>
  )
}
```

## 重定向 & 404

```jsx
export default function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
            <Route path='/films' component={ Films }></Route>
            <Route path='/cinemas' component={ Cinemas }></Route>
            <Route path='/center' component={Center}></Route>
            
            <Redirect from='/' to='/films' exact></Redirect>
            <Route component={ NotFound }></Route>
        </Switch>
      </HashRouter>
    </div>
  )
}
```

注意： 

 a. exact 精确匹配 (Redirect 即使使用了exact, 外面还要嵌套Switch 来用)

## 路由嵌套

> 写在films 文件中

```jsx
import { Switch, Route, Redirect } from 'react-router-dom'
export default function films() {
  return (
    <div>
      <div style={{ background: 'yellow',height:'200px'}}></div>
      <div>导航栏</div>
      <Switch>
        <Route path='/films/Comingsoon' component={Comingsoon}></Route>
        <Route path='/films/Nowplaying' component={Nowplaying}></Route>
        
        <Redirect from='/films' to='/films/Comingsoon'></Redirect>
      </Switch>
    </div>
  )
}
```

## **路由跳转方式**

a. 声明式导航

```jsx
<NavLink to="/films" activeClassName="active">films</NavLink> 
<NavLink to="/cinemas" activeClassName="active">cinemas</NavLink> 
<NavLink to="/center" activeClassName="active">center</NavLink>
```

b. 编程式导航

```jsx
// class
this.props.history.push(`/detail/${id}`)
// function
props.history.push(`/detail/${id}`)
```

##  **路由传参**

- 动态路由传参，类似VUE的动态路由
- 动态有个好处就是**页面刷新**时，参数还存在

```jsx
// push 到详情页
props.history.push(`/detail/${id}`)
// 设置路由的匹配规则
<Route path='/detail/:id' component={ Detail}></Route>
// 在详情页接收
props.match.params.id
```

- query 传参

```jsx
// push 到详情页 并携带query参数
props.history.push({ pathname : '/detail' ,query : { id: id} })
//接收
props.location.query.id
```

- state 传参

```jsx
// push 到详情页 并携带state参数
props.history.push({ pathname:'/detail',state:{id: id } })
// 接收
props.location.state.id
```

## **路由拦截**

```jsx
<Route path="/center" render={()=>isAuth()?<Center/>:<Login/>}/>
// 使用render进行重定向时，它里面的组件拿不到props的路由对象,这时就需要传递过去了
<Route path='/center' render={(props) => { 
        return isAuth() ? <Center {...props} /> : <Redirect to='/login' />
}}></Route>
```

## 路由模式

- BrowserRouter 不带#号的路由
- HashRouter 带#号的路由

## withRouter

- 当props没有路由方法时，使用该方法包裹。可以不使用render里面的props传递

```jsx
import React from 'react'
import {withRouter} from 'react-router-dom'
function Center (props) {
  console.log(props);
  return (
    <div>center</div>
  )
}
export default withRouter(Center)
```

## **反向代理** - 解决开发环境跨域

https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development

```jsx
npm install http-proxy-middleware --save
```

- 1.安装插件
- 2.在**Src**下创建一个**setupProxy.js**
- 配置跨域结构
- 修改完setupProxy文件，一定要重启项目

```jsx
const { createProxyMiddleware } = require('http-proxy-middleware'); 
module.exports = function(app) { 
    app.use( 
        '/api', 
          createProxyMiddleware({ 
              target: 'http://localhost:5000', 
              changeOrigin: true, 
          }) 
    ) 
};
```

## CSS 模块化

https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet

```css
全局
:global(.active){ }
```

- react 的模块化，需要在.css前面加上 module ，例如：center文件的css就是center.module.css
- 然后在center文件中导入  import style from  ‘./center.module.css’
- 使用class类名的时候，需要加上导入的 那个style，例如：style.active
