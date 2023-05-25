# 正则表达式


转义字符  \

\f 换页符

\n回车

\r行结束 

\t缩进 

\v 垂直制表符

## RegExp

#### 创建形式

- 第一种
```
i 忽视大小写

g 全局匹配

m 执行多行匹配

var reg = /abc/ i,g,m

```
- 第二种

```
var reg = new RegExp('abc','i')

```

## test

reg.test(str) 返回true ，false

## match

string.match(reg) 返回匹配成功的值

match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。

该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。

**返回值** : 存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。

```
<script type="text/javascript">

var str="1 plus 2 equal 3"
document.write(str.match(/\d+/g)) //1,2,3

</script>

```


## exec()

reg.exec(str)

```
lastIndex  与exec相辅相成

var reg  =  /ab/g;
var str = 'abababab'
console.log(reg.exec(str)) // ["ab", index: 0, input: "abababab", groups: undefined]

console.log(reg.lastIndex) //2,与上面的index一起的，还可以修改

```


## search() 返回匹配到的位置

str.search(reg)

Search方法:用于检索字符串中指定的子字符串或者是正则匹配到的子字符串，并返回下标

## split()

str.split(reg)

split() 方法用于把一个字符串分割成字符串数组。

```
var str="How are you doing today?"

document.write(str.split(/\s/g)) //How,are,you,doing,today?   
```

## replace()

str.replace(reg)

Replace，用于在字符串中，用字符串替换另一些字符，或者替换正则匹配到的字符串

```
(\w)\1，这个括号后面跟着的就相当于使用前面的规则

//aabb 反过来
var reg = /(\w)\1(\w)\2/;
var str = 'aabb'

str.replace(reg,'$2$2$1$1') // bbaa

```

```
将the-first-name 换成小驼峰

var reg = /-(\w)/g
var str = 'the-first-name'
str.replace(reg,function($,$1){
    return $1.toUpperCase()
})

```


---

## RegExp的使用方法

- 匹配多个连续的数字

```
一个[]代表匹配一位数

var reg = /[0-9][0-9][0-9]/g

```
- 匹配除了什么

```
匹配前面不是a，后面不是b的数

var reg = /[^a][^b]/g

var str = 'ab1cd' //['b1','cb']

```

- 匹配括号

```
这里面的  |  是或的意思，表示可以匹配abc0-9，也可以匹配bcd0-9

var reg = /(abc|bcd)[0-9]/g

var str = 'bcd2'

```

## 元字符

\w
```
\w  === [0-9A-z_]
var reg = /\w/g

var str = '46fwge'//["4", "6", "f", "w", "g", "e"]

```

\W

```
就是除了小w的全都能匹配

\W === [^\w]

```

\d
```
\d === [0-9]
var reg = /\d\d\d/g;
var str = '123' //'123'

```
\D

```
除了小d的规则都能匹配
\D === [^\d]

var reg = /\D/g
var str = 'a123b'
var res = str.match(reg) // ["a", "b"]

```

\s
```


\s === [\t\f\n\r\v]


```

\S

```
\S === [^\s]


```

\b
```
\b === 单词边界

```

\B

```
\B === 非单词边界

```

.

```
. === [^\r\n]


```

## 量词

n+  {1,infinity}

n*  {0,infinity}

n?  {0,1}

n{x}  {x} 匹配个

n{x,y}  {3,5} 填多少都可以

n{x,}   {1,} === n+ 

还可以写 {2，}

n$ 匹配任何结尾为n的字符串

^n 匹配任何开头为n的字符串

- 正向预查 、正向断言

?=n

?!n

```
只匹配出a后面有b的那个a

var str = 'abaaaaa'
var reg = /a(?=b)/g

```

```
只匹配出a后面没有b的那个a

var str = 'abaaaaa'
var reg = /a(?！b)/g 

```

最全的常用正则表达式大全：https://zhuanlan.zhihu.com/p/33683962

[最全的常用正则表达式大全](https://mp.weixin.qq.com/s?src=3&timestamp=1634268555&ver=1&signature=UjH5AXilQDbckV1N3Kjh9RCGhWCbGALOc4NP2W56*Ar6D25rZTncjy4En*LmCHbL0mYOdLy8pwfIYCNd7F-IONFHyLsmvR35O1q5Kj-NFvNDwfBWIdiN2Hj01E-e-owke2HX2J3czkKP-BLu1TD-EE*kAnsucvWzXJaino0bLFQ=)

https://regexper.com/#%2F%5E%5C%2Fapi%5C%2Fblog%5C%2F%5B%5E%2F%5D%2B%24%2F

[你是如何学会正则表达式的？](https://www.zhihu.com/question/48219401/answer/742444326)

[正则大全](https://any86.github.io/any-rule/)