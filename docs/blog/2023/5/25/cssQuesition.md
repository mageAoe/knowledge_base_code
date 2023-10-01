# Css 常见问题


## margin-top塌陷

> 使用bfc black format context
如何触发：

- position：absolute

- display：inline-block
- float：left、right
- overflow：hidden


## 兄弟级的盒子共用margin

同时设置的margin无效
```html
<div class="box1">1</div>
<div class="box2">2</div>


 <style>
        .box1{
            background-color: red;
            margin-bottom: 100px;
        }
        .box2{
            background-color: green;
            margin-top: 100px;
        }
    </style>
```

- 需要使用bfc来解决

```html
<div>
    <div class="box1">1</div>
    <div class="box2">2</div>
</div>


div{
    overflow:hidden;
}


```

## float 浮动及其影响

-  浮动元素产生了浮动流

> 所有产生了浮动流的元素，块级元素看不到他们

> 产生了bfc的元素和文本类属性的元素以及文本都能看到他们

### 办法一 ：直接clear：both

```html
   <style>
        *{
            margin: 0;
            padding: 0;
        }
        .box1{
            border: 1px solid black;
            
        }
        .box1 div{
            float: left;
            width: 100px;
            height: 100px;
            background: red;
        }
        p{
            clear: both;
        }
    </style>

<div class="box1">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <!--在浮动元素的后面加上一个p元素，清除浮动即可-->
    <p></p>
</div>

```

### 方法二 ：使用overflow：hidden / auto

```html
<style>
        *{
            margin: 0;
            padding: 0;
        }
        .box1::after{}
        .box1{
            overflow: auto;
            border: 1px solid black;
        }
        .box1 div{
            float: left;
            width: 100px;
            height: 100px;
            background: red;
        }
        

</style>


<div class="box1">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>

```

### 方法三 :使用伪元素

```html
<style>
        *{
            margin: 0;
            padding: 0;
        }
        .box1::after{
            content:"";
            clear:both;
            display:black;
        }
        .box1{
            border: 1px solid black;
        }
        .box1 div{
            float: left;
            width: 100px;
            height: 100px;
            background: red;
        }
</style>

<div class="box1">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>
```



## 伪元素

伪元素天生是：行级元素 inline

div::before{}

div::after{}

## 单行文本溢出，用...代替

```html
<style>
        *{
            margin: 0;
            padding: 0;
        }
        p{
            width: 300px;
            height: 30px;
            line-height: 30px;
        /*使用以下的三件套即可实现*/
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
</style>

<p>是一款开源的、可嵌入的 Markdown 在线编辑器（组件），基于 CodeMirror、jQuery 和 Marked 构建。</p>
```

## 背景图片处理

```html
<style>
        a{
            display: inline-block;
            text-decoration: none;
            color: #424242;
            width: 240px;
            height: 60px;
            border: 1px solid black;
            background: url(taobao.jpg);
            background-size: 240px 60px;
            /*第二种解决办法*/
            padding-top: 60px;
            height: 0;
            overflow: hidden;
            /*第一种解决办法*/
            text-indent: 240px;
            white-space: nowrap;
            overflow: hidden;
        }
</style>

<a href="www.taobao.com">淘宝网</a>
```

## css文字向右对齐

```css
h1 {text-align: center}
h2 {text-align: left}
h3 {text-align: right}
```


## 强制一行溢出显示省略号(...)

```css
overflow:hidden;//超出的隐藏
text-overflow:ellipsis;//显示省略符号来代表被修剪的文本。
white-space:nowrap;//不换行
```

## 强制两行甚至多行

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2; //多行在这里修改数字即可
-webkit-box-orient: vertical;
```

## 英文单词换行

```css
word-break:break-all 允许在单词内换行。
```

## 文本两端对齐

```css
<body>
    <div class="box1"><span class="name">姓名</span>:</div>
    <div class="box2"><span class="id">身份证号</span>:</div>
</body>
.name{
		width: 63px; 
		display: inline-block; 
		text-align: justify;
		text-align-last: justify;
}
```

## overflow-x:auto无效

> 原因：1、子元素用了浮动；2、父元素自动换行了

> 解决方法

```css
overflow-x: auto; // 水平方向内容溢出显示滚动条
white-space: nowrap; // 不换行
```

## flex:1

- flex：1是（flex-grow：1、flex-shrink：1、flex-basis：auto）的缩写
- flex-grow：设置的值为扩张因子，默认为0，剩余空间将会按照这个权重分别分配给子元素项目
- flex-shrink：flex元素仅在默认宽度之和大于容器的时候才会发生收缩。默认属性值为1，所以在空间不够的时候，子项目将会自动缩小
- flex-basis：flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
- 所以flex属性的默认值为：0 1 auto （不放大会缩小）
- **flex为none**：0 0 auto （不放大也不缩小）
- **flex为auto**：1 1 auto  （放大且缩小）
- **flex:1===flex:1 1 auto（放大且缩小）**


## css 宽高比

```css
aspect-ratio:宽/高
```

## html常用占位符

```html
&nbsp;	英文半角空格不换行
&#160;	英文半角空格不换行
&#12288;	中文全角空格
&ensp;	半角空格
&#8194;	半角空格
&#8195;	全角空格
&emsp;	全角空格
&#8197;	四分之一全角空格
&#32;	英文半角空格
```

## 媒体查询

```css
@media (max-width:768px){
            /* 手机样式 */
        }

        @media(min-width:767px){
            /* 一般大于手机的样式 */
        }
```

```css
/* <768px */
        @media screen and (max-width:768px) {
            .col{
                width: 100%;
            }
        }
        /* >=992 and  */
        @media screen and (min-width:992px){
            .col{
                width: 49%;
            }
        }
        /* >=768px and <1200px */
        @media screen and (min-width:768px) and (max-width:1200px){
            .col{
                width: 48%;
            }
        }
        /* >=1200px */
        @media screen and (min-width: 1200px) {
            .col{
                width: 33%;
            }
        }
```