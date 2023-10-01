# React扩展

## GraphQL



## dva



## umi

> umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持类 next.js 的 约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。umi 在约定式 路由的功能层面会更像 nuxt.js 一些。 开箱即用，省去了搭框架的时间
>
> 安装脚手架
>
> ```shell
> mkdir myapp && cd myapp //空目录
> $ npx @umijs/create-umi-app
> ```

### 路由

umi 会根据 pages 目录自动生成路由配置。需要注释.umirc.js，routes相关,否则自动配置不生效

(1) 基础路由

​	直接在pages文件下创建文件，然后在浏览器上访问文件名即可

 **修改 .umirc.ts**

```tsx
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});

```

(2) 重定向

```tsx
import React from 'react'
import { Redirect } from 'umi'

export default function index() {
  return (
    <div>index
      <Redirect to='/film'></Redirect>
    </div>
  )
}
```

**404页面：** 直接在pages文件下创建 404.tsx 即可自动重定向

(3) 嵌套路由

```tsx
import React from 'react'
import { Redirect,useLocation } from 'umi'

export default function Film(props: any) {
  const location = useLocation()

  if (location.pathname === '/film') { 
    return <Redirect to='/film/nowplaying'></Redirect>
  }

  return (
    <div>
      <div style={{ background: 'yellow', height: '400px' }}>film</div>
      { props.children
       // 用来加载
      } 
    </div>
  )
}
```

(4) 动态路由

```tsx
import React from 'react'
import { useParams } from 'umi'
export default function Detail(props:any) {
  console.log(props); // 这样可以拿到参数
  const params = useParams()
  console.log(params); // 这样也可以

  return (
    <div>Detail</div>
  )
}
```

(5) 路由拦截

```tsx
import React from 'react'

function Center() {
  return (
    <div>Center</div>
  )
}

Center.wrappers = ["@/wrappers/Auth"]

export default Center
```

```tsx
import React from 'react'
import { Redirect } from 'umi'
export default function Auth(props:any) {

  if (localStorage.getItem('token')) {   // 进入center 的时候拦截
    return (
      <div>Auth</div>
    )
  }
  return <Redirect to='login'></Redirect> 
}
```

(6) hash模式

```tsx
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  history: {type: 'hash'}
});
```

(7) 声明式导航

```tsx
import React from 'react'
import { NavLink } from 'umi'
import './index.less'
export default function IndexLayout(props:any) {
  return (
    <div>
      { props.children }

      <ul>
        <li>
          <NavLink to='/film' activeClassName='active'>Film</NavLink>
        </li>
        <li>
          <NavLink to='/cinema' activeClassName='active'>cinema</NavLink>
        </li>
        <li>
          <NavLink to='/center' activeClassName='active'>center</NavLink>
        </li>
      </ul>
    </div>
  )
}
```

(8) 编程式导航

```tsx
// 第一种
import { useHistory } from 'umi'
const history = useHistory()
history.push(`/detail/${item.filmId}`)

// 第二种
export default function Nowplaying(props:any) {
	props.history.push
}

```



### mock功能

umi 里约定 mock 文件夹下的文件或者 page(s) 文件夹下的 _mock 文件即 mock 文件，文件导出接口定义，支持基 于 require 动态分析的实时刷新，支持 ES6 语法，以及友好的出错提示



### 反向代理

```tsx
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},

  proxy: {
    "/ajax": {
      target: 'https://i.maoyan.com',
      changeOrigin: true
    }
  }
});

```

```tsx
import React, { useEffect } from 'react'

export default function Comingsoon() {

  useEffect(() => { 
    fetch('/ajax/comingList?ci=107&limit=10&movieIds=&token=&optimus_uuid=7E75D1C0AD4611ED9D5EC3EE6F631E4D7C834F76E9E443559AB5F4605556FBA7&optimus_risk_level=71&optimus_code=10')
      .then(res => res.json()).then(res => { 
        console.log(res);
        
      })
  },[])

  return (
    <div>Comingsoon</div>
  )
}
```

### antd

```tsx
// .umirc.ts
npm install --save antd-mobile
antd: {
    mobile:false //取消默认版本
	//自定义配置
}
```

### dva集成

按目录约定注册 model，无需手动 app.model 

文件名即 namespace，可以省去 model 导出的 namespace key 

无需手写 router.js，交给 umi 处理，支持 model 和 component 的按需加载 

内置 query-string 处理，无需再手动解码和编码 

内置 dva-loading 和 dva-immer，其中 dva-immer需通过配置开启(简化 reducer 编写)

```tsx
// .umirc.ts
dva:{
//自定义配置
}
```

(1) 同步



(2) 异步