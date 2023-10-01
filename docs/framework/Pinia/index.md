# Pinia

## introduction

Pinia.js 有如下特点：

- 完整的 ts 的支持；
- 足够轻量，压缩后的体积只有1kb左右;
- 去除 mutations，只有 state，getters，actions；
- actions 支持同步和异步；
- 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个store都是独立的
- 无需手动添加 store，store 一旦创建便会自动添加；
- 支持Vue3 和 Vue2

官方文档[Pinia](https://pinia.vuejs.org/)

git 地址 https://github.com/vuejs/pinia

## 起步 安装

```
yarn add pinia
 
npm install pinia
```

## 引入注册Vue3

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
 
const store = createPinia()
let app = createApp(App)
 
app.use(store)
 
app.mount('#app')
```

Vue2 使用

```typescript
import { createPinia, PiniaVuePlugin } from 'pinia'
 
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
 
new Vue({
  el: '#app',
  // other options...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
})
```

## 初始化仓库Store

**1.新建一个文件夹Store**

```
import { defineStore } from 'pinia'
```

**2.新建文件[name].ts**

**3.定义仓库Store**

**4.我们需要知道存储是使用定义的`defineStore()`，并且它需要一个唯一的名称，作为第一个参数传递**

我这儿名称抽离出去了

新建文件store-namespace/index.ts

```typescript
export const enum Names {
    Test = 'TEST'
}
```

store 引入

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'
 
export const useTestStore = defineStore(Names.Test, {
 
})
```

**5.定义值**

**State 箭头函数 返回一个对象 在对象里面定义值**

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespce'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     }
})
```

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespce'
 
export const useTestStore = defineStore(Names.Test, {
     state:()=>{
         return {
             current:1
         }
     },
     //类似于computed 可以帮我们去修饰我们的值
     getters:{
 
     },
     //可以操作异步 和 同步提交state
     actions:{
 
     }
})
```

## State

### 1.State 是允许直接修改值的 例如current++

```typescript
const Test = useTestStore()
const Add = () => {
    Test.current++
}
```

### 2.批量修改State的值

在他的实例上有$patch方法可以批量修改多个值

```typescript
const Add = () => {
    Test.$patch({
       current:200,
       age:300
    })
}
```

### 3.批量修改函数形式

推荐使用函数形式 可以自定义修改逻辑

```typescript
const Add = () => {
    Test.$patch((state)=>{
       state.current++;
       state.age = 40
    })
}
```

### 4.通过原始对象修改整个实例

`$state`您可以通过将store的属性设置为新对象来替换store的整个状态

缺点就是必须修改整个对象的所有属性

```typescript
const Add = () => {
    Test.$state = {
       current:10,
       age:30
    }    
}
```

### 5.通过actions修改

定义Actions

在actions 中直接使用this就可以指到state里面的值

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
     state:()=>{
         return {
            current:1,
            age:30
         }
     },
 
     actions:{
         setCurrent () {
             this.current++
         }
     }
})
```

```typescript
<template>
     <div>
         <button @click="Add">+</button>
          <div>
             {{Test.current}}
          </div>
          <div>
            {{Test.age}}
          </div>
     </div>
</template>
 
<script setup lang='ts'>
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.setCurrent()
}
</script>
```

## 解构store

在Pinia是不允许直接解构是会失去响应性的

```typescript
const Test = useTestStore()
 
const { current, name } = Test
 
console.log(current, name);
```

差异对比

修改Test current 解构完之后的数据不会变

而源数据是会变的

```typescript
<template>
  <div>origin value {{Test.current}}</div>
  <div>
    pinia:{{ current }}--{{ name }}
    change :
    <button @click="change">change</button>
  </div>
</template>
  
<script setup lang='ts'>
import { useTestStore } from './store'
 
const Test = useTestStore()
 
const change = () => {
   Test.current++
}
const { current, name } = Test
 
