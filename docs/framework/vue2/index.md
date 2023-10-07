---
# 取二三级标题生成目录
outline: [2,3]
---

# VUE2

## $nextTick

获取更新后的dom，是异步的

```js
this.$nextTick(()=>{
	// dom 更新后会触发
})
await this.$nextTick(()=>{})
// created拿不到ref，写了这个就可以拿
```

## $slots

- $slots是组件插槽集，是组件所有默认插槽、具名插槽的集合，可以用来获取当前组件的插槽集
- `$slots` 只能获取到 **不带作用域**（具名或默认）的插槽内容, 如`<div>默认插槽文本</div>` 或 `<tamplate v-slot:btn ></template>`

## $scopedSlots

有作用域时, 如 `<template v-slot:btn="{ userName }"></template>`, 只能用 `$scopedSlots` 来获取, 并且取到的是可以返回对应插槽内容的**函数**

`$scopedSlots` 中包含 `$slots` 的所有内容, 只是被转换成**函数形式**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200821131527834.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDEyOTY1,size_16,color_FFFFFF,t_70#pic_left)

图片查看（https://img-blog.csdnimg.cn/20200821131527834.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDEyOTY1,size_16,color_FFFFFF,t_70#pic_left）

## vue.config.js 中publicPath

1. 首先在根目录下建立一个.env的文件

   ```
   VUE_APP_PATH = './'
   ```

2. 修改vue.config.js 文件的publicPath属性

```js
publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_PATH : "/",
```

3. 这样就能实现   生产环境与开发环境下的 运行

## Vue.use 和 install 方法

```js
import S_button from './scq_button.vue'
import S_input from './scq_input.vue'

// const components = [S_button,S_input]


export default {
  install (Vue) { 
    // components.forEach((f,index) => {
    //   Vue.component(components[index], f)
    // })
    Vue.component('S_button', S_button)
    Vue.component('S_input', S_input)
  }
}
```

```js
import Vue from 'vue'
import scqUi from '@/components/modules/scqUI/index'
Vue.use(scqUi)
```

## 缓存页面不刷新，不请求

- 在router里配置路由

```js
{
         path: 'searchWord',
         name: 'searchWord',
         component: () => import("@/pages/dailyReportManage/searchWord/index"),
         meta: {
            keepAlive: true // 需要缓存页面
          }
        },
        {
          path: "troopAction",
          name: "troopAction",
          component: () => import("@/pages/Dashboard/TroopAction"),
          meta: {
            keepAlive: false//  不需要缓存
          }
  		 },
```

- 配置APP.vue --  使用keep-alive来进行缓存

```vue
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>

```

- 点击返回按钮时调用this.$router.back()方法就可以了

```vue
      // 返回
      bacKBnt(){
        this.$router.back()
      },
```

## keep-alive

`keep-alive`组件是`vue`的内置组件，用于缓存内部组件实例。

这样做的目的在于，`keep-alive`内部的组建切换时，不用重新创建组件实例，而直接使用缓存中的实例，一方面能够避免创建组件带来的开销，另一方面也可以保留组件的状态。

```vue
<template>
  <div id="app">
    <button @click="curIndex = (curIndex + 1) % comps.length">switch</button>
    <keep-alive>
      <component :is="comps[curIndex]"></component>
    </keep-alive>
  </div>
</template>

<script>
import Comp1 from "./components/Comp1";
import Comp2 from "./components/Comp2";
import Comp3 from "./components/Comp3";

export default {
  data() {
    return {
      comps: Object.freeze([Comp1, Comp2, Comp3]),
      curIndex: 0,
    };
  },
};
</script>
```

> 点击按钮切换组件时，同时每次组件也经历了创建和销毁。只要用`keep-alive`包裹起来以后，它就会缓存组件实例。每次切换组件不会重新创建和效果，并且每个组件上的一些操作也都可以保留

### 属性

1. include：控制哪些组件进行缓存
2. exclude：控制哪些组件不进行缓存
3. max：设置最大缓存数，当超过这个数量时，vue 会自动移除最久没有使用的组件缓存。

属性配置方式：

- 配置一个数组，数组的每一项是组件的名字（组件内部的 name 属性）

```vue
<keep-alive :include="['comp1', 'comp2', 'comp3']">
  <Comp1 />
  <Comp2 />
  <Comp3 />
</keep-alive>
```

- 配置一个字符串，用逗号分割组件名称即可

```vue
<keep-alive include="comp1, comp2, comp3">
  <Comp1 />
  <Comp2 />
  <Comp3 />
</keep-alive>
```

### keep-alive 增加的生命周期方法

受`keep-alive`的影响，其内部所有嵌套的组建都会具有两个生命周期钩子函数，分别是`activated`和`deactivated`。

