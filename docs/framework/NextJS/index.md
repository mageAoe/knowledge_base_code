---
# 取二三级标题生成目录
outline: [2,3]
---

**注意：下面安装的是12版本，现在已经更新到13版本了**

```json
"dependencies": {
    "next": "13.5.4",
    "react": "18.2.0",
    "react-dom": "18.2.0"
},
```

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

> pages 下 新建 docs 文件夹，然后新建一个 特色文件  [...params].js 中间的名字可以随便取，但是前面的三个点必须带上

> 然后我们去 访问 /docs/params1/freature1 都会被 [...params].js路由给捕获


```js
// docs 后面的所有 路径都会进入到 params参数里面
import  { useRouter } from 'next/router'

function Doc(){
    const router = useRouter()
    const {params = [] } = router.query

    console.log(params);
    if(params.length === 2){
        return <h1>查看文档{params[0]}xxxx-的功能{params[1]}</h1>
    }else if(params.length === 1){
        return <h1>查看文档{params[0]}</h1>
    }
    return <h1>文档主页</h1>
}

export default Doc
```


### 在UI元素之间实现导航

```js
import Link from "next/link"

function Home(){
    return (
        <div>
            <h1>home page</h1>
            <Link href="/blog">博客</Link>
        </div>
    )
}

export default Home
```

> 导航动态路由跟回到主页

```js
import Link from "next/link"


function BookList(){
    return (
        <>
            <Link href="/">回到主页</Link>
            <h2>
                <Link href="/book/1">
                    完美世界
                </Link>
            </h2>
            <h2>斗罗大陆</h2>
            <h2>斗破苍穹</h2>
        </>
    )
}

export default BookList
```

> 替换当前历史

```js
<Link href="/book/2" replace>斗罗大陆 </Link>
```

### 通过编程方式实现页面之间的导航

```js
import { useRouter } from 'next/router'

function Home(){
    const router = useRouter()

    const handleClick = ()=>{
        router.push('/book')
    }

    return (
        <div>
            <h1>home page</h1>
            <button onClick={handleClick}>下单</button>
        </div>
    )
}

export default Home
```

### 自定义404页面

> 在pages下 新建 404.js 文件


## 预渲染和数据获取

### 预渲染

为什么需要预渲染？

- 预渲染可以提升性能
    - react应用，用户需要等待JavaScript加载
    - 可能需要通过外部API获取数据，然后再渲染UI
    - 用户有等待时间
    - 预渲染页面，HTML已经生成，加载更快
- 预渲染有助于SEO
    - 电商、博客网站关注SEO
    - react应用，搜索引擎只能看到```<div id='root'>```
    - 预渲染页面，搜索引擎可以看到source中所有内容，有助于索引页面


### 静态生成

- 构建时生成HTML的一种预渲染方法
- 构建应用时提前生成网页内容（HTML + 数据）
- 推荐使用的方法
- 一次构建，可缓存在CND上，客户端快速获取
- 场景： 博客，电商，文档，市场营销


### 数据获取并渲染

> 通过 异步的 ```getStaticProps```

```js
function UserList({users}){
    console.log(users);
    return (
        <div>
             <h1>UserList</h1>
             {
                users.map(item=>{
                    return (
                        <div key={item.id}>
                            <span>{item.name}</span>
                            <span>{item.email}</span>
                        </div>
                    )
                })
             }
        </div>
    )
}

export default UserList

export async function getStaticProps(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()

    return {
        props: {
            users:data
        }
    }
}
```

### 抽离组件跟页面

> pages 是一个页面的文件，里面有文件路由，所以组件我们 要在根文件下新建 components

- 组件

```js
function User({user}){
    return (
        <div>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
    )
}

export default User
```

- 页面

```js
import User from "../components/user";

function UserList({users}){
    console.log(users);
    return (
        <div>
             <h1>UserList</h1>
             {
                users.map(item=>{
                    return <User key={item.id} user={item}/>
                })
             }
        </div>
    )
}

export default UserList

export async function getStaticProps(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()

    return {
        props: {
            users:data
        }
    }
}
```

### getStaticProps 要点

- 要点一  
  - getStaticProps只在服务器端运行
  - 永远不会在客户端运行
  - getStaticProps 中的代码不会被包含在发送到客户端的JS bundle中

- 要点二
  - 可以在getStaticProps直接编写服务器端代码
  - 可通过FS模块访问文件系统，或者查询数据库
  - 可以包含API key等机密信息，不会被发送到客户端浏览器

- 要点三
  - 只适用于页面page，不能用于普通展示组件
  - 只适用与预渲染，不能用于客户端数据获取