console.log(current, name);
</script>

```

**解决方案可以使用 storeToRefs**

```typescript
import { storeToRefs } from 'pinia'
 
const Test = useTestStore()
 
const { current, name } = storeToRefs(Test)
```

## Actions，getters

### Actions（支持同步异步）

1.同步 直接调用即可

```typescript
actions: {
    increment() {
        this.counter++
    },
    randomizeCounter() {
        this.counter = Math.round(100 * Math.random())
    },
}
```

```typescript
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.randomizeCounter()
}
```

2.异步 可以结合async await 修饰

```typescript
type Result = {
    name: string
    isChu: boolean
}
 
const Login = (): Promise<Result> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: '小满',
                isChu: true
            })
        }, 3000)
    })
}

actions: {
    async getLoginInfo() {
        const result = await Login()
        this.user = result;
    }
}
```

template

```typescript
import {useTestStore} from './store'
const Test = useTestStore()
const Add = () => {
     Test.getLoginInfo()
}
```

3.多个action互相调用getLoginInfo setName

```typescript
    state: () => ({
        user: <Result>{},
        name: "default"
    }),
    actions: {
        async getLoginInfo() {
            const result = await Login()
            this.user = result;
            this.setName(result.name)
        },
        setName (name:string) {
            this.name = name;
        }
    },
```

### getters

1.使用箭头函数不能使用this this指向已经改变指向undefined 修改值请用state

主要作用类似于computed 数据修饰并且有缓存

```typescript
getters:{
   newPrice:(state)=>  `$${state.user.price}`
}
```

2.普通函数形式可以使用this

```typescript
getters:{
   newCurrent ():number {
       return ++this.current
   }
}
```

3.getters 互相调用

```typescript
getters:{
   newCurrent ():number | string {
       return ++this.current + this.newName
   },
   newName ():string {
       return `$-${this.name}`
   }
}
```

## API

### 1.$reset

重置`store`到他的初始状态

```typescript
state: () => ({
     current:1
}),
```

Vue 例如我把值改变到了10

```typescript
const change = () => {
     Test.current++
}
```

调用$reset();

将会把state所有值 重置回 原始状态

### 2.订阅state的改变

类似于Vuex 的abscribe  只要有 store的 state 变化就会走这个函数

```typescript
Test.$subscribe((args,state)=>{
   console.log(args,state);
})
```

第二个参数

如果你的组件卸载之后还想继续调用请设置第二个参数

```typescript
Test.$subscribe((args,state)=>{
   console.log(args,state);  
},{
  detached:true
})
```

## 订阅Actions的调用

只要有actions被调用就会走这个函数

```typescript
Test.$onAction((args)=>{
   console.log(args); 
})
```

## :strawberry: 开发中遇到的问题

> 报错：getActivePinia was called with no active Pinia. Did you forget to install pinia?

原因：是pinia在main.ts中还未注册好，便在其他文件中使用了它。

**解决方案**

在store目录中单独创建一个index.ts：

```ts
import { createPinia } from 'pinia';
const pinia = createPinia();
export default pinia;
```

接着在main.ts 引入该文件，用来注册pinia：

```ts
// xxxxx省略无关代码xxxxxxx
 
import pinia from "@/store/store"
app.use(pinia)
 
// xxxxx省略无关代码xxxxxxx
```

router、axios等其他外部js中使用时，需要重新导入创建pinia实例才行：

```ts
import pinia from '@/store/store' 
import { loginStore} from "@/store/loginStore"
const store = loginStore(pinia)
 
