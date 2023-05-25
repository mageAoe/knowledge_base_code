# JS新运算符 ?.  ??  ??= ||= &&= 的含义及用法


## ?.可选链操作符

> 可选链允许读取连接对象链深处的属性值而不必明确验证链中每个引用是否有效。该表达式短路返回值

```语法：obj?.prop   obj?.[expr]    arr?.[index]    func?.(args)```

例如一个表达式

```js
res && res.data && res.data.status 
```

意思很明确，这个表达式在res和res.data存在的时候会返回res.data.status。为避免属性值不存在的情况，需要用到条件表达式或者三目运算符之类的操作。

使用可选链操作符后

```js
res?.data?.status
```
使用可选链后不必担心抛出不存在的异常，写法更简介。可选链操作符不止可用于常规对象，还可以用于方法，数组索引等。


## ??空值合并操作符

> 只有当左侧为null和undefined时才会返回右侧的值，否则返回左侧操作数。

例如: 

```js
'hello world' ?? 'hi' 
// 'hello world'

'' ?? 'hi' 
// ''

false ?? 'hi' 
// false

console.log(0 ?? 'hi');
// 0

null ?? 'hi'  
// 'hi'

undefined ?? 'hi'
// 'hi'
```

## ||=  &&=  ??=逻辑赋值运算符

> 先进行逻辑运算，再根据逻辑结果视情况进行赋值运算

或赋值运算符 ||=

```x ||= y相当于x || (x = y)```

```js
const flag = {}
flag.id ||= 1
console.log(flag.id); // 1
```

## 与赋值运算符&&=

```x &&=y相当于x && (x = y)```

```js
const flag = {}
flag.id &&= 1
console.log(flag); // {}
```

## 空值赋值运算符??=

> 当左侧为null或undefined时就把右侧的值赋给左侧，就算右侧是null和undefined也会赋值; 其他所有值都不会进行赋值

```js
const flag = {name: 'tt'}
flag.id ??= 1
flag.name ??= 'oo'
console.log(flag); // {name: 'tt', id: 1}

```
