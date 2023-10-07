---
# 取二三级标题生成目录
outline: [2,3]
---
# Immutable

## 1.Immutable.js介绍

https://github.com/immutable-js/immutable-js

每次修改一个 Immutable 对象时都会创建一个新的不可变的对象，在新对象上操作并不会影响到原对象的数据。

这个库的实现是深拷贝还是浅拷贝？

## 2. 深拷贝与浅拷贝的关系

(1) var arr = { } ; arr2 = arr ; 

(2) Object.assign() 只是一级属性复制，比浅拷贝多拷贝了一层而已。

 (3) const obj1 = JSON.parse(JSON.stringify(obj)); 数组，对象都好用的方法(缺点: 不能有undefined)

## 3. Immutable优化性能的方式

Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要 保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用 了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点， 其它节点则进行共享。

https://upload-images.jianshu.io/upload_images/2165169-cebb05bca02f1772

## 4. Immutable中常用类型（Map，List）

（1）Map

```js
const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50
```

(2)List

```js
const { List } = require('immutable');
const list1 = List([ 1, 2 ]);
const list2 = list1.push(3, 4, 5);
const list3 = list2.unshift(0);
const list4 = list1.concat(list2, list3);
assert.equal(list1.size, 2);
assert.equal(list2.size, 5);
assert.equal(list3.size, 6);
assert.equal(list4.size, 13);
assert.equal(list4.get(0), 1);
//push, set, unshift or splice 都可以直接用，返回一个新的immutable对象
```

(3) merge , concat

```js
const { Map, List } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
const map2 = Map({ c: 10, a: 20, t: 30 });
const obj = { d: 100, o: 200, g: 300 };
const map3 = map1.merge(map2, obj);
// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
const list1 = List([ 1, 2, 3 ]);
const list2 = List([ 4, 5, 6 ]);
const array = [ 7, 8, 9 ];
const list3 = list1.concat(list2, array);
// List [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

```

(4) toJS

```js
const { Map, List } = require('immutable');
const deep = Map({ a: 1, b: 2, c: List([ 3, 4, 5 ]) });
console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
JSON.stringify(deep); // '{"a":1,"b":2,"c":[3,4,5]}'
```

(5)fromJS

```
const { fromJS } = require('immutable');
const nested = fromJS({ a: { b: { c: [ 3, 4, 5 ] } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }
console.log(nested2.getIn([ 'a', 'b', 'd' ])); // 6
//如果取一级属性 直接通过get方法，如果取多级属性 getIn(["a","b","c"]])
//setIn 设置新的值
const nested3 = nested2.setIn([ 'a', 'b', 'd' ], "kerwin");
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: "kerwin" } } }
//updateIn 回调函数更新
```

## 5. Immutable+Redux的开发方式

```js
import { fromJS } from 'immutable'

const cityReducer = (prevState = { // 参数默认值
  cityName: '北京'
}, action) => {
  // let newState = {...prevState}
  let newState = fromJS(prevState)
  switch (action.type) { 
    case 'change-city':
      // newState.cityName = action.value
      return newState.set('cityName', action.value).toJS()
    default:
      return prevState
  }
}
export default cityReducer
```

## 6. 缺点

容易跟原生混淆 

文档与调试不方便
