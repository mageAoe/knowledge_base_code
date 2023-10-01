# VUE3

## VUE3.0

> 安装 ： npm init vue@latest
>
> vite ： npm init vite@latest

## 挂载 第三方库

- 以**echarts**为例

vue3中使用Provide/Inject依赖注入，将替代vue2中在原型链上挂载一些属性

```js
// 依赖注入
import { provide } from 'vue'
import * as echarts from 'echarts'

provide('echarts', echarts)


<!--使用-->
import { inject } from "vue";
let $echarts = inject('echarts')

console.log($echarts);
```

## Ref & reactive得区别

- Ref 是简单得基本类型
- reactive 为复杂数据类型

## V-memo

## 虚拟DOM

直接操作DOM非常消耗性能，所以出现虚拟DOM，直接操作js生成AST节点树

## isRef 、 shallowRef、triggerRef、customRef

> isRef 判断当前 变量是否是ref包裹

> shallowRef  当不是响应式时，可以将它变成一个响应式，可以节省性能
>
> shllowRef 不是响应式得，是不会触发视图更新的，但是ref得更新会触发shallowRef得更新变化，因为ref会触发tirggerRef得函数执行

```js
const message = shallowRef({ name: "haha" })
const changeMsg = () => {
  message.value = { name: "heihei" }; // 单独修改name是不具有响应式的
  console.log(isRef(message)); // true
};
```

> triggerRef 可以跟上面的shallowRef配合使用，可以强行更新DOM

```js
const message = shallowRef({ name: "haha" });
const changeMsg = () => {
  message.value.name = "heihei";
  triggerRef(message);
};

```

> 类似自定义的ref

```js

function MyRef<T>(value: T) {
  return customRef((trank, trigger) => {
    return {
      get() {
        trank();
        return value;
      },
      set(newVal) {
        value = newVal;
        trigger();
      },
    };
  });
}
const message = MyRef<string>("haha");
const changeMsg = () => {
  message.value = "heihei";
};

```

## reactive

> 接收复杂类型数据，不能直接赋值成另一个对象，这样会破化它的响应式

```js
let message = reactive<number[]>([])
setTimeout(() => {
  let arr = [1,2,3,4] // 不能使用这种方法赋值，要使用push message.push(...arr)
  message = arr
}, 1000);
<div>{{ message }}</div>  // []
```

> 也可以使用一个对象，里面嵌套一个数组

```typescript
type O = {
  list:number[]
}
let message = reactive<O>({list:[]})
setTimeout(() => {
  message.list = [1,2,3,4,5]
}, 1000);
```

## readonly、shallowReactive 

> readonly: 拷贝一份proxy对象将其设置为只读

```js
import { reactive ,readonly} from 'vue'
const person = reactive({count:1})
const copy = readonly(person)
 //person.count++
 copy.count++
```

> shallowReactive 只能对浅层的数据 如果是深层的数据只会改变值 不会改变视图
>
> 再dom挂在之前，直接调用方法改变数据是会生效得，但是dom挂在完后再操作 ，深层得数据不会改变视图

## toRef 、toRefs 、toRaw

> toRef  如果原始对象是非响应式的就不会更新视图 数据是会变的
>
> 如果原始对象是响应式的是会更新视图并且改变数据的

> toRefs  可以帮我们批量创建ref对象主要是方便我们解构使用

```js
import { reactive, toRefs } from 'vue'
const obj = reactive({
   foo: 1,
   bar: 1
})
 
let { foo, bar } = toRefs(obj)
 
foo.value++
console.log(foo, bar);
```

> toRaw 将响应式对象转化为普通对象

## computed

- 函数形式

```js
import { computed, ref } from 'vue'
let price = ref(0)//$0
 
let m = computed<string>(()=>{
   return `$` + price.value
})
 
price.value = 500
```

- 对象形式

```js
<template>
   <div>{{ mul }}</div>
   <div @click="mul = 100">click</div>
</template>
 
<script setup lang="ts">
import { computed, ref } from 'vue'
let price = ref<number | string>(1)//$0
let mul = computed({
   get: () => {
      return price.value
   },
   set: (value) => {
      price.value = 'set' + value
   }
})
</script>
```

## watch

> watch第一个参数[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)源
>
> watch第二个参数回调函数cb（newVal,oldVal）
>
> watch第三个参数一个options配置项是一个对象{
>
> immediate:true //是否立即调用一次
>
> deep:true //是否开启[深度](https://so.csdn.net/so/search?q=深度&spm=1001.2101.3001.7020)监听
>
> }

- 监听多个ref 注意变成数组啦

```js
import { ref, watch ,reactive} from 'vue'
let message = ref('')
let message2 = ref('')
watch([message,message2], (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

- 使用reactive监听深层对象开启和不开启deep 效果一样

```js
import { ref, watch ,reactive} from 'vue'
 
