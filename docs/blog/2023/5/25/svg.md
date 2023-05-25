
# SVG矢量图，放大不会失真，适合大面贴图，通常动画较少或者较简单，标签和css去画

> 标签

- svg
- line 画线段
- rect 画矩形

```
<style>
    .line1{
        stroke: black;
        stroke-width: 5px;
    }
    .line2{
        stroke: pink;
    }
</style>
//viewBox 可以做地图比例尺

<svg width='500px' height='300px' viewBox = '0,0,250,150' style='border:1px solid black;'>
    // x1 y1 ：水平垂直坐标；x2 y2 ： 水平垂直坐标 两点决定一条线段
    <line x1='100' y1='100' x2='200' y2='100' class="line1"></line>
    <line x1='200' y1='100' x2='200' y2='200' class="line2"></line>
    // x y ：水平垂直坐标 ；rx相当于border-radius
    <rect height='50' width='100' x='0' y='0' rx ='10'></rect>
</svg>

```
![7.png](https://note.youdao.com/yws/res/7/WEBRESOURCEcf657afe601fd9ec24df905936feea57)

- circle 画圆
- ellipse 画椭圆
- polyline 画折线

```
circle{
    fill: transparent;
    stroke: thistle;
}
polyline{
    fill: transparent; //图形默认都是填充的，这个样式可以将填充干掉
    stroke: violet; // 相当于canvas里面的stroke画笔
}

<svg width='500px' height='300px' style='border:1px solid black;'>
    // r 半径  cx ：x坐标   cy ： y坐标
    <circle r='50' cx='100' cy ='200'></circle>
    // rx 水平半径 ；cy 垂直半径   
    <ellipse rx = '100' ry='50' cx = '300' cy ='100'></ellipse>
    // points 坐标 
    <polyline points='0 0,50 50,50 100,100 100 ,100 50'></polyline>
</svg>
```
![1.png](https://note.youdao.com/yws/res/a/WEBRESOURCEe628948b455010ddc1fc2527d472fa8a)

- polygon 画多边形
- text 文本

```
polygon{
    fill: transparent;
    stroke: violet;
}
text{
    stroke:springgreen;
}
// 跟折线的本质区别就是，会自动封闭，首尾相连
<polygon points='0 0,50 50,50 100,100 100 ,100 50'></polygon>
// 只有x y坐标
<text x= '200' y='50'>chaoqun</text>
```
![2.png](https://note.youdao.com/yws/res/4/WEBRESOURCE179fd385fe198840b553cbde030ddb84)

```
polyline{ //折线的补充样式
    fill: transparent;
    stroke: violet;
    fill-opacity: 0.3;
    stroke-opacity: 0.5;
    stroke-linecap: round;
    stroke-linejoin: bevel;
}
```

- path路径
```
path{
    stroke:steelblue;
    fill: transparent;
}
// M L H V区分大小，大写是绝对位置，小写是相对位置
<path d='M 100 100 L 200 100'></path>
// M = moveTo   L = lineTo   H 水平移动多少距离  V垂直移动多少距离   z不区分大小写，表示闭合
<path d='M 100 100 H 200 V 200 z '></path>
```
![3.png](https://note.youdao.com/yws/res/b/WEBRESOURCE467c59d14b34fb37b97ad230088f13bb)

- 画圆弧
```
path{
    stroke:steelblue;
    fill: transparent;
}

//                  A:水平半径，垂直半径，选择角度，顺逆时针，大弧小弧，终点位置 
<path d= 'M 100 100 A 100 50 90 1 0 150 200'></path>
```
![4.png](https://note.youdao.com/yws/res/7/WEBRESOURCE6c5004f28d9a1da80257d7117c0c05d7)

- defs 定义
- linearGradient线性渐变
- stop 定义颜色
```
<defs>
    //linearGradient 里面的数值决定渐变方向 x2 = '100%' y2 = '100%' 相当于 right bottom
    <linearGradient id='bg1' x1 ='0' y1 ='0' x2 = '100%' y2 = '100%'>
        //offset 数值决定渐变颜色的比例
        <stop offset='0%' style="stop-color:rgb(255,255,0)"></stop>
        <stop offset='100%' style="stop-color:rgb(255,0,0)"></stop>
    </linearGradient>
</defs>

// 在样式中使用url引入线性渐变即可
<rect x='100' y ='100' height='100' width='300px' style="fill:url(#bg1)"></rect>
```
![5.png](https://note.youdao.com/yws/res/1/WEBRESOURCE4610291fc77b8c493f50ba3c88890ce1)

```
画虚线：
.line2{
    stroke: pink;
    stroke-width: 10px;
    stroke-dasharray: 10px; 画虚线
    stroke-dashoffset: 10px; 配合它可以做动画
}
<line x1='200' y1='100' x2='200' y2='300' class="line2"></line>
```
![6.png](https://note.youdao.com/yws/res/b/WEBRESOURCEe091b75288960f6eed895db540fd12db)