// store可以在本文件中随意使用
console.log(store)
```

这样做，浏览器控制台不报错了，页面也可以正常加载，路由切换时，控制台会输出当前 *counter* 的值。

但是如果刷新浏览器，*counter* 的值又被初始化为 0，貌似前面设置的持久化插件 *pinia-plugin-persistedstate* 失效了

pinia 官网的方案

`就是不要用全局，当需要时再使用`，当时之所以在路由拦截里全局使用是为了避免频繁创建store，出现这个错误后我把GlobalStore使用位置放在里路由拦截函数内部，这样就避免上面问题出现

```tsx
router.beforeEach((to, from, next) => {
	const store = useStore()
	if(to.mete.requiresAuth && !store.isLoggedIn)return '/login'
})
```

## 一些补充

1. 安装 *pinia* 依赖：

```tsx
yarn add pinia
```

2. 创建 pinia 实例（根存储 root store）：

之前咱是在 *main.ts* 中创建的，现将其抽取到独立的文件中：

*src/store/index.ts：*

```tsx
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

3. 在 *main.ts* 中以插件的方式传递给 *App* 实例。

```tsx
...
import pinia from '@/store'
...
app.use(pinia)
...
```

4. 在 *store/* 目录下创建 *modules* 目录，存储每个模块的状态，将之前的 demo.ts 移动到 *store/modules/*中。这里使用最新的 *Composition API setup* 的方式来定义状态。

*src/store/modules/demo.ts：*

```tsx
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDemoStore = defineStore('demo', () => {
  const counter = ref(0)

  const increment = () => {
    counter.value++
  }

  return {
    counter,
    increment
  }
})

export default useDemoStore
```

5. 在组件 *about.vue* 中使用 *demo* 中的状态 *counter* 和改变状态的函数 *increment*。代码和之前一样。

先引入 *demo.ts* 中定义的 *useDemoStore* 函数，通过该函数创建 *demoStore* 实例。然后就可以调用*demoStore*的状态 *counter* 和 *increment* 函数了。这里需要注意，无论是 *pinia* 还是 *vuex*，通过解构的方式获取状态，会导致状态失去响应性。如：

```tsx
const { counter } = demoStore
```

此时的 counter 会丢失响应性，当其值改变时，其他组件不会监听到。所以 *pinia* 提供了 *storeToRefs* 函数，使其解构出来的状态仍然具备响应性。

```tsx
const { counter } = storeToRefs(demoStore)
```

src/views/about.vue 完整代码如下：

```vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>counter: {{counter}}</h3>
    <el-button @click="add">
      <el-icon-plus></el-icon-plus>
    </el-button>
</template>

<script lang="ts" setup>
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()
const { counter } = storeToRefs(demoStore)

const add = () => {
  demoStore.increment()
}
</script>
```

##  持久化 pinia 状态

### 为什么需要持久化 pinia 状态

在上面的 demo 中，假设计数器加到 5，如果刷新浏览器，*counter* 的值又会被初始化为 0。这是因为状态是存储在浏览器内存中的，刷新浏览器后，重新加载页面时会重新初始化 *vue*、 *pinia*，而 *pinia* 中状态的值仅在内存中存在，而刷新导致浏览器存储中的数据没了，所以 *counter* 的值就被初始化为 0。

在实际开发中，浏览器刷新时，有些数据希望是保存下来的。如用户登录后，用户信息会存储在全局状态中，如果不持久化状态，那么每次刷新用户都需要重新登录了。

要解决这个问题非常简单，在状态改变时将其同步到浏览器的存储中，如*cookie*、*localStorage*、 *sessionStorage* 。每次初始化状态时从存储中去获取初始值即可。

说起来思路很简单，可真正实现起来就各种问题了，所以咱们就使用 *pinia* 的插件 *pinia-plugin-persistedstate* 来实现。

### pinia-plugin-persistedstate

1. 安装依赖：

```tsx
yarn add pinia-plugin-persistedstate
```

2. 引入该插件，在创建 pinia 实例时传入该插件

*src/store/index.ts：*

```tsx
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
```

3. 在需要持久化状态的模块中设置 persist。咱假设 demo 模块需要对状态需要持久化，defineStore 第一个参数定义唯一的模块名，第二个参数传递 setup，其实还有第三个参数 options，在 options 中便可开启 persist：

*src/store/modules/demo.ts：*

```tsx
...
const useDemoStore = defineStore('demo', () => {
  ...
}, {
  persist: true
})
```

此时改变 *counter* 的值后，刷新浏览器，*counter* 不会被重置为 0，仍然停留在刷新前的状态。

*persist* 支持多种类型的值，最简单的就是传递 *true*，此时会将状态缓存在 *localStorage* 中，该 localStorage 的 *key* 为模块名（*defineStore* 的第一个参数）,value 为该模块的状态对象，由于该模块只有一个状态 *counter*，故value为 *{"counter":8}*。如下图：

**如果需要将其存储在 *sessionStorage* 中，就需要设置 *persist* 的值为一个对象：**

```tsx
...
const useDemoStore = defineStore('demo', () => {
  ...
}, {
  persist: {
    key: 'aaa',
    storage: sessionStorage
  }
})
```

此时状态就会同步缓存到 *sessionStorage* 中，并且*key* 为咱们指定的 *key：*

*persist* 对象类型为 *PersistedStateOptions，*上面演示了 *key* 和 *storage* 属性，该对象的其他属性如下：

```tsx
interface PersistedStateOptions {
    /**
     * Storage key to use.
     * @default $store.id
     */
    key?: string;
    /**
     * Where to store persisted state.
     * @default localStorage
     */
    storage?: StorageLike;
    /**
     * Dot-notation paths to partially save state. Saves everything if undefined.
     * @default undefined
     */
    paths?: Array<string>;
    /**
     * Customer serializer to serialize/deserialize state.
     */
    serializer?: Serializer;
    /**
     * Hook called before state is hydrated from storage.
     * @default null
     */
    beforeRestore?: (context: PiniaPluginContext) => void;
    /**
     * Hook called after state is hydrated from storage.
     * @default undefined
     */
    afterRestore?: (context: PiniaPluginContext) => void;
}
```

## 在路由守卫中使用状态

1. 安装 *nprogress*

```tsx
yarn add nprogress
yarn add @types/nprogress -D 
```

2. 创建全局路由守卫

*src/router/guard/index.ts：*

```tsx
import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false
})

