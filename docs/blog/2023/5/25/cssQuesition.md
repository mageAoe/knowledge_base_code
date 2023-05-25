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

## 方法三 :使用伪元素

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