- 要点四
  - getStaticProps必须返回一个对象，该对象必须包含在一个```props```键，并且它的值也是对象

- 要点五
  - getStaticProps是在build构建时运行的
  - 在开发模式下，每个请求都会触发getStaticProps的执行

### 使用动态参数的SSG

> 在 pages 下新建 post 文件夹，然后在post文件夹下新建 index.js [postId].js 两个文件

- index.js

```js
import Link from 'next/link'

function PostList({posts}){
    return (<>
      <h1>帖子列表</h1>
      {
        posts.map(item=>{
          return (
            <div key={item.id}>
              <Link href={`post/${item.id}`}>
                <h2>{item.id} - {item.name}</h2>
              </Link>
            </div>
          )
        })
      }
    </>)
    
}

export default PostList

export async function getStaticProps(){
    const response = await fetch('http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome')
    const data = await response.json()

    console.log(data);

    return {
        props: {
            posts: data.data
        }
    }
}
```

- [postId].js
> 使用动态路由时 getStaticProps 可以导出一个参数 
> getStaticPaths 是必须要写的，不然会报错

```js
function Post({ data }){

    return (
        <>  
            <h1>{data.total}</h1>
            <h2>{data.data[0].id} - {data.data[0].tag}</h2>
            <p>{data.data[0].img_1600_900}</p>
        </>
    )
}

export default Post

export function getStaticPaths(){
    return {
        paths: [
            {
                params: {postId: '6'}
            },
            {
                params: {postId: '36'}
            },
            {
                params: {postId: '9'}
            }
        ],
        fallback: false
    }
}

export async function getStaticProps(context){
    const { params } = context

    const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${params.postId}&start=1&count=20&from=360chrome`
    const response = await fetch(url)
    const data = await response.json()

    return {
        props: {
            data
        }
    }
}
```

### 完善 getStaticPaths功能

- [postId].js

```js
function Post({ data }){

    return (
        <>  
            <h1>{data.total}</h1>
            <h2>{data.data[0].id} - {data.data[0].tag}</h2>
            <p>{data.data[0].img_1600_900}</p>
        </>
    )
}

export default Post

