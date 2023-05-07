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