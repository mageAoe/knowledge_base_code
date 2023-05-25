## 说一下CSS盒模型
  在HTML页面种的所有元素都可以看成是一个盒子
  盒子的组成： 内容content、内边距padding、边框border、外边距margin 
  盒模型的类型
      - 标准盒模型：
          margin + border + padding + content
      - IE盒模型： 
          margin + content（border + padding）
  控制和模型的模式： box-sizing：border-box

## CSS 选择器的优先级
  CSS的特性： 继承性、层叠性、优先级
  优先级： 
    标签、类/伪类/属性、全局选择器、行内样式、id、!important
  
  !important > 行内样式 > id >   类/伪类/属性 >  标签 > 全局选择器

## 隐藏元素的方法有哪些
  display: none  ---> 元素在页面上消失，不占据空间
  opacity: 0      ---> 设置元素的透明度为0，元素不可见，占据空间位置
  visibility: hidden    ---> 让元素消失，占据空间位置
  position: absolute  从当前位置踢出去
  clip-path      把元素剪切掉

## px 和rem的区别
  px是像素，显示器上给我们呈现画面的像素，每个像素的大小是一样，绝对单位长度
  rem，相对单位，相对于html根节点的font-size的值，直接给html节点的font-size：62.5%
        1rem = 10px ： 16px * 62.5% = 10px

## 重绘重排有什么区别
  重排（回流）：布局引擎会根据所有的样式计算出盒模型在页面上的位置和大小
  重绘： 计算好盒模型的位置、大小和其他一些属性之后，浏览器就会根据每个和模型的特性进行绘制
  浏览器的渲染机制：
    对DOM的大小、位置进行修改后，浏览器需要重新计算元素的这些几何属性，就叫重排
    对DOM的样式进行修改，比如color和background-color，浏览器不需要重新计算几何属性的时候，直接绘制了该元素的新样式，那么这里就只触发重绘
  

## 让一个元素水平垂直居中的方式
  1. 定位 + margin
```html
<style>
  .father{
    width:400px;
    height:400px
    border:1px solid;
    position:relative;   
  }
  .son{
    position:absolute;
    width:200px;
    height:200px;
    background:red;
    top:0
    right:0
    bottom:0;
    left: 0;
    margin: auto;
  }
 </style>
  
  <div class='father'>
    <div class='son'></div>
  </div>
 ```
  2. 定位 + transform
```html
<style>
        .father{
            width: 400px;
            height: 400px;
            border: 1px solid;
            position: relative;
        }
        .son{
            width: 200px;
            height: 200px;
            background: teal;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    </style>
    <div class="father">
        <div class="son"></div>
    </div>
```
  3. flex布局
```html
<style>
        .father{
            width: 400px;
            height: 400px;
            border: 1px solid;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .son{
            width: 200px;
            height: 200px;
            background: teal;
        }
    </style>
    <div class="father">
        <div class="son"></div>
    </div>
```
  4. grid布局
```html
<style>
        .father{
            width: 400px;
            height: 400px;
            border: 1px solid;
            display: grid;
            margin: 0 auto;
        }
        .son{
            width: 200px;
            height: 200px;
            background: teal;
            justify-self: center;
            align-self: center;
        }
    </style>
    <div class="father">
        <div class="son"></div>
    </div>
```
  5. table布局
```html
<style>
        .father{
            width: 400px;
            height: 400px;
            border: 1px solid;
            display: table-cell;
            /* 垂直居中 */
            vertical-align: middle;
            /* 水平居中 */
            text-align: center;
            margin: 0 auto;
        }
        .son{
            width: 200px;
            height: 200px;
            background: teal;
            display: inline-block;
        }
    </style>
    <div class="father">
        <div class="son"></div>
    </div>
```
## CSS的那些属性可以继承，那些属性不可以继承

子元素可以继承父元素的样式
1. 字体的一些属性：font
2. 文本的一些属性：line-height、color、word-spacing
3. 元素的可见性：visibility：hidden
4. 表格布局的属性：border-spacing
5. 列表的属性： list-style
6. 页面的样式属性： page
7. 声音的样式属性

## 有没有用过预处理器

预处理语言增加了变量、函数、混入等强大得功能
SASS LESS

## HTML语义化的理解

在写HTML页面结构时所用的标签有意义

头部用head 主题用main   底部用foot

让HTML结构更加清晰，方便团队写作，利于开发，有利于爬虫和SEO


### H5C3有哪些新特性

H5:
    1. 语义化标签
    2. 新增音频视频
    3. 画布canvas
    4. 数据存储localstorage 、 sessionStorage
    5. 增加了表单控件
C3： 
    1. 新增选择器： 属性选择器、伪类选择器、伪元素选择器
    2. 新增了媒体查询
    3. 文字阴影
    4. 边框
    5. 盒子模型
    6. 渐变
    7. 过度
    8. 自定义动画
    9. 背景属性
    10. 2D\3d

## rem 是如何做适配的？

rem是相对长度，相对于根元素（html）的font-size（一般为62.5%）属性来计算大小，通常来做移动端的适配
rem是根据根元素fongt-size计算值得倍速

16px * 62.5% = 10px

## 解决了哪些移动端兼容问题
1.  当设置样式overflow：scroll/auto时，IOS上的滑动会卡顿
      -webkit-overflow-scrolling：touch；
2. 在安卓环境下placeholder文字设置行高时会偏上
      input有placeholder属性的时候不要设置行高
3. 移动端字体小于12px时异常显示
      应该先把整体放大一倍，然后再用transform进行缩小
4. ios下input按钮设置了disabled属性为true显示异常
      ```input[type=button]{opacity：1}```
5. 安卓手机下取消语音输入按钮：
      ```input：：-webkit-input-speech-button{display： none}```
6. ISO下取消input输入框在输入英文字母默认大写
      ```<input autocapitalize='off' autocorrect='off'>```
7. 禁用IOS和安卓用户选中文字
      添加全局CSS样式：-webkit-user-select：none
8. 禁止IOS弹出各种窗口
      ```-webkit-touch-callout：none```
9. 禁止IOS识别长串数字为电话
       ``` 添加mete属性<meta conten='telephone=no' name='format-deection'>```
