
**要求最后输出**

```js
[
  {
    year: 2022,
    children: []
  },
  {
    year: 2023,
    children: []
  }
]
```

**测试数据**

```js
const arr = [
    {
        year: '2023',
        color: '#e88345',
        createTime: '2023-02-29'
    },
    {
        year: '2023',
        color: '#2f8f22',
        createTime: '2023-01-29'
    },
    {
        year: '2023',
        color: '#d8001b',
        createTime: '2023-02-1'
    },
    {
        year: '2022',
        color: '#d8001b',
        createTime: '2022-02-05'
    },
    {
        year: '2022',
        color: '#2f8f22',
        createTime: '2022-01-11'
    },
    {
        year: '2022',
        color: '#e88345',
        createTime: '2022-11-23'
    },
    {
        year: '2022',
        color: '#2f8f22',
        createTime: '2022-12-09'
    }
]
```

**答案揭晓：**

```js
const getFormatArr = (arr) => {
    return Object.values(
        arr.reduce((prev, next) => {
            const [year] = next.createTime.split('-')
            prev[year] ||= { year, children: [] }
            prev[year].children.push(next)
            return prev
        }, {})
    )
}


console.log(getFormatArr(arr));
```