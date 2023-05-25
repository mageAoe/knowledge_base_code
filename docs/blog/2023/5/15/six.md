# 原型和原型链是什么

作为javascript 的精髓，原型跟原型链是一个优秀的前端必须要掌握得知识

``` js
    //  函数都有一个prototype属性，它指向原型对象
    //  原型对象中有一个constructor属性，它指向函数对象自身
        console.log(Date.prototype.constructor === Date);  //true
        function abc(){}
        console.log(abc.prototype.constructor === abc); // true
    //  可以给prototype（原型）身上挂载属性和方法，这样我们的实例对象就可以使用原型上的属性和方法了
        Child.prototype.name = 'child-father'
        function Child(){}
        const child = new Child()
        console.log(child.name); // child-father
    //  显示原型和隐式原型：
    //  函数的prototype[显示原型]
    //  实例对象的__proto__[隐式原型]
    //  都为引用类型，指向同一原型对象
        function Func() {}
        let func = new Func();
        console.log(Func.prototype === func.__proto__);  //true

    //  原型补充：
    //  一般情况下, Func.prototype.__proto__=== Object.prototype
        console.log(Func.prototype.__proto__=== Object.prototype); // true
    //  Object.prototype不满足一般情况
    //  所有函数都是Function的实例(包含Function)
    //  Object.prototype为原型链的尽头
        console.log(Object.prototype.__proto__);  //null


    /*
        原型链：
        实例先在自身中找属性(方法)，找不到则在其__proto__中找，最终没找到，则返回undefined
    */
        function FuncProto() {
            this.tes = function () {
                console.log("run tes");
            };
        }
        let funcProto = new FuncProto();
        FuncProto.prototype.display = function () {
            console.log("run display");
        };
        funcProto.tes();  // 调用构造函数的tes方法
        funcProto.display();  // 调用原型对象中的display方法

    /*
        原型链___属性：
        设置对象的属性值时，不查找原型链，如当前对象中无此属性，则添加并赋值
        方法一般定义于原型中，属性一般通过构造函数定义于对象本身上
    */
        function Father() {}
        var f_1 = new Father();
        var f_2 = new Father();
        f_1.prop = "hello";  //属性定义于对象本身上，各对象属性赋值互不影响
        f_2.prop = "world";
        console.log(f_1.prop, f_2.prop);  //hello world

```

## 巩固练习：

```js
function func() {
        alert("hello");
    }
console.log(Date.prototype.constructor === Date);  //true
console.log(func.prototype.constructor === func);  //true

function Func() {

    }
var func = new Func();
console.log(Func.prototype === func.__proto__);  //true

Func.prototype.__proto__===Object.prototype
console.log(Object.prototype.__proto__);  //null

console.log(Object instanceof Function);  //true
console.log(Object instanceof Object);  //true
console.log(Function instanceof Function);  //true
console.log(Function instanceof Object);  //true

Object.__proto__ === Function.prototype
```