// 全局前置守卫
router.beforeEach((to, from) => {
  nProgress.start()
  return true
})

// 全局后置钩子
router.afterEach(() => {
  nProgress.done(true)
})
```

*3.* 在 *main.ts* 中引入全局路由守卫：

```tsx
...
import '@/router/guard/index'
...
```

实际开发中，路由切换时，可能需要从全局状态中获取 *token* 等信息，判断是否能进入下一个页面。这里演示路由切换时获取 *demo* 中的 *counter* 的值。

首先试试在钩子函数外面使用全局状态：

```tsx
...
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'
...

const demoStore = useDemoStore()
const { counter } = storeToRefs(demoStore)

// 全局前置守卫
router.beforeEach((to, from) => {
  nProgress.start()
  // 从 store 中获取其他值，再决定返回值
  // 这里演示获取 store 中 counter 的值
  console.log(`counter：${counter}`)
  return true
})
...
```

此时浏览器控制台会报如下错误，这是因为 pinia 还没有挂载到 app 上。

**正确的处理方式**

```tsx
import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useDemoStore from '@/store/modules/demo'
import { storeToRefs } from 'pinia'

nProgress.configure({
  showSpinner: false
})

// 全局前置守卫
router.beforeEach((to, from) => {
  nProgress.start()

  const demoStore = useDemoStore()
  const { counter } = storeToRefs(demoStore)
  // 从 store 中获取其他值，再决定返回值
  // 这里演示获取 store 中 counter 的值
  console.log(`counter：${counter.value}`)
  return true
})

// 全局后置钩子
router.afterEach(() => {
  nProgress.done(true)
})
```