export async function getStaticPaths(){

    const response = await fetch('http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome')
    const data = await response.json()

    const paths = data.data.map(item=>{
        return {
            params: {postId: item.id}
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const { params } = context

    const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${params.postId}&start=1&count=20&from=360chrome`
    const response = await fetch(url)
    const data = await response.json()

    return {
        props: {
            data
        }
    }
}
```

### fallback: false

> 要点
> 1. 从 getStaticPaths 返回的路径，会在构建时通过 getStaticProps 函数渲染为html
> 2. 任何不是从这个 getStaticPaths 返回的路径都会导致返回404页面

> 返回场景： 1. 需要预渲染的路径较少    2. 不经常添加新页面

### fallback: true
> 要点

> 1. 由` getStaticPath`返回的路径，会在构建时由`getStaticProps渲染为HTML。
> 2. 构建时未生成的页面在运行时并不会产生404页面。相反，‘Next.js`会在第一次请求该路径的时候，返回页面的后备`fallback`版本。
> 3. 在后台，Next.js会静态生成和请求路径相对应的内的和JSON。包括运行'`'getStaticProps'。
> 4. 完成后，浏览器会接收到和路径对应的JSON。它将被用于渲染带有props属性的页面。从用户的角度看，页面会从后备版本切换到完整版本。
> 5. 同时，Next.js会跟踪已渲染的新页面列表。对同一路径的后续请求将直接返回生成的页面，就像其它在构建时渲染的页面一样。

> 使用场景：

> 那么在哪些场景下我们该将这个fallback设为true呢?如果你的应用程序有大量依赖于数据的静态页面，那么设为true是合适的。比方说，对于一个大型电商网站，如果你想要所有的产品页面是预渲染的，但是如果你有几千个产品，构建可能会花费很长的时间。这种情况下，你可以静态生成一小部分流行的产品，对于剩余的产品则将fallback设为true。当用户向某个尚未生成的页面发起请求时，那么他会看到一个具有加载指示的页面。在getStaticProps完成以后，对应的页面就可以使用下载下来的数据进行预渲染。之后，所有请求同一个页面的用户都会得到静态预渲染的页面。这样做一方面可以确保用户体验，同时还具有快速构建和静态生成的好处。【文

- [postId].js

```js
import { useRouter } from 'next/router'

function Post({ data }){

    // 对于没有在 getStaticPaths 返回数组里面的参数，会动态生成并加载出来
    const router = useRouter()
    if(router.isFallback){
        return <h1>加载中...</h1>
    }
    return (
        <>  
            <h1>{data.total}</h1>
            <h2>{data.data[0].id} - {data.data[0].tag}</h2>
            <p>{data.data[0].img_1600_900}</p>
        </>
    )
}

export default Post

export async function getStaticPaths(){
    return {
        paths: [
            {
                params: {postId: '6'}
            },
            {
                params: {postId: '36'}
            },
            {
                params: {postId: '9'}
            }
        ],
        fallback: true
    }
}

export async function getStaticProps(context){
    const { params } = context

    const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${params.postId}&start=1&count=20&from=360chrome`
    const response = await fetch(url)
    const data = await response.json()

    if(!data.data){
        return {
            notFound: true // nextjs 会自己定位到 404页面中
        }
    }

    return {
        props: {
            data
        }
    }
}
```

### fallback = blocking

> fallback = blocking

> 1. 由getStaticPaths返回的路径，会在构建时由getStaticProps渲染为HTML。
> 2. 访问不在构建时生成的路径不会导致404页面。相反，在第一次请求时，Next. j s会在服务器端渲染页面，并返回生成的HTML。
> 3. 在服务器端渲染完成后，浏览器会接收到和请求路径对应的HTML。用户所看到的，浏览器会从页面被请求到完整页面被加载。这中间没有加载中，或者后备状态。
> 4. 之后，Next. js会跟踪新的预渲染的页面，对同一路径的后续请求，服务器会直接返回生成的页面，就像和构建时预渲染的页面一样。


## 增量静态生成

### 为什么需要增量静态再生成

> 静态生成
* 静态生成是一种预渲染技术，它在构建时生成HTML。
* 预渲染出来的静态页面可以缓存在CDN上，可以被遍布全球的用户快速访问到。*静态内容不仅快，而且还有助于SEO，因为可以被搜索引擎快速索引。
* 静态生成使用getStaticProps获取数据，使用getStaticPaths动态生成页面，适用于各种生产级应用场景。

> 静态生成的问题
* 构建所需时间和页面数量成正比。
* 一个页面一旦生成，在重新构建之前，它可能包含陈旧的数据。

> 构建时间问题
* 构建时间和页面的数量成正比。


> 陈旧数据的问题
 - 如果应用不经常构建，那么构建时间长一点也不是问题?
 - 这时候可能会碰到过期数据的问题。
 - 电商应用通常不是部署一次就完事的，产品详情，尤其是价格，可能每天都会变化。重新构建整个应用，让更新的数据重新静态生成。

> getStaticPaths可以解决问题吗?
* 在构建时预渲染—些页面，剩下的页面在请求时即时生成
* 能否先只生成100个最流行的商品的页面，剩下的99,000个页面在请求时即时生成
* 如果你的应用90%是静态页面，10%是动态页面，那么getStaticPaths没有帮助*电商网站通常90%是动态页面，10%是静态页面，所以使用`getstaticPaths`可以减少总的构建时间
* 但是它仍未解决陈旧数据的问题
* 如果你在构建时生成1000个页面，然后剩下的页面在请求时，通过使用fallback= true或者fallback = 'blocking'即时生成，那么对后台数据的更新，并不会更新已经预渲染出来的页面

> 增量静态生成
* 需求:只更新后台数据发生变化的部分页面，而不需要更新整个应用。

> 增量静态生成ISR
* 有了ISR之后，即便在你构建了应用之后，Next.js仍然可以帮你更新静态页面。
* 它可以静态生成单个页面，无需重新构建整个应用，这样可以有效解决成旧数据问题。

### ISR 设置

#### 增量静态重新生成
* 只需要更新那些需要更改的页面，而不必重建整个应用程序。
> 冰增量静态重新生成**
* 只要能做到可以静态生成单个页面，而不需要重新构建整个应用，这样就可以解决老旧数据的问题
* 使用(Incremental Static Regeneration，ISR)，它让应用在构建之后，仍然可以更新静态页面
> 如何实现?
* 在getStaticProps函数中，除了`props `键，我们可以指定一个`revalidate`键
* revalidate`的值表示多少秒以后开始重新生成页面

#### 再生成

* 只有在过了revalidate时间之后，用户发起请求的时候，再生成( re-generation)才会被触发
* 如果一个用户访问了产品页，但是之后一整天都没有用户再访问那个页面，那么再生成就不会发生。
* revalidate并不是说页面在每隔10秒时会自动再生成
* 它只是表明，在revalidate时间之后，如果有用户做了一次请求，那么后台必须发起一次再生成。
* 再生成可能会失败，第么再下个再生成成功之前，`next.js `会继续使用之前缓存的html页面。



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