1. activated：组件激活时触发（第一次`activated`触发在`mounted`挂载后）
2. deactivated：组件失活时触发

### 案例

动态添加/移除，tab 页，添加进去的 tab 页缓存，未添加的 tab 页不缓存

```js
/* store.js */
import Vue from "vue";
import Vuex from "vuex";
import tabs from "./tabs";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tabs: {
      namespaced: true,
      state: {
        pageNames: [],
      },
      mutations: {
        addPage(state, newPageName) {
          if (!store.pageNames.includes(newPageName)) {
            state.pageNames.push(newPageName);
          }
        },
        removePage(state, pageName) {
          const index = state.pageNames.indexOf(pageName);
          state.pageNames.splice(index, 1);
        },
      },
    },
  },
});
```

```vue
<keep-alive :includes="$store.state.tabs.pageNames">
  <router-view></router-view>
</keep-alive>
```

### 原理

在具体实现上，`keep-alive`在内部维护了一个数组和一个缓存对象。

在`keep-alive`的渲染函数中，其逻辑就是判断当前渲染的`vnode`是否有对应的缓存，如果有就去取对应的缓存实例，如果没有就将其缓存起来。

当缓存数量超过`max`数值时，`keep-alive`会移除掉维护的数组中的第一个元素

### 使用Vue调起摄像头，进行拍照并能保存到本地

参考文章： https://blog.csdn.net/m0_56233309/article/details/124058122?spm=1001.2014.3001.5502

> 关闭摄像头

```js
const stream = await navigator.mediaDevices.getUserMedia(this.constraints)
this.track = typeof stream.stop === 'function' ? stream : stream.getTracks()[1]
this.track && this.track.stop()
```

## 动手实现录屏功能并本地保存

参考文章： https://blog.csdn.net/m0_56233309/article/details/124133560

参考文章： https://blog.csdn.net/qq_34958474/article/details/89335594?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-89335594-blog-124133560.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-89335594-blog-124133560.pc_relevant_default&utm_relevant_index=2

## watch无法监听vuex传过来的对象数据

**问题 :**

在组件中接收vuex传过来的对象, 使用watch监听,无法监听到变化

**原因 :**

因为对象的地址是一样的, watch要监听地址变化

**解决 :**

使用[深拷贝](https://so.csdn.net/so/search?q=深拷贝&spm=1001.2101.3001.7020), 将vuex传过来的对象深拷贝一份

```javascript
computed: {
	...mapState('depotScope', ['depotScope']),
	params() {
		return JSON.parse(JSON.stringify(this.depotScope));
	},
},
watch: {
	params(newValue) {
		console.log('监听深拷贝', newValue);
		this.getStoreInOutList();
	},
},
```

## .async 修饰符

由于保持数据的单向性，从父组件传到子组件的数据，子组件如果修改了项目还可以运行浏览器上会报错，加上.sync后子组件内部改变props属性值并更新到父组件中

```vue
<child :name.sync="name"></child>  // 父组件
 
// 子组件事件
changePropsInChild(){
      this.$emit('update:name', 'I am from child');
}
```

`:name.sync`就是`:name="name" @update:name="name = $event"`的缩写

## $attrs 跟 $listeners

### $attrs

> 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外).当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用
>
> 意思就是：`$attrs` 可以收集父组件中的所有传过来的属性除了那些在组件中没有通过 `props` 定义的
>
> `inheritAttrs: false`的含义是**不希望本组件的根元素继承父组件的attribute，同时父组件传过来的属性（没有被子组件的props接收的属性），也不会显示在子组件的dom元素上**
>
> *子组件使用`inheritAttrs = true`，那么特性显示在dom上

### $listeners

> 跟$attrs类似，可以是C组件向上抛方法，B组件通过$listeners中转到A

- 大概意思就是 A-B-C三个组件，然后想A中的属性传入C中，基本的做法是这样的，一层一层通过 `props` 往下传递，但是我们可以使用$attrs 跟 $listeners

```vue
// 组件A
<template>
  <div class="top">
    <Centers name="name" age="18" gender="666" sdf="asd" @isClick="isClick" @asd="asd" type="text"></Centers>
  </div>
</template>
<script>
import Centers from './Center.vue';
export default {
  name: 'Top',
  components: {
      Centers
  },
  methods: {
      asd() {
        console.log(999);
      },
      isClick() {
        console.log(666);
      }
  }
}
</script>
```

```vue
// 组件 B
<template>
  <div class="center">
    <div class="mt-10">
      <!-- 将上一级的数据跟方法往下级传递 -->
      <Bottom v-bind="$attrs" v-on="$listeners" />
    </div>
  </div>
</template>
<script>
import Bottom from './Bottom';
export default {
  inheritAttrs:false,
  name: 'center',
  components: {
      Bottom
  },
  props: {
      name: { type: String,default: 'default' },
      age: { type: String,default: 'default' }
  }
}
</script>
```

