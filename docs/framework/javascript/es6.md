# ES6 ~ 至今

## 双问号【??】

```js
value1 ?? value2
```

?? 在 value1 和 value2 之间，只有当 value1 为 null 或者 undefined 时取 value2 ，否则取 value1
（0,false,""被认为是有意义的，所以还是取value1）

```js
undefined ?? 'default'  //'default'
null ?? 'default'  //'default'
false ?? 'default' //false
'' ?? 'default'   //''
0 ?? 'default'   //0
```

## 可选链操作符【?.】

当访问多层对象属性(比如 res.data.list)时，如果属性res.data为空，则会报引用错误
所以使用可选链【 ?.】 对一个为null或者undefined属性的安全引用

```js
let dataList = res?.data?.list
```


