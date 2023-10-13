---
# 取二三级标题生成目录
outline: [2,3]
---

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
## 创建项目

可以使用官方脚手架创建项目。默认使用js文件，截止当前使用的版本是Nextjs 13+。

```shell
npx create-next-app@latest
# or
yarn create next-app
```
更推荐的是使用typescript加持下的项目。有更好的开发体验和对项目更高的掌控力。

```shell
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
```
项目核心依赖库next、react、react-dom三个库。


可以看到，在创建新项目的过程中会询问几个选项：

项目名称，这里输入nextjs-demo。
项目是否需要使用ESLint。
是否需要在项目中使用src目录，默认会吧所有文件放在根目录，为了方便开发，这里启用src目录。
是否启用app目录，默认会放一些框架相关的东西。这里启用之后会在app目录中生成首页内容。
是否启用别名，方便使用，直接启用了。

## 项目介绍

1. .next目录。这是Nextjs的缓存目录，在执行dev或者build等命令的时候，会在本地项目的根目录下生成此目录，开发不需要关注。想要了解更多的可以稍微研究一下，使用缓存/已生成的方式加速编译。
2. .vscode目录。看名字就知道，这个是vscode编辑器使用到的配置目录。
3. node_modules目录。这是三方依赖的目录，这里不多介绍。
4. public目录。这个主要放置静态资源，默认没有二级目录，为了方便可以简单创建几个目录来放相关资源。默认路径是在根目录，使用的时候可以使用类似/favicon.ico的形式引用。
5. src目录。这个目录是主要源代码的位置，初始目录下有app默认页和pages其他页面目录。在pages目录下还有一个默认api目录，主要放置Nextjs提供的服务端API。可以简单看一下默认提供的hello.ts文件内容。
6. .eslintrc.json。主要是eslint的规则。
7. .gitignore。git排除文件。
8. next-env.d.ts。nextjs的一些ts相关内容，目前只有默认引用。
9. next.config.js。Nextjs的配置文件，这里默认只有appDir参数。
10. package-lock.json。项目依赖lock文件。
11. package.json。项目npm相关文件。
12. README.md。文档说明。
13. tsconfig.json。typescript相关配置文件