```vue
// 组件C
<template>
  <div class="bottom">
    <div>
      {{ $attrs['gender'] }}  在$attrs里面只会有props没有注册的属性
      <br>
      {{ gender }}
    </div>
    <input v-bind="$attrs">
  </div>
</template>

<script>

export default {
  inheritAttrs:false, // 不使用这个配置属性，在父组件中使用时传递的参数会在最外面的元素身上
  name: 'HelloWorld',
  props: {
      gender: { type: String, default: '' },
      sdf: { type: String, default: '' }
  },
  mounted() {
      console.log(this.$attrs); // 没被接收得 参数 还会停留在 $attrs 对象里面
      console.log(this.$listeners); // 父组件传递过来得参数
      this.$listeners.isClick();
      this.$listeners.asd();
    }
}
</script>
```

## $children | $parent

> this.$parent 可以直接访问该组件的父实例或组件；
> 父组件也可以通过this.$children 访问它所有的子组件； 需要注意 $children 并不保证顺序，也不是响应式的。

```vue
// A组件
<template>
  <div class="top">
    <Centers ref="test"></Centers>
    <button @click="clickHandle">ref</button>
  </div>
</template>

<script>
import Centers from './Center.vue';
export default {
  components: {
      Centers
  },
  methods: {
      clickHandle(){
        console.log(this.$refs.test); // 组件实例
        console.log(this.$refs.test.msg);
        console.log(this.$children[0].msg);
      }
  }
}
</script>
```

```vue
//B 组件
<template>
  <div class="center">
    <Bottom />
  </div>
</template>

<script>
import Bottom from './Bottom';
export default {
  components: {
      Bottom
  },
  data(){
    return {
      msg:'center'
    }
  }
}
</script>
```

```vue
// C组件
<template>
  <div class="bottom">
  	<button @click="clickHand">botton</button>
  </div>
</template>
<script>
export default {
  methods:{
    clickHand(){
      console.log(this.$parent.msg);
    }
  }
}
</script>
```

## 路由

### 路由传参

```js
query:
	this.$router.push({
		path: '/home',
		query: {
			id: '123'
		}
	})
params:
	this.$router.push({
		name: 'Home', // 路由名称
		params: {
			id: '123'
		}
	})	
params: /router1/:id, /router1/123, /router1/789, 这里的id 叫做 params
query: /router1?id=123, /router?id=456, 这里的id 叫做 query

```

### 路由的高级用法 - **路由参数解耦**

> 通过 props 来解耦

```js
const router = new VueRouter({
    routes: [{
        path:  /user/:id ,
        component: User,
        props: true
    }]
})
```

> 将路由的 props 属性设置为 true 后，组件内部可以通过 props 接收 params 参数。

```js
export default {
    props: [ id ],
    methods: {
        getParamsId() {jin't
            return this.id
        }
    }
}
```

> 您还可以通过功能模式返回道具。

```js
const router = new VueRouter({
    routes: [{
        path:  /user/:id ,
        component: User,
        props: (route) => ({
            id: route.query.id
        })
    }]
})
```

## **功能组件**

> 功能组件是无状态的，它不能被实例化，也没有任何生命周期或方法。创建功能组件也很简单，只需在模板中添加功能声明即可。
>
> 它一般适用于只依赖于外部数据变化的组件，并且由于其轻量级而提高了渲染性能。
>
> 组件需要的一切都通过上下文参数传递。它是一个上下文对象，具体属性见文档。这里的 props 是一个包含所有绑定属性的对象

```vue
// functional
<template functional>
    <div class="list">
        <div class="item" v-for="item in props.list" :key="item.id" @click="props.itemClick(item)">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
        </div>
    </div>
</template>
```

> 父组件使用

```vue
<template>
    <div>
        <List :list="list" :itemClick="item => (currentItem = item)" />
    </div>
</template>

<script>
import List from  @/components/List.vue
export default {
    components: {
        List
    },
    data() {
        return {
            list: [{
                title:  title ,
                content:  content
            }],
            currentItem:
        }
    }
}
</script>
```

## Watch

> watch 在监听器属性发生变化时触发，有时我们希望 watch 在组件创建后立即执行

```js
// 设置 immediate 为true
watch: {
        name: {
            handler:  sayName ,
            immediate: true
        }
    }
```

> 监听一个对象时，当对象内部的属性发生变化时，watch是不会被触发的，所以我们可以为它设置深度监听。

```js
// deep: true
watch: {
        studen: {
            handler:  sayName ,
            deep: true
        }
    }
```

