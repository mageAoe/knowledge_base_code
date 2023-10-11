# NextJS

**注意：下面安装的是12版本，现在已经更新到13版本了**

```shell
npx create-next-app@12 Your project name
```

- .next npm run dev生成的开发文件
- pages 工作文件
- public 静态资源文件
- next.config.js nextjs配置文件

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // react严格模式
  swcMinify: true,
}

module.exports = nextConfig

```

## 路由

- 基于文件系统的路由机制
- 当一个组件文件被添加到项目的pages目录，它自动会具有一个路由
- 通过混合匹配文件名和嵌套的目录结构，可以实现大部分主流的路由模式

### 通过pages实现路由

> pages 下面的index.js文件会映射到路由的根路径 /

> pages 下面新建 about.js，那么就可以在路由上访问 /about
```js
function About(){
    return <h1>About</h1>
}

export default About
```

### 嵌套路由

> pages 下新建 blog 文件夹，在blog下新建 index.js，那么路由就是 /blog

> pages/blog 下新建 first.js，那么路由就是 /blog/first

> pages/blog 下新建 second.js，那么路由就是 /blog/second

```js
function First(){
    return <h1>First</h1>
}

export default First
```

### 动态路由

> 在 pages 下新建 book 文件夹

> 然后 在 pages/book/[bookId].js 那么，就可以访问路由  /book/1  /book/2

> 动态路由的值 需要从router里面取

```js
import { useRouter } from 'next/router'

function BookDetail(){

    const router = useRouter()

    const bookId = router.query.bookId

    console.log(bookId);

    return (
        <>
            <h1>{bookId}荒天帝，独战万古</h1>
        </>
    )
}

export default BookDetail
```

> pages/book 下新建 nextjs_tutorial.js ，那么当我们访问  /book/nextjs_tutorial 时，还是会自动导航到 nextjs_tutorial的页面下

### 嵌套动态路由

> 如果要访问  /book/1/review/10 这的两个动态路由

> 那么就需要 先在 pages 下新建，book 文件

> 然后再 book 下创建 [bookId] 的文件夹

> 然后再 [bookId] 下面新建 index.js 以防止  /book/1 还能够访问出来

> 然后再 [bookId] 下面新建 review 文件夹，再在 review 文件下面新建 [reviewId].js 的动态路由文件



### catch-all（守卫）路由

### 在UI元素之间实现导航

### 通过编程方式实现页面之间的导航
