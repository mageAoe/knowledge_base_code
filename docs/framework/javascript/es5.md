# ES5

## replace

- 接收两个参数

​		a. 第一个参数可以是正则，可以是字符串

​		b. 第二个参数可以是要替换的字符串，也可以是 **function**

 - 高级用法

```js
/**
   * @param rs：匹配结果
   * @param $1:第1个()提取结果
   * @param $2:第2个()提取结果
   * @param offset:匹配开始位置
   * @param source：原始字符串
   */
this.replace(/(^\s+)|(\s+$)/g,function(rs,$1,$2,offset,source){
    //arguments中的每个元素对应一个参数
    console.log(arguments);
  });
};

```

## MATH

### Math.ceil() 向上取整

```js
var num = 123.4546;
Math.ceil(num) //124
```

### Math.foolr() 向下取整

```
var num = 123.4546;
Math.foolr(num) //123
```

### Math.random() 取随机数

```
取 0-1 的 开区间数
```

## Number 

### toFixxed 保留两位有效数字

```js
var num = 12.3435343;
num.toFixed() //12
num.toFixed(2) // '12.34'
// 可以用来补零
let num1 = 14
num1.toFixed(2) // '14.00'
```

## 事件处理模型

- addEventListener(type,fn,false) **false为事件冒泡，true为事件捕获**

### 事件冒泡

> 结构上嵌套关系的元素，会存在 冒泡的功能，即同一事件，自子元素向父元素（自底向上）

- 取消事件冒泡

```js
ediv.addEventListener('cilck',function(e){
    e.stopPropagation()
},false)
ie独有:e.cancelBubble = true; 现在chorme也实现了
```

- 取消事件的默认行为

```js
默认事件 --》 表单提交，a标签跳转，右键菜单

1、return false

2、e.preventDefault() //ie9不兼容

3、e.returnValue = false //兼容ie

<a src='javascript:void()'>可以取消默认事件</a>
封装一个阻止默认事件兼容函数
```

### 事件捕获

> 结构上嵌套关系的元素，会存在 捕获的功能，即同一事件，自父元素向子元素（自上向下）

触发顺序，先捕获，后冒泡

- focus，blur，change，submit，reset，selec等事件不冒泡

## 数组

### splice

> splice主要能实现原[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)的删除、替换，插入

```js
let colors = ['red','blue','green','sykblue']
colors.splice(1,2) // 删除colors 中1、2两项, 返回被删除项 ['blue', 'green']
console.log(colors) // ['red', 'sykblue']

colors.splice(1,0,'yellow','black') // 插入'yellow','black' ， 返回被删除项[]
console.log(colors) // ['red', 'yellow', 'black', 'sykblue']

colors.splice(1,2,'white','teal') // 替换 1、2元素 ， 返回被删除项 ['yellow', 'black']
console.log(colors) // ['red', 'white', 'teal', 'sykblue']
```

### slice

> 可以取出数组中的任意值，并返回一个新的数组
>
> splice中的第二个参数代表个数
>
> slice中的第二个参数代表元素的位置，但是只取出这个元素之前的值，不包含这个位置的值。

```js
let colors = ['red','blue','green','sykblue']
colors.slice(1,2) // ['blue']
console.log(colors) // ['red', 'blue', 'green', 'sykblue']
```

## 事件

@mouseenter、@mousedown等鼠标事件[非鼠标点击事件]时，发现事件不触发，失效了

此时应该在@mouseenter、@mouseenter等鼠标事件加上[native](https://so.csdn.net/so/search?q=native&spm=1001.2101.3001.7020)属性就好了

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符

```vue
<base-input v-on:focus.native="onFocus"></base-input>
```

- mousedown

当鼠标指针移动到元素上方，并按下鼠标按键（左、右键均可）时，会发生 mousedown 事件。
与 click 事件不同，mousedown 事件仅需要按键被按下，而不需要松开即可发生。

- mouseup

当在元素上松开鼠标按键（左、右键均可）时，会发生 mouseup 事件。
与 click 事件不同，mouseup 事件仅需要松开按钮。当鼠标指针位于元素上方时，放松鼠标按钮就会触发该事件。

- click

当鼠标指针停留在元素上方，然后按下并松开鼠标左键时，就会发生一次 click 事件。
注意：触发click事件的条件是按下并松开鼠标左键！，按下并松开鼠标右键并不会触发click事件。

### 针对我们的手机H5，提供了手指触摸等事件

| 事件       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| touchstart | 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。 |
| touchmove  | 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。 |
| touchend   | 当手指从屏幕上离开的时候触发。                               |

**跟踪触摸的属性**

| 属性                            | 描述                                                |
| ------------------------------- | --------------------------------------------------- |
| touches                         | 表示当前跟踪的触摸操作的touch对象的数组。           |
| targetTouches                   | 特定于事件目标的Touch对象的数组                     |
| changeTouches                   | 表示自上次触摸以来发生了什么改变的Touch对象的数组。 |
| **每个Touch对象包含的属性如下** |                                                     |
| 属性                            | 描述                                                |
| :----:                          | :----:                                              |
| clientX                         | 触摸目标在视口中的x坐标。                           |
| clientY                         | 触摸目标在视口中的y坐标。                           |
| identifier                      | 标识触摸的唯一ID。                                  |
| pageX                           | 触摸目标在页面中的x坐标。                           |
| pageY                           | 触摸目标在页面中的y坐标。                           |
| screenX                         | 触摸目标在屏幕中的x坐标。                           |
| screenY                         | 触摸目标在屏幕中的y坐标。                           |
| target                          | 触目的DOM节点目标。                                 |
