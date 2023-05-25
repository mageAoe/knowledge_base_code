# 高级函数

## 扁平数组转Tree(一)

```js
// 测试数据
let flatArr = [
  { id:1, title:'标题1', parent_id:0 },
  { id:2, title:'标题2', parent_id:0 },
  { id:3, title:'标题2-1', parent_id:2 },
  { id:4, title:'标题3-1', parent_id:3 },
  { id:5, title:'标题4-1', parent_id:4 },
  { id:6, title:'标题2-2', parent_id:2 },
]

const convert = (list) =>{
  const result = []
  const map = list.reduce((pre,cur)=>{
    pre[cur.id] = cur
    return pre
  },{})

  for (const item of list) {
    if(item.parent_id === 0){
      result.push(item)
      continue
    }
    if(item.parent_id in map){
      const parent = map[item.parent_id]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return result
}
```

## 扁平数组转Tree(二)

``` js
const convert2 = (list)=>{
  const result = []
  list.forEach(r => {
    r.childer = list.filter(re=> re.parent_id === r.id)

    if(r.parent_id === 0){
      result.push(r)
    }
  });
  return result
}
```

## 实现forEach方法

> 接收一个函数，四个参数,没有返回值

- ele 数组元素
- index 下标
- self 本身自己
- obj 传递的参数可以改变this指向


```javascript

Array.prototype.forEach()

arr.forEach(function(ele,index,self)，obj)

```

### 实现

```js
var arr = [
    {name:'sun',age:'24'},
    {name:'sun',age:'24'},
    {name:'sun',age:'24'},
    {name:'sun',age:'24'}
]

function deal(ele,index,self){
    console.log(ele,index,self,this)
}

Array.prototype.myforEach = function(func){
    var len = this.length;
    var _this = arguments[1] != undefined ? arguments[1] : window
    for(var i = 0;i<len;i++){
        func.apply(_this,[this[i],i,this])
    }
}

arr.myforEach(deal)

```

## 实现 filter 方法

> 执行完后，会返回一个新的数组

> 接收一个函数，四个参数

- ele 数组元素
- index 下标
- self 本身自己
- obj 传递的参数可以改变this指向

### 使用

```js
var res = arr.filter(function(ele){
    return ele.age > 20  //判断如果是true的话留下，false就过滤掉
})

console.log(res)
```

### 实现

```javascript

Array.prototype.myFilter = function(func){
    var len = this.length;
    var reg = [];
    var _this = arguments[1] || window
    for(var i =0;i<len;i++){
        func.apply(_this,[this[i],i,this]) && reg.push(this[i])
    }
    return reg
}

var res1 = arr.myFilter(function(ele){
    return ele.age > 20
})

console.log(res1)
```

## 实现 map 方法

> a->b 映射  ，按里面的规则返回新数组

> 接收一个函数，四个参数

- ele 数组元素
- index 下标
- self 本身自己
- obj 传递的参数可以改变this指向

### 使用

```js
var obj = {}

var res = arr.map(function(ele,index,self){
    console.log(ele,index,self)
    return ele.name
},obj)

console.log(res)
```

### 实现

```js
Array.prototype.myMap = function(func){
    var len = this.length;
    var arr = [];
    var _this = arguments[i] || window
    for(var i=0;i<len;i++){
        arr.push(func.call(_this,this[i],i,this))
    }
    return arr;
}

var res = arr.myMap(function(ele,index,self){
    console.log(ele,index,self)
    return ele.name
})
console.log(res)
```