### **触发监听器执行多个方法**

使用数组，您可以设置多个形式，包括字符串、函数、对象

```js
export default {
    data: {
        name:  Joe
    },
    watch: {
        name: [
             sayName1 ,
            function(newVal, oldVal) {
                this.sayName2()
            },
            {
                handler:  sayName3 ,
                immaediate: true
            }
        ]
    },
    methods: {
        sayName1() {
            console.log( sayName1==> , this.name)
        },
        sayName2() {
            console.log( sayName2==> , this.name)
        },
        sayName3() {
            console.log( sayName3==> , this.name)
        }
    }
}
```

### **watch监听多个变量**

> watch 本身不能监听多个变量。但是，我们可以通过返回具有计算属性的对象然后监听该对象来“监听多个变量”。

```js
export default {
    data() {
        return {
            msg1:  apple ,
            msg2:  banana
        }
    },
    compouted: {
        msgObj() {
            const { msg1, msg2 } = this
            return {
                msg1,
                msg2
            }
        }
    },
    watch: {
        msgObj: {
            handler(newVal, oldVal) {
                if (newVal.msg1 != oldVal.msg1) {
                    console.log( msg1 is change )
                }
                if (newVal.msg2 != oldVal.msg2) {
                    console.log( msg2 is change )
                }
            },
            deep: true
        }
    }
}
```

## **事件参数$event**

> $event 是事件对象的一个特殊变量，它在某些场景下为我们提供了更多的可用参数来实现复杂的功能。
>
> 本机事件：与本机事件中的默认事件对象行为相同。

```vue
<template>
    <div>
        <input type="text" @input="inputHandler( hello , $event)" />
    </div>
</template>
```

```js
export default {
    methods: {
        inputHandler(msg, e) {
            console.log(e.target.value)
        }
    }
}
```



> 自定义事件：在自定义事件中表示为捕获从子组件抛出的值。

```js
export default {
    methods: {
        customEvent() {
            this.$emit( custom-event ,  some value )
        }
    }
}
```

```vue
<template>
    <div>
        <my-item v-for="(item, index) in list" 
                 @custom-event="customEvent(index, $event)">
            </my-list>
    </div>
</template>

export default {
    methods: {
        customEvent(index, e) {
            console.log(e) //  some value
        }
    }
}
```

## 定时器 销毁的高级技巧

> 我们可以通过使用 $on 或 $once 监听页面生命周期销毁来解决这个问题

```js
export default {
    mounted() {
        this.creatInterval( hello )
        this.creatInterval( world )
    },
    creatInterval(msg) {
        let timer = setInterval(() => {
            console.log(msg)
        }, 1000)
        this.$once( hook:beforeDestroy , function() {
            clearInterval(timer)
        })
    }
}
```

> 使用这种方法，即使我们同时创建多个定时器，也不影响效果。这是因为它们将在页面被销毁后以编程方式自动清除。

## 动态样式

### 动态添加class名

```html
<!-- 写法一：对象形式，用于指定单个样式是否切换-->
<div :class="{select:num>=10}">动态样式切换</div>

<!-- 写法二：用于指定多个样式切换 -->
<div :class="[num>=10?'select':'noselect']" >动态样式切换</div>

<!-- 写法三：复杂化的写法 -->
<div :class="{select:arr.filter(item=>item).length>5}">动态样式切换</div>
<div :class="[arr.find(item=>item===4)?'select':'noselect']" >动态样式切换</div>

<!-- 对象形式，多个条件 -->
<div class="name" :class="{'success-text':state == true,'success-text2':state2 == true}">广式煲仔饭</div>

<!-- data形式或者computed形式   （缺点就是类名一定只能是一个单词） -->
<div class="name" :class="classObject">广式煲仔饭</div>
<div class="name" :class="classObject_cp">广式煲仔饭</div>

<!-- mothod方法 -->
<div class="name" :class="setClass()">广式煲仔饭</div>
```

### 动态更改style样式

```html
<div :style="{color:num>=10?'red':'blue'}">动态样式切换</div>

// 1、三元表达式  对象形式
<div class="name" :style="{color:state == true ? 'red' : 'black'}">麻辣香锅</div>
<div class="name" :style="state == true ? 'color:red' : 'color:black'">麻辣牛锅</div>
// 2、直接对象形式  
<div class="name" :style="{fontSize:`${size}px`}">麻辣火锅</div>
// 3、数组形式
<div class="name" :style="[styleObj1,styleObj2]">麻辣香锅</div>
// 4、复合型
<div class="name" :style="[{color:state ? 'red' : 'black'},styleObj2]">麻辣香锅</div>
// 4、调用方法形式
<div class="name" :style="setStyle()">麻辣鸡煲</div>
```

