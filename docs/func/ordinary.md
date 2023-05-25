# 普通函数

## 获取随机颜色

```js
    function rn(mix,max){
        return parseInt(Math.random()*(max-mix)+mix)
    }

    function rc(min,max){
        var r = rn(min,max);
        var g = rn(min,max);
        var b = rn(min,max);
        return `rgb(${r},${g},${b})`
    }

```

## typeof重写

```js
function myTypeof(obj){
    var type = typeof(obj)
    var template = {
        "[object Number]":'number -- object',
        "[object Boolean]":'boolean -- object',
        "[object String]":'string -- object',
        "[object Array]":'array',
        "[object Object]":'object'
    }

    if(obj === null){
        return "null";
    }else if(type == 'object'){
        str = Object.prototype.toString.call(obj)
        return template[str]
    }else{
        return type
    }

}
```

## 数组去重  方法一

```js
Array.prototype.arrDuplication = function(){
        var arr = [],
            obj = {},
            len = this.length;
        for(var i=0;i<len;i++){
            if(!obj[this[i]]){
                obj[this[i]] = 'abc';
                arr.push(this[i]);
            }
        }
        return arr
}

```

## 数组去重  方法二

```js
function unique2(arr) {
    return arr.filter(function(item, index, arr) {
      //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
      return arr.indexOf(item, 0) === index;
    });
}

```

## 数组去重  方法三 es6

```js
function unique3(arr) {
    let appeard=new Set()
    return arr.filter(item=>{
        //创建一个可以唯一标识对象的字符串id
        let id=item+JSON.stringify(item)
        if (appeard.has(id)) {
            return false
        } else {
            appeard.add(id)
            return true
        }
    })
}
```

## 数组去重  方法四 es6

```js
var arr = [1,2,3,3,1,4];
var a = new Set(arr); // Set(3) [ 1, 2, 3 ,4]
[...new Set(arr)]; // Array(3) [ 1, 2, 3 ,4]
Array.from(new Set(arr)); // [1, 2, 3, 4]
[...new Set('ababbc')].join(''); // "abc" 字符串去重
new Set('ice doughnut'); //Set(11) {"i", "c", "e", " ", "d", …}
```

## 兼容性问题，返回浏览器可视窗口尺寸getViewportOffset() 

```js
function getViewportOffset(){
    if(window.innerWidth && window.innerHeight){
        return {
            x:window.innerWidth,
            y:window.innerHeight
        }
    }else{
        if(document.compatMode == 'BackCompat'){
            return {
                w:document.body.clientWidth(),
                h:document.body.clientHeight()
            }
        }else{
            return {
                w:document.documentElement.clientWidth(),
                h:document.documentElement.clientHeight()
            }
        }
    }  
}
```

## 异步加载JS的方法

```js
function loadScript(url,callback){
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    if(script.readyState){
        script.onreadystatechange = function(){
            if(script.readyState == 'complete' || script.readyState == 'loaded'){
                callback()
            }
        }
    }else{
        script.onload = function(){
            callback()
        }
    }
    script.src = url;
    document.head.appendChild(script);
}
```

## 多物体运动 & 回调机制

```js
function getStyle(dom,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(dom,null)[attr]
    }else{
        return dom.currentStyle[attr]
    }
}

function starMove(dom,attrObj,callback){
    clearInterval(dom.timer)
    var isSpeed,iCur = null;
    dom.timer = setInterval(function(){
        var bstop  = true;
        for(var attr in attrObj){ //for in循环
            if(attr == 'opacity'){
                iCur = parseFloat(getStyle(dom,'opacity')) * 100
            }else{
                iCur = parseInt(getStyle(dom,attr))
            }
            isSpeed = (attrObj[attr] - iCur) / 7
            isSpeed = isSpeed > 0 ? Math.ceil(isSpeed) : Math.floor(isSpeed)
            if(attr == 'opacity'){
                dom.style.opacity = (iCur + isSpeed) / 100
            }else{
                dom.style[attr] = iCur + isSpeed + 'px'
            }
            if(iCur != attrObj[attr]){
                bstop = false
            }
        }
        if(bstop){
                clearInterval(dom.timer)
                typeof callback == 'function' && callback()
            }
    }, 30);
}
```

## 模拟重力场,摩擦力

```js
function startMove(dom){
    clearInterval(dom.timer)
    var iSpeedX = 6;
    var iSpeedY = 8;
    var g = 3; //重力加速度
    dom.timer = setInterval(function(){
        iSpeedY += g;
        var newTop = dom.offsetTop + iSpeedY;
        var newLeft = dom.offsetLeft + iSpeedX;
        if(newTop >= document.documentElement.clientHeight - dom.clientHeight){
            iSpeedY *= -1;
            iSpeedX *= 0.8; //增加摩擦力
            iSpeedY *= 0.8;
            newTop = document.documentElement.clientHeight - dom.clientHeight;
        }

        if(newTop <= 0){
            iSpeedY *= -1;
            iSpeedX *= 0.8; //增加摩擦力
            iSpeedY *= 0.8;
            newTop = 0;
        }

        if(newLeft >= document.documentElement.clientWidth - dom.clientWidth){
            iSpeedX *= -1;
            iSpeedX *= 0.8; //增加摩擦力
            iSpeedY *= 0.8;
            newLeft = document.documentElement.clientWidth - dom.clientWidth;
        }

        if(newLeft <= 0){
            iSpeedX *= -1;
            iSpeedX *= 0.8; //增加摩擦力
            iSpeedY *= 0.8;
            newLeft = 0;
        }
        
        if(Math.abs(iSpeedX) < 1){
            iSpeedX = 0;
        }
        
        if(Math.abs(iSpeedY) < 1){
            iSpeedY = 0;
        }

        if(iSpeedX == 0 && iSpeedY == 0 && newTop == document.documentElement.clientHeight - dom.clientHeight){
            clearInterval(dom.timer)
        }else{
            dom.style.left = newLeft + 'px'
            dom.style.top = newTop + 'px'
        }

    }, 30);
}
```

## 深拷贝(一)

```js
function deepClone(origin,target){
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[Object Array]";
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){ //hasOwnProperty
            if(typeof(origin[prop] ) == 'object'){
                if(toStr.call(origin[prop]) == arrStr){
                    target[prop] = []
                }else{
                    target[prop] = {}
                }
                deepClone(origin[prop],target[prop])
            }else{
                target[prop] = origin[prop]
            }
        }
    }
}
```

## 深拷贝(二)

```js
function deepClone(origin,target){
    var target = target || {};
    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){ //hasOwnProperty
            if(typeof(origin[prop] ) == 'object'){
                if(Array.isArray(prop)){
                    target[prop] = []
                }else{
                    target[prop] = {}
                }
                deepClone(origin[prop],target[prop])
            }else{
                target[prop] = origin[prop]
            }
        }
    }
}

```