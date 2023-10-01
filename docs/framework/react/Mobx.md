# 十五. Mobx

https://cn.mobx.js.org/

## 1. Mobx介绍

(1) Mobx是一个功能强大，上手非常容易的状态管理工具。 

(2) Mobx背后的哲学很简单: 任何源自应用状态的东西都应该自动地获得。 

(3) Mobx利用getter和setter来收集组件的数据依赖关系，从而在数据发生变化的时 候精确知道哪些组件需要重绘，在界面的规模变大的时候，往往会有很多细粒度更新。

## 2. Mobx与redux的区别

- Mobx写法上更偏向于OOP 

- 对一份数据直接进行修改操作，不需要始终返回一个新的数据 

- 并非单一store,可以多store。 

- Redux默认以JavaScript原生对象形式存储数据，而Mobx使用可观察对象

**优点**

a. 学习成本小 

b. 面向对象编程, 而且对 TS 友好 

**缺点：**

 a. 过于自由：Mobx提供的约定及模版代码很少，代码编写很自由，如果不做一些约 定，比较容易导致团队代码风格不统一， 

b. 相关的中间件很少，逻辑层业务整合是问题

## 3. Mobx的使用

（1）observable 和 autorun

```js
import { observable, autorun } from 'mobx'

let numberObs = observable.box(10)
let nameObs = observable.box('scq')

autorun(() => {
  // 第一次执行， 之后每次改变（必须是这个函数用的值改变）也会执行
  console.log('numberObs', numberObs.get());
})

autorun(() => { 
  console.log('nameObs', nameObs.get());
})

setTimeout(() => {
  numberObs.set(20)
}, 1000);

setTimeout(() => {
  nameObs.set('www')
}, 2000);

let myobj = observable({
  name: 'scq',
  age: 100
})

autorun(() => { 
  console.log('myobj', myobj.name);
})

setTimeout(() => {
  // 如果这个修改的是 age ，但是在 autorun函数中使用的是name，那么它将不会执行
  myobj.age = 50
}, 3000);
```

(2) action，runInAction和严格模式

- 这是直接使用

```js
import { observable } from 'mobx'
const store = observable({
  show: true,
  list: [],
  cityName: '北京'
})
export default store
```

- 这是严格模式

```js
import { observable,configure,action } from 'mobx'
configure({
  enforceActions: 'always'
})
const store = observable({
  show: true,
  list: [],
  cityName: '北京',
  changeShow () { 
    this.show = true
  },
  changeHide () { 
    this.show = false
  }
}, {
  changeShow: action,
  changeHide: action // 标记
})

export default store
```

（3）异步以及装饰器

```js
import { observable,configure,action,runInAction } from 'mobx'
import axios from 'axios'
configure({
  enforceActions: 'always'
})
class Store { 
  @observable show = true
  @observable list = []
  @observable cityName = '北京'

  @action changeShow () {
    this.show = true
  }
  @action changeHide () {
    this.show = false
  }
  @action async getList () { 
    const list = await axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=582338',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16641133352622176318455809","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(({ data }) => { 
      return data.data.cinemas
    })
    runInAction(() => { 
      this.list = list
    })
  }
}
export default new Store()
```

## 4. mobx-react的使用

(1) react 组件里使用

​	 @observer observer 函数/装饰器可以用来将 React 组件转变成响应式组件。

 (2) 可观察的局部组件状态 

​	@observable 装饰器在React组件上引入可观察属性。而不需要通过 React 的冗长和强制性的 setState 机制来管 理。

(3) mobx-react 在类组件跟函数式组件写法不同

## 5. 支持装饰器

```shell
npm i @babel/core @babel/plugin-proposal-decorators @babel/preset-env
```

**创建 .babelrc**

```js
{
    "presets": [
    	"@babel/preset-env"
    ],
	"plugins": [
        [
        	"@babel/plugin-proposal-decorators",
        	{
        		"legacy": true
        	}
        ]
	]
}
```

**创建config-overrides.js**

```js
const path = require('path')
const { override, addDecoratorsLegacy } = require('customize-cra')
function resolve(dir) {
	return path.join(__dirname, dir)
}
const customize = () => (config, env) => {
	config.resolve.alias['@'] = resolve('src')
    if (env === 'production') {
    	config.externals = {
        'react': 'React',
        'react-dom': 'ReactDOM'
    	}
    }
	return config
};
module.exports = override(addDecoratorsLegacy(), customize())
```

**安装依赖**

```shell
npm i customize-cra react-app-rewired
```

**修改package.json**

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
},	
```

**vs code设置**

Implicit Project Config: Experimental Decorators