let message = reactive({
    nav:{
        bar:{
            name:""
        }
    }
})
watch(message, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

- 监听reactive 单一值 ，也是可以的

```js
import { ref, watch ,reactive} from 'vue'
 
let message = reactive({
    name:"",
    name2:""
})
watch(()=>message.name, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})
```

- *侦听一个 getter*

```js
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

```

- 如果我们想侦听 `props` 上的属性变化，需要采用**第一种**写法

```js
// 假设 props 上有个 name 属性
// 下面的写法会生效
watch(
  () => props.name,
  (count, prevCount) => {
    /* ... */
  }
)
 
// 下面的写法不会被触发
watch(props.name, (count, prevCount) => {
  /* ... */
})
```

## **watchEffect**

> 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
>
> 如果用到message 就只会[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)message 就是用到几个监听几个 而且是非惰性 会默认调用一次

```js
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect(() => {
    //console.log('message', message.value);
    console.log('message2', message2.value);
})
```

- 清除副作用

就是在触发监听之前会调用一个函数可以处理你的逻辑例如防抖

```js
import { watchEffect, ref } from 'vue'
let message = ref<string>('')
let message2 = ref<string>('')
 watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{
        
    })
    console.log('message2', message2.value);
})
```

**停止跟踪 watchEffect 返回一个函数 调用之后将停止更新**

```js
const stop =  watchEffect((oninvalidate) => {
    //console.log('message', message.value);
    oninvalidate(()=>{
 
    })
    console.log('message2', message2.value);
},{
    flush:"post",
    onTrigger () {
 
    }
})
stop()
```

> 副作用刷新时机 flush 一般使用post

|          | pre                | sync                 | post               |
| :------- | :----------------- | :------------------- | ------------------ |
| 更新时机 | 组件**更新前**执行 | 强制效果始终同步触发 | 组件**更新后**执行 |

## 生命周期

onBeforeMount()

在组件DOM实际渲染安装之前调用。在这一步中，根元素还不存在。

onMounted()

在组件的第一次渲染后调用，该元素现在可用，允许直接DOM访问

onBeforeUpdate()

数据更新时调用，发生在虚拟 DOM 打补丁之前

updated()

DOM更新后，`updated`的方法即会调用

onBeforeUnmount()

在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。

onUnmounted()

卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载

## 父子组件传参

父组件通过v-bind绑定一个数据，然后子组件通过defineProps接受传过来的值

如以下代码

给*dddd*组件 传递了一个title [字符串](https://so.csdn.net/so/search?q=字符串&spm=1001.2101.3001.7020)类型是不需要v-bind

```js
<template>
  <dddd title="我是父组件传递过来的值"></dddd>
</template>
```

传递非字符串类型需要加v-bind 简写 冒号

子组件接受值

通过defineProps 来接受 **defineProps是无须引入的直接使用即可**

如果我们使用的TypeScript

可以使用传递字面量类型的纯类型语法做为参数

如 这是TS特有的

```js
<template>
    <div class="dddd">
        菜单区域 {{ title }}
    </div>
</template>
 
<script setup lang="ts">
defineProps<{
    title:string
}>()
// 也可以这样写 || 是相等得
 type props = {
     title:string
 }
 defineProps<props>()   
</script>
```

如果你使用的不是TS

```js
defineProps({
    title:{
        default:"",
        type:string
    },
    data:Array
})
```

TS 特有的默认值方式

withDefaults是个函数也是无须引入开箱即用接受一个props函数第二个参数是一个对象设置默认值

```typescript
type Props = {
    title?: string,
    data?: number[]
}
withDefaults(defineProps<Props>(), {
    title: "张三",
    data: () => [1, 2, 3]
})
```

### 子组件给父组件传参

是通过defineEmits派发一个事件

```js
const list = reactive([6,6,6])
const emit = defineEmits(['on-click'])
const clickTap = ()=>{
  emit('on-click',list)
}
```

我们在子组件绑定了一个click 事件 然后通过defineEmits 注册了一个自定义事件

点击click 触发 emit 去调用我们注册的事件 然后传递参数

父组件接受子组件的事件

```js
  <dddd title="我是父组件传递过来的值" :data="list" @on-click="getList"></dddd>
  const getList = (list:number[])=>{
  		console.log(list);
  }
```

### **子组件暴露给父组件内部属性**

通过defineExpose

我们从父组件获取子组件实例通过ref

```js
 <Menu ref="menus"></Menu>
  const menus = ref(null)
```

这时候父组件想要读到子组件的属性可以通过 defineExpose暴露

```js
const list = reactive<number[]>([4, 5, 6])
// 也可以放回方法
const count = ()=>{
    return list
}
defineExpose({
    list,
    count
})
```

### 父组件调用v-for子组件的方法(一)

```vue
子组件 --------------------------->
<template>
	<div> {{name}} </div>
</template>
<script setup>
import { defineExpose, ref } from 'vue'
const name = ref('')
const handle = (val) => { // 要触发的子组件的事件
	name.value = val
}
defineExpose({
	handle
})
</script>

父组件---------------------------->
<template>
	<div> 
		<template v-for="item in list">
			<child :ref="childRef"/> // 此处的ref要加冒号
		</template>
		<el-button @click="childHandle">点击事件</el-button>
	</div>
</template>
<script setup>
import { ref } from 'vue'
const list = ref([1,2,3,4,5])
const childRefList = ref([])
const annoListRef = (el) => {
	childRefList.value.push(el)
}
const childHandle = (val) => {
	childRefList.value.map(item => {
	    console.log(item) // 打印效果在下方
	    item.handle('我是传递的数据')
  	})
}
</script>

```

### 父组件调用v-for子组件的方法(二)

```vue
子组件 --------------------------->
<template>
	<div> {{name}} </div>
</template>
<script setup>
import { defineExpose, ref, reactive } from 'vue'
const name = ref('')
const handle = (val) => { // 要触发的子组件的事件
	name.value = val
}
defineExpose({
	handle
})
</script>

父组件---------------------------->
<template>
	<div> 
		<template v-for="item in list">
			<child :ref="(el) => childRef(el, item.key)"/> // 此处的ref要加冒号
		</template>
	</div>
</template>
<script setup>
import { ref } from 'vue'
const list = reactive([
  {key:1, name: '第一个'},
  {key:2, name: '第二个'},
  {key:3, name: '第三个'},
  {key:4, name: '第四个'},
])
const childRefList = reactive({})
const childRef = (el, key) => {
  if (el) childRefList[key] = el
  Object.keys(childRefList).forEach(item => {
    if (item != 4) { // typeof item => String
      childRefList[item].handle('更改后的名字')
    }
  })
}

</script>

```



## 配置递归组件

> 1. 自己引入自己,如果自己在Tree 文件目录下，那么久import TreeItem from './index.vue'
> 2. 就是再写一个script 标签，然后给它一个name TreeItem

## 动态组件

什么是动态组件 就是：让多个组件使用同一个[挂载](https://so.csdn.net/so/search?q=挂载&spm=1001.2101.3001.7020)点，并动态切换，这就是动态组件

在挂载点使用[component](https://so.csdn.net/so/search?q=component&spm=1001.2101.3001.7020)标签，然后使用v-bind:is=”组件”

```js
import A from './A.vue'
import B from './B.vue'
<component :is="A"></component>
```

<span style='color:red'>注意事项 </span>

<span style='color:red'>1.在Vue2 的时候is 是通过组件名称切换的 在Vue3 setup 是通过组件实例切换的</span>

<span style='color:red'>2.如果你把组件实例放到Reactive Vue会给你一个警告runtime-core.esm-bundler.js:38 [Vue warn]: Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`. 
Component that was made reactive: </span>

<span style='color:red'>这是因为reactive 会进行proxy 代理 而我们组件代理之后毫无用处 节省性能开销 推荐我们使用shallowRef 或者  markRaw 跳过proxy 代理</span>

```js
const tab = reactive<Com[]>([{
    name: "A组件",
    comName: markRaw(A)
}, {
    name: "B组件",
    comName: markRaw(B)
}])
```

## 插槽slot

### 匿名插槽

1.在子组件放置一个插槽

```vue
<template>
    <div>
       <slot></slot>
    </div>
</template>
```

父组件使用插槽

在父组件给这个插槽填充内容

```js
<Dialog>
   <template v-slot>
       <div>2132</div>
   </template>
</Dialog>
```

### 具名插槽

具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中

```html
<div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
</div>
```

父组件使用需对应名称

```js
<Dialog>
    <template v-slot:header>
       <div>1</div>
   </template>
   <template v-slot>
       <div>2</div>
   </template>
   <template v-slot:footer>
       <div>3</div>
   </template>
</Dialog>
```

插槽简写

```js
<Dialog>
    <template #header>
       <div>1</div>
   </template>
   <template #default>
       <div>2</div>
   </template>
   <template #footer>
       <div>3</div>
   </template>
</Dialog>
```

### 作用域插槽

在子组件动态绑定参数 派发给父组件的slot去使用

```js
<div>
    <slot name="header"></slot>
    <div>
        <div v-for="item in 100">
            <slot :data="item"></slot>
        </div>
    </div>

    <slot name="footer"></slot>
</div>
```

通过结构方式取值

```js
 <Dialog>
    <template #header>
        <div>1</div>
    </template>
    <template #default="{ data }">
        <div>{{ data }}</div>
    </template>
    <template #footer>
        <div>3</div>
    </template>
</Dialog>
```

### 动态插槽

```vue
<Dialog>
    <template #[name]>
        <div>
            23
        </div>
    </template>
</Dialog>
```

```js
const name = ref('header')
```

## 异步组件&代码分包&suspense

### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积

这时候就可以使用异步组件

### 顶层 `await`

```js
在setup语法糖里面 使用方法
<script setup> 中可以使用顶层 await。结果代码会被编译成 async setup()
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```

父组件引用子组件 通过defineAsyncComponent加载异步配合import 函数模式便可以分包

```js
<script setup lang="ts">
import { reactive, ref, markRaw, toRaw, defineAsyncComponent } from 'vue'
const Dialog = defineAsyncComponent(() => import('../../components/Dialog/index.vue'))
```

### suspense

`<suspense>` 组件有两个插槽。它们都只接收一个直接子节点。`default` 插槽里的节点会尽可能展示出来。如果不能，则展示 `fallback` 插槽里的节点。

```js
<Suspense>
    <template #default>
        <Dialog>
            <template #default>
                <div>我在哪儿</div>
            </template>
        </Dialog>
    </template>

    <template #fallback>
        <div>loading...</div>
    </template>
</Suspense>
```

## Teleport传送组件

`Teleport` Vue 3.0新特性之一

Teleport` 是一种能够将我们的模板渲染至指定`DOM`节点，不受父级`style`、`v-show`等属性影响，但`data`、`prop`数据依旧能够共用的技术；类似于 `React` 的 `Portal

主要解决的问题 因为`Teleport`节点[挂载](https://so.csdn.net/so/search?q=挂载&spm=1001.2101.3001.7020)在其他指定的`DOM`节点下，完全不受父级`style`样式影响

使用方法

通过to 属性 插入指定元素位置 to="body" 便可以将`Teleport` 内容传送到指定位置

```vue
<Teleport to="body">
    <Loading></Loading>
</Teleport>
```

也可以自定义传送位置 支持 class id等 选择器

```vue
<div id="app"></div>
<div class="modal"></div>
<Teleport to=".modal">
	<Loading></Loading>
</Teleport>
```

也可以使用多个

```vue
<Teleport to=".modal1">
     <Loading></Loading>
</Teleport>
<Teleport to=".modal2">
     <Loading></Loading>
</Teleport>
```

## keep-alive缓存组件

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到`keep-alive`组件

开启keep-alive [生命周期](https://so.csdn.net/so/search?q=生命周期&spm=1001.2101.3001.7020)的变化

- 初次进入时： onMounted> onActivated
- 退出后触发 `deactivated`
- 再次进入：
- 只会触发 onActivated
- 事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

```js
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
 
<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
 
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

**`include` 和 `exclude`**

```js
 <keep-alive :include="[]" :exclude="[]" :max=""></keep-alive>
 <!-- include  exclude 里面都是放组件的name，include 缓存那些组件，exclude 不缓存那些组件 -->
 <!-- max 最多缓存多少个组件 -->
```

include 和 exclude prop 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

## transition动画组件

### 过渡的类名

在进入/离开的过渡中，会有 6 个 class 切换。

1. v-enter-from：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3. v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

4. v-leave-from：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

6. v-leave-to：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

### 自定义过渡 class 类名

trasnsition props

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

### transition 生命周期8个

```js
  @before-enter="beforeEnter" //对应enter-from
  @enter="enter"//对应enter-active
  @after-enter="afterEnter"//对应enter-to
  @enter-cancelled="enterCancelled"//显示过度打断
  @before-leave="beforeLeave"//对应leave-from
  @leave="leave"//对应enter-active
  @after-leave="afterLeave"//对应leave-to
  @leave-cancelled="leaveCancelled"//离开过度打断
```

当只用 JavaScript 过渡的时候，在 **`enter` 和 `leave` 钩子中必须使用 `done` 进行回调**

结合gsap 动画库使用 [GreenSock](https://greensock.com/)

```js
const beforeEnter = (el: Element) => {
    console.log('进入之前from', el);
}
const Enter = (el: Element,done:Function) => {
    console.log('过度曲线');
    setTimeout(()=>{
       done()
    },3000)
}
const AfterEnter = (el: Element) => {
    console.log('to');
}
```

### appear

```js
appear-active-class=""
appear-from-class=""
appear-to-class=""
appear
```

## animation 实践

```js
<template>
  <div class="animation">
    <button @click="isShow = !isShow">点击</button>
    <transition>
      <div v-show="isShow">
        Vue使用transition组件实现了过渡与动画，Vue的过渡系统可以在元素从DOM中插入或移除时自动应用过渡效果，也提供配合使用第三方
        CSS 动画库(如 animate.css)来实现动画效果
      </div>
      <!--需要动画的div标签-->
    </transition>

    <button @click="isPor = !isPor">点击1(取别名:fade)</button>
    <transition name="fade"
      ><!-- 给这个transition取别名为fade，所以它展示的动画效果为上面的fade-开头的代码动画效果 -->
      <p v-show="isPor">
        Vue使用transition组件实现了过渡与动画，Vue的过渡系统可以在元素从DOM中插入或animate.css)来实现动画效果。
      </p>
    </transition>

    <button @click="isAni = !isAni">animate.css动画库</button>
    <!-- enter-active-class属性，可以把CSS里面写好的class类调用  当显示的时候 -->
    <!-- leave-active-class属性，可以把CSS里面写好的class类调用  当隐藏的时候 -->
    <transition
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeInRight"
      ><!-- 给这个transition取别名为fade，所以它展示的动画效果为上面的fade-开头的代码动画效果 -->
      <p v-show="isAni">
        Vue使用transition组件实现了过渡与动画，Vue的过渡系统可以在元素从DOM中插入或animate.css)来实现动画效果。
      </p>
    </transition>

    <button @click="isMode = !isMode">点击</button>
    <!-- enter-active-class属性，可以把CSS里面写好的class类调用  当显示的时候 -->
    <!-- leave-active-class属性，可以把CSS里面写好的class类调用  当隐藏的时候 -->
    <transition
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeInRight"
      mode="out-in"
      ><!-- 其中的animated是基础类 -->
      <!-- 元素过度模式in-out：新元素先进行过渡，完成之后当前元素过渡离开。out-in：当前元素先进行过渡，完成之后新元素过渡进入。 -->
      <p v-if="isMode" key="fade">
        Vue使用transition组件实现了过渡与动画，Vue的过渡系统可以在元素从DOM中插入或移除时自动应用过渡效果，
      </p>
      <!-- 当有相同标签名的元素切换时，需要通过 key属性设置唯一的值来标记以让 Vue 区分它们,key的取值可以是任意字符，例如1和2 -->

      <p v-else key="mode">
        也提供配合使用第三方 CSS 动画库(如 animate.css)来实现动画效果。
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isShow: true,
      isPor: true,
      isAni: true,
      isMode: true,
    };
  },
};
</script>

<style scoped>
/*  显示leave  到  隐藏leave-to */
.fade-leave {
  opacity: 1; /*这个是默认值，可写可不写*/
}
.fade-leave-active,
.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-leave-to {
  opacity: 0;
}

/*隐藏enter  到  显示enter-to*/
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1; /*这个是默认值，可写可不写*/
}

/*  显示leave  到  隐藏leave-to */
.v-leave {
  opacity: 1; /*这个是默认值，可写可不写*/
}
.v-leave-active,
.v-enter-active {
  transition: opacity 1.5s;
}
.v-leave-to {
  opacity: 0;
}

/*隐藏enter  到  显示enter-to*/
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1; /*这个是默认值，可写可不写*/
}
</style>

```

## trasition-group过度列表

- 默认情况下，它不会渲染一个包裹元素，但是你可以通过 `tag` attribute 指定渲染一个元素。
- [过渡模式](https://v3.cn.vuejs.org/guide/transitions-enterleave.html#过渡模式)不可用，因为我们不再相互切换特有的元素。
- 内部元素**总是需要**提供唯一的 `key` attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身

```js
<transition-group>
     <div style="margin: 10px;" :key="item" v-for="item in list">{{ item }</div>
</transition-group>
const list = reactive<number[]>([1, 2, 4, 5, 6, 7, 8, 9])
const Push = () => {
    list.push(123)
}
const Pop = () => {
    list.pop()
}
```

### trasition-group 实践

```js
<transition-group enter-active-class="move_left" leave-active-class="move_right">
  <el-col :span="24" v-for="(item, index) in mechanismList" :key="item.id" class="d-flex">
    <el-col :span="7" class="pr-2">
      <el-form-item>
        <el-input v-model="item.name" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col :span="15">
      <el-form-item>
        <el-input v-model="item.member" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col :span="1" class="pl-2">
      <el-button type="danger" circle @click="deleteMechanism(index)">
        <el-icon><i-ep-delete /></el-icon>
      </el-button>
    </el-col>
  </el-col>
 </transition-group>

<style>
.move_left {
  -webkit-animation: move_2 1s;
}
@-webkit-keyframes move_2 {
  0% {
    -webkit-transform: translateX(200px);
    opacity: 0;
  }
}
.move_right {
  -webkit-animation: move_4 1s;
}
@-webkit-keyframes move_4 {
  100% {
    -webkit-transform: translateX(200px);
    opacity: 0;
  }
}
</style>
```

## 列表的移动过渡

```<transition-group>``` 组件还有一个特殊之处。除了进入和离开，它还可以为定位的改变添加动画。只需了解新增的 v-move 类就可以使用这个新功能，它会应用在元素改变定位的过程中。像之前的类名一样，它的前缀可以通过 name attribute 来自定义，也可以通过 move-class attribute 手动设置

```vue
<template>
  <div>
    <button @click="randomhandler">过度</button>
    <transition-group move-class="mmm" class="wraps" tag="div">
      <div class="item" v-for="item in list" :key="item.id">{{item.number}}</div>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
let list = ref(Array.apply(null,{length:81} as number[]).map((_,index)=>{
  return {
    id:index,
    number:(index % 9) + 1
  }
}))

const randomhandler = ()=>{
  list.value = list.value.sort((a,b)=>{
    return Math.random()> 0.5 ? -1 :1;
  })
}
</script>
<style>
.wraps{
  display: flex;
  flex-wrap: wrap;
  width:calc(25px * 10 + -1px)
}
.item{
  width:25px;
  height:25px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mmm{
  transition: all 1s;
}
</style>
```

## Provide / Inject

通常，当我们需要从父组件向子组件传递数据时，我们使用 props。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将 prop 沿着组件链逐级传递下去，可能会很麻烦。

官网的解释很让人疑惑，那我翻译下这几句话：

provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法。
![img](https://img-blog.csdnimg.cn/img_convert/5f4ea9e16eda6e37ab336075a788ae15.png)
图片(https://img-blog.csdnimg.cn/img_convert/5f4ea9e16eda6e37ab336075a788ae15.png)

看一个例子

父组件传递数据

```vue
<template>
    <div class="App">
        <button>我是App</button>
        <A></A>
    </div>
</template>
    
<script setup lang='ts'>
import { provide, ref } from 'vue'
import A from './components/A.vue'
let flag = ref<number>(1)
provide('flag', flag)
</script>
    
<style>
.App {
    background: blue;
    color: #fff;
}
</style>
```

子组件接受

```vue
<template>
    <div style="background-color: green;">
        我是B
        <button @click="change">change falg</button>
        <div>{{ flag }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { inject, Ref, ref } from 'vue'
 
const flag = inject<Ref<number>>('flag', ref(1))
 
const change = () => {
    flag.value = 2
}
</script>
    
<style>
</style>
```

<span style='color:red'>**TIPS 你如果传递普通的值 是不具有响应式的 需要通过ref reactive 添加响应式**</span>

使用场景

当父组件有很多数据需要分发给其子代组件的时候， 就可以使用provide和inject。

## 兄弟组件传参和Bus

两种方案

### 1.借助父组件传参

例如父组件为App 子组件为A 和 B他两个是同级的

```vue
<template>
    <div>
        <A @on-click="getFalg"></A>
        <B :flag="Flag"></B>
    </div>
</template>
    
<script setup lang='ts'>
import A from './components/A.vue'
import B from './components/B.vue'
import { ref } from 'vue'
let Flag = ref<boolean>(false)
const getFalg = (flag: boolean) => {
   Flag.value = flag;
}
</script>
    
<style>
</style>
```

A 组件派发事件通过App.vue 接受A组件派发的事件然后在Props 传给B组件 也是可以实现的

缺点就是比较麻烦 ，无法直接通信，只能充当桥梁

### 2.Event Bus

我们在Vue2 可以使用$emit 传递 $on监听 emit传递过来的事件

我写了一个简易版

```typescript
 
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
}
type BusParams = string | number | symbol 
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() {
        this.list = {}
    }
    emit(name: T, ...args: Array<any>) {
        let eventName: Array<Function> = this.list[name]
        eventName.forEach(ev => {
            ev.apply(this, args)
        })
    }
    on(name: T, callback: Function) {
        let fn: Array<Function> = this.list[name] || [];
        fn.push(callback)
        this.list[name] = fn
    }
}
 
export default new Bus<number>()
```

然后挂载到Vue config 全局就可以使用啦

## TSX

我们之前呢是使用Template去写我们模板。现在可以扩展另一种风格TSX风格

vue2 的时候就已经支持jsx写法，只不过不是很友好，随着vue3对[typescript](https://so.csdn.net/so/search?q=typescript&spm=1001.2101.3001.7020)的支持度，tsx写法越来越被接受

### 1.安装插件

`npm install @vitejs/plugin-vue-jsx -D`

vite.config.ts 配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()]
})
```

### 2.修改tsconfig.json 配置文件

```json
"jsx": "preserve",
"jsxFactory": "h",
"jsxFragmentFactory": "Fragment",
```

配置完成就可以使用啦

在目录新建一个xxxxxx.tsx文件

### 使用TSX

TIPS tsx不会自动解包使用ref加.vlaue ! ! !

### tsx支持 v-[model](https://so.csdn.net/so/search?q=model&spm=1001.2101.3001.7020) 的使用

```tsx
 
import { ref } from 'vue'
 
let v = ref<string>('')
 
const renderDom = () => {
    return (
        <>
           <input v-model={v.value} type="text" />
           <div>
               {v.value}
           </div>
        </>
    )
}
 
export default renderDom
```

### v-show

```tsx
 
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
           <div v-show={flag.value}>景天</div>
           <div v-show={!flag.value}>雪见</div>
        </>
    )
}
 
export default renderDom
```

### v-if是不支持的

所以需要改变风格

```tsx
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
            {
                flag.value ? <div>景天</div> : <div>雪见</div>
            }
        </>
    )
}
 
export default renderDom
```

### v-for也是不支持的

### v-bind使用

直接赋值就可以

```tsx
import { ref } from 'vue'
 
let arr = [1, 2, 3, 4, 5]
 
const renderDom = () => {
    return (
        <>
            <div data-arr={arr}>1</div>
        </>
    )
}
 
export default renderDom
```

### v-on绑定事件 所有的事件都按照react风格来

- 所有事件有on开头
- 所有事件名称首字母大写

```tsx
 const renderDom = () => {
    return (
        <>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

### Props 接受值

```tsx
 
import { ref } from 'vue'
 
type Props = {
    title:string
}
 
const renderDom = (props:Props) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default renderDom
```

### Emit派发

```tsx
type Props = {
    title: string
}
 
const renderDom = (props: Props,content:any) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap.bind(this,content)}>点击</button>
        </>
    )
}
 
const clickTap = (ctx:any) => {
 
    ctx.emit('on-click',1)
}
```

## v-model

### <span style='color:red'>TIps 在Vue3 v-model 是破坏性更新的</span>

v-model在组件里面也是很重要的

v-model 其实是一个语法糖 通过props 和 emit组合而成的

1.默认值的改变

- prop：value -> modelValue；
- 事件：input -> update:modelValue；
- v-bind 的 .sync 修饰符和组件的 model 选项已移除
- 新增 支持多个v-model
- 新增 支持自定义 修饰符

案例 子组件

```typescript
<template>
     <div v-if='propData.modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue'])
 
const close = () => {
     emit('update:modelValue',false)
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```typescript
<template>
  <button @click="show = !show">开关{{show}}</button>
  <Dialog v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
</script>
 
<style>
</style>
```

绑定多个案例

 子组件

```typescript
<template>
     <div v-if='modelValue ' class="dialog">
         <div class="dialog-header">
             <div>标题---{{title}}</div><div @click="close">x</div>
         </div>
         <div class="dialog-content">
            内容
         </div>
         
     </div>
</template>
 
<script setup lang='ts'>
 
type Props = {
   modelValue:boolean,
   title:string
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue','update:title'])
 
const close = () => {
     emit('update:modelValue',false)
     emit('update:title','我要改变')
}
 
</script>
 
<style lang='less'>
.dialog{
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    &-header{
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-content{
        padding: 10px;
    }
}
</style>
```

父组件

```typescript
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog v-model:title='title' v-model="show"></Dialog>
</template>
 
<script setup lang='ts'>
import Dialog from "./components/Dialog/index.vue";
import {ref} from 'vue'
const show = ref(false)
const title = ref('我是标题')
</script>
 
<style>
</style>
```

自定义修饰符

添加到组件 `v-model` 的修饰符将通过 `modelModifiers` prop 提供给组件。在下面的示例中，我们创建了一个组件，其中包含默认为空对象的 `modelModifiers` prop

```typescript
<script setup lang='ts'>
 
type Props = {
    modelValue: boolean,
    title?: string,
    modelModifiers?: {
        default: () => {}
    }
    titleModifiers?: {
        default: () => {}
    }
 
}
 
const propData = defineProps<Props>()
 
const emit = defineEmits(['update:modelValue', 'update:title'])
 
const close = () => {
    console.log(propData.modelModifiers);
 
    emit('update:modelValue', false)
    emit('update:title', '我要改变')
}
```

## Vue3自动引入插件

`unplugin-auto-import/vite`

vite配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VueJsx(),AutoImport({
    imports:['vue'],
    dts:"src/auto-import.d.ts"
  })]
})
```

配置完成之后使用ref reactive watch 等 无须import 导入 可以直接使用 

[GitHub - antfu/unplugin-auto-import: Auto import APIs on-demand for Vite, Webpack and Rollup](https://github.com/antfu/unplugin-auto-import)

## directive

### directive-自定义指令（属于破坏性更新）

Vue中有v-if,v-for,v-bind，v-show,v-[model](https://so.csdn.net/so/search?q=model&spm=1001.2101.3001.7020) 等等一系列方便快捷的指令 今天一起来了解一下vue里提供的自定义指令

### 1.Vue3指令的钩子函数

- created 元素初始化的时候
- beforeMount 指令绑定到元素后调用 只调用一次
- mounted 元素插入父级dom调用
- beforeUpdate 元素被更新之前调用
- update 这个周期方法被移除 改用updated
- beforeUnmount 在元素被移除前调用
- unmounted 指令被移除后调用 只调用一次

Vue2 指令 bind inserted update componentUpdated unbind

### 2.在setup内定义局部指令

但这里有一个需要注意的限制：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。

```vue
<template>
  <button @click="show = !show">开关{{show}} ----- {{title}}</button>
  <Dialog  v-move-directive="{background:'green',flag:show}"></Dialog>
</template>
```

```typescript
 
const vMoveDirective: Directive = {
  created: () => {
    console.log("初始化====>");
  },
  beforeMount(...args: Array<any>) {
    // 在元素上做些操作
    console.log("初始化一次=======>");
  },
  mounted(el: any, dir: DirectiveBinding<Value>) {
    el.style.background = dir.value.background;
    console.log("初始化========>");
  },
  beforeUpdate() {
    console.log("更新之前");
  },
  updated() {
    console.log("更新结束");
  },
  beforeUnmount(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载之前");
  },
  unmounted(...args: Array<any>) {
    console.log(args);
    console.log("======>卸载完成");
  },
};
```

### 3.生命周期钩子参数详解

第一个 el  当前绑定的DOM 元素

第二个 binding

- instance：使用指令的组件实例。
- value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2。
- oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否有更改都可用。
- arg：传递给指令的参数(如果有的话)。例如在 v-my-directive:foo 中，arg 为 "foo"。
- modifiers：包含修饰符(如果有的话) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为 {foo: true，bar: true}。
- dir：一个对象，在注册指令时作为参数传递。例如，在以下指令中

第三个 当前元素的虚拟DOM 也就是Vnode

第四个 prevNode 上一个虚拟节点，仅在 `beforeUpdate` 和 `updated` 钩子中可用 

### 4.函数简写

你可能想在 `mounted` 和 `updated` 时触发相同行为，而不关心其他的钩子函数。那么你可以通过将这个函数模式实现

```vue
<template>
   <div>
      <input v-model="value" type="text" />
      <A v-move="{ background: value }"></A>
   </div>
</template>
   
<script setup lang='ts'>
import A from './components/A.vue'
import { ref, Directive, DirectiveBinding } from 'vue'
let value = ref<string>('')
type Dir = {
   background: string
}
const vMove: Directive = (el, binding: DirectiveBinding<Dir>) => {
   el.style.background = binding.value.background
}
</script>

```

### 案例自定义拖拽指令 

```vue
<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>
      内容
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { Directive } from "vue";
const vMove: Directive = {
  mounted(el: HTMLElement) {
    let moveEl = el.firstElementChild as HTMLElement;
    const mouseDown = (e: MouseEvent) => {
      //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
      console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e: MouseEvent) => {
        el.style.left = e.clientX - X + "px";
        el.style.top = e.clientY - Y + "px";
        console.log(e.clientX, e.clientY, "---改变");
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};
</script>
 
<style lang='less'>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  .header {
    height: 20px;
    background: black;
    cursor: move;
  }
}
</style>
```

## 自定义Hooks

Vue3 自定义Hook

主要用来处理复用代码逻辑的一些封装

这个在vue2 就已经有一个东西是Mixins

Vue3 的自定义的hook

- Vue3 的 hook函数 相当于 vue2 的 mixin, 不同在与 hooks 是函数
- Vue3 的 hook函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数

Vue3 hook 库[Get Started | VueUse](https://vueuse.org/guide/)

案例

```typescript
import { onMounted } from 'vue'
 
 
type Options = {
    el: string
}
 
type Return = {
    Baseurl: string | null
}
export default function (option: Options): Promise<Return> {
 
    return new Promise((resolve) => {
        onMounted(() => {
            const file: HTMLImageElement = document.querySelector(option.el) as HTMLImageElement;
            file.onload = ():void => {
                resolve({
                    Baseurl: toBase64(file)
                })
            }
 
        })
 
        const toBase64 = (el: HTMLImageElement): string => {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = el.width
            canvas.height = el.height
            ctx.drawImage(el, 0, 0, canvas.width,canvas.height)
            console.log(el.width);
            
            return canvas.toDataURL('image/png')
 
        }
    })
}
```

## Vue3定义全局函数和变量

### globalProperties

由于Vue3 没有Prototype 属性 使用 app.config.globalProperties 代替 然后去定义变量和函数

```typescript
// 之前 (Vue 2.x)
Vue.prototype.$http = () => {}
```

```typescript
// 之后 (Vue 3.x)
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

### 过滤器

在Vue3 移除了

我们正好可以使用全局函数代替Filters

案例

```typescript
app.config.globalProperties.$filters = {
  format<T extends any>(str: T): string {
    return `$${str}`
  }
}
```

声明文件 不然TS无法正确类型 推导

```typescript
type Filter = {
    format: <T extends any>(str: T) => T
  }
// 声明要扩充@vue/runtime-core包的声明.
// 这里扩充"ComponentInternalInstance"接口, 因为他是vue3中实例的属性的类型.
  declare module '@vue/runtime-core' {
    export interface ComponentInternalInstance {
        $filters: Filter
    }
  }
```

setup 读取值

```typescript
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
 
const { appContext } = <ComponentInternalInstance>getCurrentInstance()
 
console.log(appContext.config.globalProperties.$env);
```

## Evnet Loop 和 nextTick

单线程就意味着所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行，如果前面的任务耗时过长，后面的任务就需要一直等，一些从用户角度上不需要等待的任务就会一直等待，这个从体验角度上来讲是不可接受的，所以`JS`中就出现了异步的概念

同步任务
代码从上到下按顺序执行

异步任务
1.宏任务
script(整体代码)、setTimeout、setInterval、UI交互事件、postMessage、Ajax

2.微任务
Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

## Vue如何开发移动端 

### hybrid 应用

https://xiaoman.blog.csdn.net/article/details/125490078

## $attrs

https://blog.csdn.net/yzding1225/article/details/124196839

## Pinia