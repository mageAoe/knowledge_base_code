## 基础类型
```js
/**
 * 基础类型
 */
/* 布尔类型 */
let bsBool: boolean;
bsBool = true;
// bool = 123 //不能将类型“number”分配给类型“boolean”。

/* 数值类型 */
let bsNum: number;
bsNum = 123;
// bsNum = 'abc' //不能将类型“string”分配给类型“number”。
bsNum = 0xff; // 十六进制
bsNum = 0o77; // 八进制
bsNum = 0b11; // 二进制

/* 字符串类型 */
let bsStr: string;
bsStr = 'abc';
// bsStr = true; //不能将类型“boolean”分配给类型“string”。
bsStr = `the num is ${bsNum}, the bool is ${bsBool}`;

/* 数组类型 */
// 写法1
let bsArr1: number[];
bsArr1 = [1, 2, 3];
// 写法2
let bsArr2: Array<number>
bsArr2 = [1, 2, 3]

/* 联合类型 */
// 1
let bsArr3: (number | string)[]
// 2
let bsArr4: Array<number | string>

bsArr3 = bsArr4 = ['1', 2, '3']

/* 元组类型 */
let bsTuple: [string, number, string, Array<string>];
bsTuple = ['1', 2, '3', ['4', '5']]

/* 枚举类型 */
/**
 * 自增序列号 默认从0开始自增
 * 只指定某一个的话，之前的还按照从0自增，之后按照定义值自增
 */
enum BsRoles {
    SUPER_ADMIN,// 0
    ADMIN = 3,
    USER// 4
}

/* any类型(anyScript) */
let bsValue: any;
bsValue = 'abc';
bsValue = 123;
bsValue = [1, '2', { a: '3', b: true }]

/* void类型(无类型) */
const bsTest1 = (text: string): void => {
    console.log(text);
}
let bsV: void;
bsV = undefined;
// 开启严格检查将会报错  "strict": true
bsV = null;

/* null 和 undefined */
let bsU: undefined = undefined;
let bsN: null = null;

/* never类型 */
const bsErrorFunc = (msg: string): never => {
    throw new Error(msg);
}

const bsInfiniteFunc = ():never => {
    const _num: number = 1;
    while (true) {
        console.log(_num)
    }
}

/* object类型 */
let bsObj1 = {
    name: 'gayhub'
};
let bsObj2 = bsObj1;
bsObj2.name = 'Gayhub';

function bsGetObject(obj: object): void {
    console.log(obj);
}

/* 类型断言与类型强转 */
const bsGetLength = (target: string | number): number => {
    if ((target as string).length || (target as string).length == 0) {
        return (target as string).length;
    } else {
        return target.toString().length;
    }
}

```

## Symbol

```js
/**
 * Symbol
 */
(() => {
    /* 1. Symbol值[ES6] */
    const s = Symbol();
    console.log(s)
    const s2 = Symbol();
    console.log(s2)
    console.log('s1 == s2', typeof s, typeof s2)

    /* 2. Symbol 标识 */

    // tslint:disable-next-line:one-variable-per-declaration
    const s3 = Symbol('gayhub'),
        s4 = Symbol('gayhub');

    console.log(s3, s4)
    // ts 中Symbol传参只能是string | number
    // Symbol 不能参与数字运算
    console.log(s3.toString())
    console.log(Boolean(s4))
    console.log(!s3)

    /* 3: 对象的变量属性名, Symbol作为对象属性名 */
    const porp = 'name';
    const info = {
        [`my` + porp]: 'gayhub'
    }
    console.log(info)

    const s5 = Symbol('name');
    const info2 = {
        [s5]: 'gayhub',
        sex: 'male',
        age: '66'
    };
    console.log(info2);
    info2[s5] = 'che_gayhub';

    /* 4. 变量对象的属性名，如何获取Symbol属性 */
    // 以下四种不可获取Symbol
    // tslint:disable-next-line:forin
    for (const key in info2) {
        // tslint 报错解决方案
        // if (info2.hasOwnProperty(key)) {
        //     console.log(key)
        // }
        console.log(key)
    }

    console.log(Object.keys(info2))

    console.log(Object.getOwnPropertyNames(info2))

    console.log(JSON.stringify(info2))

    // 以下两种可以获取Symbol

    console.log(Object.getOwnPropertySymbols(info2))

    console.log(Reflect.ownKeys(info2))

    /* 5. Symbol的标识复用 */
    const s6 = Symbol('gayhub');
    const s7 = Symbol.for('gayhub');
    const s8 = Symbol.for('gayhub');
    const info3 = {
        [s7]: 'coder'
    }
    console.log(info3[s8])// coder
    console.log(Symbol.keyFor(s7), Symbol.keyFor(s8), Symbol.keyFor(s6));

    /* 6. 11个内置Symbol值 */
    // 6.1
    // Symbol.hasInstance; // 指令instanceof会调用对象的该属性的方法

    const info4 = {
        [Symbol.hasInstance](otherObj: object) {
            console.log(otherObj);
        }
    }
    console.log({ a: 'a' } instanceof (info4 as any))


    // 6.2
    // Symbol.isConcatSpreadable // 数组在执行concat时是否进行扁平化

    const arr: number[] = [1, 2];
    console.log(arr.concat([3, 4]))
    arr[Symbol.isConcatSpreadable] = false;
    console.log(arr.concat([3, 4]));


    // 6.3
    // Symbol.species // 指定创建衍生对象的构造函数
    class C extends Array {
        getName() {
            return 'gayhub'
        }
        [Symbol.species]() {
            return Array
        }
    }
    const c1 = new C(3);
    c1.fill(1);
    console.log('c1', c1);

    const a = c1.map(item => {
        console.log(item);
        return item + 1;
    });
    console.log('a', a);

    console.log('c1 instanceof C', c1 instanceof C,
        '\nc1 instanceof Array', c1 instanceof Array);

    console.log('a instanceof C', a instanceof C,
        '\na instanceof Array', a instanceof Array);

    // 6.4
    // Symbol.match
    // Symbol.replace
    // Symbol.search
    // Symbol.split
    // string 调用 对应方法时会调用参数中的该方法
    // 并将返回值作为结果返回出来

    const obj3 = {
        [Symbol.match](...arg) {
            console.log('match', arg)
            return arg[0].length
        },
        [Symbol.replace](...arg) {
            console.log('replace', arg)
            return arg[0].length
        },
        [Symbol.search](...arg) {
            console.log('search', arg)
            return arg[0].length
        },
        [Symbol.split](...arg) {
            console.log('split', arg)
            return arg[0].length
        }
    }
    console.log('abcde'.match(obj3)) // match ['abcde']
    console.log('abcde'.replace(obj3, '123')) // replace (2) ['abcde', '123']
    console.log('abcde'.search(obj3)) // search ['abcde']
    console.log('abcde'.split(obj3)) // split (2) ['abcde', undefined]


    // 6.5
    // Symbol.iterator // 数组属性 作为该数组的默认迭代器方法

    const Array2: number[] = [1, 2, 3];
    const it = Array2[Symbol.iterator]();
    console.log(it);
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());


    // 6.6
    // Symbol.toPrimitive
    // 作为对象的一个方法属性，对象被转为原始类型值时会调用该方法

    const obj4: unknown = {
        [Symbol.toPrimitive](type): number {
            console.log(type);
            return 0
        }
    }
    console.log((obj4 as any)++)


    // 6.7
    // Symbol.toStringTag
    // 它通常作为对象的属性键使用，
    // 对应的属性值应该为字符串类型，
    // 这个字符串用来表示该对象的自定义类型标签

    const obj5: unknown = {
        [Symbol.toStringTag]: 'gayhub'
    }
    // 作为方法属性使用时的写法
    // tslint:disable-next-line:max-classes-per-file
    class C2 {
        get [Symbol.toStringTag]() {
            return 'gayhub';
        }
    }
    const obj6 = new C2();
    console.log(obj5.toString(), obj6.toString());



    // Symbol.unscopables
    // 在with使用中，哪些属性会被过滤掉
    const obj7 = {
        a: 'obj_a',
        b: 'obj_b'
    }

    console.log(obj7[Symbol.unscopables])

    console.log(Array.prototype[Symbol.unscopables])

})()
```

## 接口 interface


```js
/**
 * 接口
 */
(() => {
    /* 1. 基本用法 */
    interface NameInfo {
        firstName: string,
        lastName: string
    }

    const getFullName = (({ firstName, lastName }: NameInfo) => {
        return `${firstName} ${lastName}`
    });

    getFullName({
        firstName: 'Gayhub',
        // lastName: {name: 'good'} //不能将类型“{ name: string; }”分配给类型“string”。
        lastName: 'Che'
    });

    /* 2. 可选属性 与 索引签名 */
    interface Vegetable {
        color?: string, // 可选属性
        type: string,
        // 索引签名
        [prop: string]: any
    }

    const getVegetables = ({ color, type }:Vegetable) => {
        return `A ${color ? (color + ' ') : ''}${type}`;
    };

    getVegetables({
        color: 'red',
        type: 'tomato',
    });

    /* 3. 多余属性检查与规避检查 */

    // 3.1. 利用 类型断言
    getVegetables({
        type: 'tomato',
        size: 2
    } as Vegetable);

    // 3.2. 利用索引签名[prop: string]: any
    getVegetables({
        type: 'tomato',
        size: 2
    });

    // 3.3. 利用类型兼容性

    const twoRedTomato = {
        coloe:'red',
        type: 'tomato',
        [Symbol.for('fav')]: 'egg'
    }

    getVegetables(twoRedTomato);

    /* 4. 只读属性 */

    interface Book {
        name: string,
        readonly price: number,
        type: string
    }

    const book1: Book = {
        name: "Murder on the Orient Express",
        price: 19.99,
        type: "mystery story whodunit"
    }

    // book1.price = 21.99; // 无法分配到 "price" ，因为它是只读属性。

    interface ArrInter {
        0: number,
        1: string,
        readonly 2: boolean
    }

    const arr1Inter: ArrInter = [0, '', false]
    // arr1Inter[2] = true; // 无法分配到 "2" ，因为它是只读属性。

    /* 5. 接口定义函数类型 */

    // 设置rule "callable-types": [false]
    interface AnyFunc1{
        (num1: number, num2: number): number
    };
    type AnyFunc2 = (num1: number, num2: number) => number;

    /* 6. 接口定义对象的索引类型[索引签名] */
    interface RoleDic {
        [id: number]: string
        [id: string]: string
    }

    const role1: RoleDic = {
        '1': 'super_admin',
        2: 'admin'
    }

    /* 7. 接口的继承 */

    /*
    interface Tomato {
        color: string,
        type: string,
        smell: string
    }
    */
    interface Tomato extends Vegetable {
        smell: string
    }

    const tomato2: Tomato = {
        color: 'red',
        type: 'big',
        smell: 'sweet'
    }

    /* 8. 混合类型接口 */
    interface Counter {
        (): void,
        count: number
    }

    const getCounter = (): Counter => {
        const counter = () => {
            counter.count++
        };
        counter.count = 0;
        return counter
    }

    const count: Counter = getCounter();
    for (let a = 0; a < 5; a++) {
        count()
        console.log(count.count);
    }

})()

```

## 函数

```js

/**
 * 函数
 */
(() => {
    /**
     * 1 函数类型
     * 1.1 为函数定义类型
     */

    function add(arg1: number, arg2: number): number {
        return arg1 + arg2
    }

    const add2 = (arg1: number, arg2: number): number => arg1 + arg2;


    /* 1.2 完整的函数类型 */

    let add3: (x: number, y: number) => number;
    add3 = (arg1, arg2) => arg1 + arg2;

    /* 1.3 使用接口定义函数类型 */

    // interface Add {
    //     (
    //         x: number, y: number
    //     ):number
    // }

    /* 1.4 使用类型别名 */

    type Add = (x: number, y: number) => number

    /**
     * 2 参数
     */
    /* 2.1 可选参数 */

    type Addfun1 = (arg1: number, arg2: number, arg3?: number) => number
    const addfun1: Addfun1 = (arg1, arg2) => arg1 + arg2
    console.log(addfun1(1, 2, 3))
    const addfun2: Addfun1 = (arg1, arg2, arg3) => (arg1 + arg2) * arg3
    console.log(addfun2(1, 2, 3))

    /* 2.2 默认参数 */

    const addfun3 = (x: number, y: number, z: number = 1) => (x + y) * z
    const addfun4: Addfun1 = (x, y = 0) => x + y

    /* 2.3 剩余参数 */

    // ES5
    // function handleData() {
    //     if (arguments.length === 1) return arguments[0] * 2;
    //     else if (arguments.length === 2) return arguments[0] * arguments[1];
    //     else if Array.prototype.slice.apply(arguments as Array<any>).join('_');
    // }

    const handleData1 = (arg: number, ...args: number[]): void => {
        // TODO:
    }

    /**
     * 3 重载
     */

    // ------------重载部分------------
    function handleData2(x: string): string[]
    function handleData2(x: number): number[]
    // ------------实体部分------------
    function handleData2(x: any): any {
        if (typeof x === 'string') {
            return x.split('');
        } else {
            return [x - 1, x, x + 1]
        }
    }

    console.log(handleData2('hello'))
    console.log(handleData2(123))

})()

```


## 泛型

```js
/**
 * 泛型
 */
(() => {
    /* 1. 简单使用 */
    const genGetArray = <T>(value: T, times: number = 5): T[] => {
        return new Array(times).fill(value);
    }
    console.log(genGetArray<string>('hello!', 3))
    console.log(genGetArray<number>(10, 3))
    /**
     * 2. 泛型变量
     */
    const genGetArray2 = <T, U>(arg1: T, arg2: U, times: number): Array<[T, U]> => {
        return new Array(times).fill([arg1, arg2]);
    }
    /**
     * 这里会自动根据传参推断泛型的类型<number, string>
     */
    genGetArray2(1, 'a', 3).forEach(item => {
        console.log(...item)
        // item[0].length // ERROR
        // item[1].toFixed() // ERROR
    })

    /**
     * 3. 泛型类型
     */

    let genGetArray3: <T>(arg: T, times: number) => T[]
    genGetArray3 = (arg: any, times = 5) => {
        return new Array(times).fill(arg);
    }

    // genGetArray3(123, 3).map(item => item.length) // ERROE

    /**
     * 4. 泛型约束
     */
    // 函数别名
    type genGetArray4 = <T>(arg: T, times: number) => T[]

    const getArray: genGetArray4 = (arg: any, times = 5) => {
        return new Array(times).fill(arg);
    }
    // 函数接口
    interface GenGetArray5 {
        <T>(arg: T, times: number): T[]
    }
    // 外层泛型变量
    interface GenGetArray6<T> {
        (arg: T, times: number): T[],
        data: T[]
    }

    /**
     * 5. 泛型约束中使用类型参数
     */
    interface ValueWithLength {
        length: number
    }

    const genGetArray7 = <T extends ValueWithLength>(arg: T, times: number): T[] => {
        return new Array(times).fill(arg);
    }

    genGetArray7([1, 2, 3], 5);
    genGetArray7('hello', 5);
    // genGetArray7(10, 5); // ERROR
    genGetArray7({
        length: 3
    }, 5);

    const getProps = <T, K extends keyof T>(object: T, propName: K) => {
        return object[propName];
    }

    getProps({ a: 1, b: 'x' }, 'a')
    // getProps({a: 1, b: 'x'}, 'c') // ERROR

})()


```


## 复习 - ES6中的类


```js
/**
 * ES6中的类
 */


(() => {
    /*ES5 和 ES6 实现创建实例*/
    /* ES5 */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getPostion = function () {
        return '(' + this.x + ', ' + this.y + ')';
    }
    var p1 = new Point(2, 3);
    console.log(p1, p1.getPostion());

    var p2 = new Point(4, 5);
    console.log(p2, p2.getPostion());

    /* ES6 constructor方法*/
    class Point2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // return {a: 'a'} // 返回该实例不是该类的实例
        }
        getPostion() {
            return `(${this.x}, ${this.y})`
        }
    }

    /* 类的实例 */
    const p3 = new Point2(2, 3);
    console.log(p3, p3.getPostion());
    // Class constructor Point2 cannot be invoked without 'new'
    // const p4 = Point2(4, 5);
    console.log(p3.hasOwnProperty('getPostion'));
    console.log(p3.__proto__.hasOwnProperty('getPostion'))

    /* 取值函数和存值函数 */
    // ES5
    var info = {
        _age: 18,
        // setter
        set age(newValue) {
            if (newValue > 18) {
                console.log('too old!');
            } else {
                console.log('I\'m still young');
            }
        },
        // getter
        get age() {
            console.log('why get my age?');
            return this._age;
        }
    }

    console.log(info.age)
    info.age = 5
    info.age = 20

    /* ES6 */
    class Info {
        constructor(age) {
            this._age = age
        }
        // setter
        set age(newAge) {
            console.log(`my age is ${newAge}`);
            this._age = newAge
        }
        // getter
        get age() {
            console.log('why get my age?');
            return this._age;
        }
    }

    const info2 = new Info(18);
    console.log(info2.age)
    info2.age = 17
    console.log(info2.age)

    /* class表达式 */

    /* ES5 */
    const func1 = function () { }
    function func2() { }

    /* ES6 */
    const Class1 = class { }
    class Class2{ }

    /* 静态方法 */

    /* ES6 */
    class Point3 {
        constructor(x, y) { this.x = x, this.y = y }
        getPostion() { return `(${this.x}, ${this.y})` }
        static getClassName() { return Point3.name }
    }

    const point4 = new Point3(1, 2);
    // point4.getClassName() //ERROR not a function
    console.log(point4.getPostion(), Point3.getClassName())
    
    /* 实例属性其他写法 */
    
    class Point4 {
        z = 0;
        constructor(x, y) { this.x = x, this.y = y }
        getPostion() { return `(${this.x}, ${this.y})` }
        static getClassName() { return Point3.name }
    }
    /* 静态属性 */

    class Point5 {
        constructor(x) {
            this.x = x
        }
        static y = 2;
    }
    const point5 = new Point5(3);
    console.log(point5, point5.x, point5.y, Point5.y)

    /* 实现私有方法(折衷实现) */

    // 命名实现[君子语法]
    class Point6 {
        func1() {

        }
        _func2() {
            
        }
    }
    // 通过fun外置实现(bind, call, apply)[有效]
    const _fun2 = (a, b) => {console.log(a, b)}
    class Point7 {
        func1(...arg) {
            // DOSOME
            _fun2.apply(this, arg);
            _fun2.call(this, ...arg);
            _fun2.bind(this)(...arg);
            // DOSOME OTHER
        }
    }

    const point7 = new Point7()
    point7.func1('a', 'b');
    // Symbal 唯一值设置内部方法[半生效]
    const hidKey = Symbol('someValue');
    class Point8 {
        constructor(x) {
            this.x = x;
        }
        getPostion() {
            console.log(this.x)
        }
        [hidKey]() {
            console.log('private func')
        }
    }
    const point8 = new Point8();
    point8[hidKey]()

    // 通过之前学习的Reflect.ownKeys 和 Object.getOwnPropertySymbols 可以获取到
    console.log(Reflect.ownKeys(point8.__proto__))
    console.log(Object.getOwnPropertySymbols(point8.__proto__))
    point8[Object.getOwnPropertySymbols(point8.__proto__)[0]]()

    /* 类中的私有属性 */
    class Point9 {
        #privateValue = 12
        getPrivateValue() {
            return this.#privateValue;
        }
    }
    console.log(/* new Point9().#privateValue */ new Point9().getPrivateValue())

    /* new.target 返回使用的构造器 */

    function Point10() {
        // √
        console.log(new.target)
        // √
        this.show = () => {
            console.log(new.target)
        }
    }

    class Point11{
        // √
        constructor() { console.log(new.target) }
        show() {
            // 无法使用
            console.log(new.target)
        }
    }

    const point10 = new Point10(), point11 = new Point11();
    point10.show();
    point11.show();
    
    /* new.target在继承中的使用 */

    class parentClass {
        constructor() {
            if (new.target === parentClass) {
                throw new Error('Can\'t new this parent!')
            }
            console.log(new.target)
        }
    }

    class childrenClass extends parentClass{
        constructor() {
            super()
        }
    }

    try {
        const parentc = new parentClass()
    } catch (e) {
        console.error(e)
    }
    // 莫名其妙的产生了递归问题，为解决
    // const childc = new childrenClass()
})()


```

## 复习 - 类的继承


```js
/**
 * 类的继承
 */
(() => {
    /* 1. ES5中的继承 */

    function Food() {
        this.type = 'food'
    }
    Food.prototype.getType = function () {
        return this.type
    }

    function Vegetables(name) {
        this.name = name;
    }

    Vegetables.prototype = new Food();
    Vegetables.prototype.constrctor = Vegetables

    const food1 = new Vegetables('tomato');
    console.log(food1, food1.getType(), food1 instanceof Food)
    
    /* 2. ES6中的继承 */

    class Food1 {
        static some = 'Some';
        constructor(type = 'food') {
            console.log('Food')
            this.type = type;
        }
        static getType() {
            return this.some
        }
    }
    class Vegetables1 extends Food1{
        constructor(type, name) {
            console.log('Vegetables')
            super(type);
            this.name = name;
        }
    }

    const tomato2 = new Vegetables1('vegetable', 'tomato')
    console.log(tomato2, Vegetables1.getType())
    console.log('tomato2 instanceof Food1',tomato2 instanceof Food1)
    console.log('tomato2 instanceof Vegetables1',tomato2 instanceof Vegetables1)

    /* 3. Objct.getPrototypeOf */

    // 获取父类
    console.log(Object.getPrototypeOf(Vegetables1) === Food1)

    /* 4. super */
    /* 4.1. super函数 */

    // 作为函数时，代表父类的constructor(构造器)，只能在constructor中使用

    /* 4.2. super对象 */

    // 普通方法中 指向父类原型对象
    // 静态方法中 指向父类
    class Parent {
        constructor() {
            this.type = 'parent';
            this.name = 'pName';
        }
        print() {
            console.log(this.name)
        }
        getName() {
            return this.type;
        }
    }

    Parent.getType = () => {
        return 'is parent';
    }

    class Child extends Parent {
        constructor() {
            super()
            this.name = 'child'
            console.log('constructor', super.getName())
        }

        childPrint() {
            super.print();
        }

        getParentName() {
            console.log('getParentName', super.getName())
        }

        getParentType() {
            // console.log('getParentType', super.getType()) // ERROR super.getType === undefined
        }

        static getParentType2() {
            console.log('getParentType2', super.getType())
        }
    }

    const children = new Child() // constructor parent

    children.getParentName() // getParentName parent
    children.getParentType() 

    Child.getParentType2() // getParentType2 is parent

    children.childPrint() // child

    /* 5. 类的prototype属性和__proto__属性 */

    // 对象的__proto__属性默认指向构造器的prototype

    const obj = new Object();
    console.log(obj.__proto__ === Object.prototype); // true

    // 子类的prototype属性的__proto__指向父类的prototype属性
    // 实例的__proto__属性的__proto__指向父类实例的__proto__

    /* 原生构造函数的继承 */
    /* 原生构造函数
    Boolean
    Number
    String
    Array
    Date
    Function
    RegExp
    Error
    Object
    */

    class CustomArray extends Array {
        constructor(...arg) {
            super(...arg)
        }
    }

    const myArray = new CustomArray(3);
    console.log(myArray.fill('+'))
    console.log(myArray.join('-'))
    const myArray2 = new CustomArray(1, 2, 3);
    console.log(myArray2.join('-'))
})()

```

## TS中的类


```js

/**
 * TS中的类
 */
(() => {
    /* 基础 */
    class Point {
        x: number
        y: number
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        getPosition():string {
            return `(${this.x}, ${this.y})`
        }
    }

    const point = new Point(1, 2);
    console.log(point.getPosition())

    // tslint:disable-next-line:max-classes-per-file
    class Parent {
        public name: string
        constructor(name: string) {
            this.name = name;
        }
    }
    // tslint:disable-next-line:max-classes-per-file
    class Child extends Parent{
        constructor(name: string) {
            super(name);
        }
    }
    /* 修饰符 */
    // 1. public
    // 2. private
    // 3. protected

    enum Gender{
        male = 1,
        female
    }

    // tslint:disable-next-line:max-classes-per-file
    class Parent2 {
        public name: string
        private age: number = 18;
        protected gender: number;
        constructor(name: string, age: number, gender: number) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
    }
    const p = new Parent2('Jack', 18, Gender.male);
    console.log(p.name)
    // console.log(Gender[p.gender]) // 属性“gender”受保护，只能在类“Parent2”及其子类中访问。
    // console.log(p.age); // 属性“age”为私有属性，只能在类“Parent2”中访问。

    // tslint:disable-next-line:max-classes-per-file
    class Child2 extends Parent2{
        constructor(name: string, age: number, gender: number) {
            super(name, age, gender)
        }

        public showInfo() {
            console.log(`name is ${this.name}, gender is ${Gender[this.gender]}`)
        }
    }

    const c = new Child2('Mary', 19, Gender.female);
    console.log(c.name);
    // console.log(Gender[c.gender]) // 属性“gender”受保护，只能在类“Parent2”及其子类中访问。
    // console.log(c.age); // 属性“age”为私有属性，只能在类“Parent2”中访问。
    c.showInfo();

    // 设置constructor为protected 则只能创建子类实例，无法用该类创建实例

    /* readonly修饰符 */

    // tslint:disable-next-line:max-classes-per-file
    class UserInfo {
        public readonly name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    const user = new UserInfo('Che');
    console.log(user.name)
    // user.name = 'gayhub'; //法分配到 "name" ，因为它是只读属性。

    /* 参数属性 */

    // tslint:disable-next-line:max-classes-per-file
    class A {
        constructor(public name: string) {
            // Auto inject
        }
    }
    const a1 = new A('Che_Gayhub');
    console.log(a1);

    /* 静态属性 */

    // tslint:disable-next-line:max-classes-per-file
    class B {
        /* static part */
        public static age: number = 18;
        public static getInfo() {
            console.log(this.age)
        }
        /* static part end */
        constructor() {
            // Empty
        }
    }
    console.log(B.age);
    B.getInfo();

    /* 可选类属性 */

    // tslint:disable-next-line:max-classes-per-file
    class C {
        public name: string;
        public age?: number;
        constructor(name: string, age?: number, public gender?: Gender) {
            this.name = name;
            this.age = age;
        }
    }
    const c1 = new C('Che')
    const c2 = new C('Che', 18)
    const c3 = new C('Che', 18, Gender.male)
    console.log(c1, c2, c3)

    /* 存取器 */

    // tslint:disable-next-line:max-classes-per-file
    class D extends C{
        constructor(name: string, age?: number, public gender?: Gender) {
            super(name, age, gender)
        }

        get info(): {name: string, age?: number}{
            return {name: this.name, age: this.age}
        }

        set info(info: {name: string, age?: number}) {
            this.name = info.name;
            this.age = info.age;
        }
    }
    // get的返回值和对应的set的参数值类型必须一致
    // 若未手动设置，则会自动判断类型
    // set传参必须为一个值
    const d = new D('Che', 18, Gender.male);
    const dInfo = d.info;
    dInfo.age = 15;
    d.info = dInfo;
    console.log(d);

    /* 抽象类 */
    // tslint:disable-next-line:max-classes-per-file
    abstract class Person {
        protected abstract _age: number
        constructor(public name: string) {
            // Empty
        }
        abstract get age(): number
        abstract set age(age:number)
        public abstract printName(): void;
    }
    // tslint:disable-next-line:max-classes-per-file
    class Man extends Person {
        // 非抽象类“Man”不会实现继承自“Person”类的抽象成员“_age”。
        protected _age: number;
        constructor(name: string) {
            super(name);
        }
        // 非抽象类“Man”不会实现继承自“Person”类的抽象成员“printName”。
        public printName():void {
            console.log(this.name);
        }

        get age() {
            return this._age
        }
        set age(value: number) {
            this._age = value;
        }
    }
    // new Person('Che') // 无法创建抽象类的实例。
    const man1 = new Man('Che');
    man1.printName();
    man1.age = 18;
    console.log(man1, man1.age)

    /* 实例类型 */

    // 类 既是一个类 也是一个类型
    // tslint:disable-next-line:max-classes-per-file
    class Q {
        constructor(public name: string) {
            // Empty
        };
    }
    const q: Q = new Q('Che');
    // tslint:disable-next-line:max-classes-per-file
    class Animal {
        constructor(public name: string) {
            // Empty
        };
    }
    // 这里不会报错
    const cat: Q = new Animal('cat');
    // tslint:disable-next-line:max-classes-per-file
    class Qs extends Q {
        constructor(name: string, public age: number) {
            super(name);
        }
    }
    const qs: Q = new Qs('Che', 18);
    console.log(qs, qs.name)
    // console.log(qs.age) //类型“Q”上不存在属性“age”。
    console.log((qs as Qs).age);

    /* 补充知识 */
    /* 类与类型接口 */

    // 类可以“实现”一个接口
    interface FoodInterface{
        type: string, name: string
    }
    // tslint:disable-next-line:max-classes-per-file
    class FoodClass implements FoodInterface {
        type: string;
        name: string;
    }

    // 接口可以“继承”一个类
    // tslint:disable-next-line:max-classes-per-file
    class E {
        protected name: string;
    }
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:no-empty-interface
    interface F extends E{ }
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:max-classes-per-file
    class G extends E implements F {
        // Class 'G' incorrectly implements interface 'F'.
        // Property 'name' is protected but type 'G' is not a class derived from 'E'.
        public name: string;
    }
    const g = new G();
    g.name = 'Che';
    console.log(g)

    // 参数h是一个构造函数 T为构造函数的返回值类型或其父类
    const create = <T>(h: new () => T): T => {
        // 调用构造函数
        return new h()
    }

    // tslint:disable-next-line:max-classes-per-file
    class H {
        public age: number;
    }

    console.log(create<H>(H))
})()
```

## 枚举

```js
/**
 * 枚举
 */
(() => {
    /* 数字枚举 */
    /* 反向映射 */
    // 直接赋值会默认向下递增
    // 可以使用函数 变量 但不会默认递增，需要初始化下一个值
    function* getstatu() {
        yield 1;
        return 0;
    }
    console.log()
    enum Statu {
        padding = getstatu().next().value,
        success = getstatu().next().value,
        fail = -1
    }
    console.log(Statu.padding, Statu[-1]);
    /* 字符串枚举 */

    enum Message{
        Error = 'Sorry, error',
        Success = 'wellDonw!',
        Failed = Error // 只能使用自身枚举的成员
    }
    console.log(Message.Failed, Message.Success, Message['wellDonw!'])

    /* 异构枚举 */

    // 既包含字符串，也包含数字的枚举称为异构枚举
    // 非必要尽量不要使用

    /* 枚举成员类型 */

    // 不带初始值的成员
    // 值为字符串字面量
    // 值为数字字面量
    // 所有枚举成员都满足以上任一条件的情况下，枚举成员可以作为类型使用

    enum Animals {
        Dog = 1,
        Cat = 'cat',
        Monkey = 2,
        Ribbit
    }

    interface Dog {
        type: Animals.Dog // 可以是Animals.Dog 或number
    }
    const dog: Dog = { type: Animals.Dog }
    dog.type = 2;

    interface Cat {
        type: Animals.Cat
    }
    const cat: Cat = { type: Animals.Cat } // 只可以是Animals.Cat

    /* 联合枚举类型 */

    enum SwitchStatus {
        OFF,
        ON
    }
    interface Light { status: SwitchStatus }

    const light: Light = { status: SwitchStatus.OFF }
    // light.status = Animals.Dog; // 不能将类型“Animals.Dog”分配给类型“SwitchStatus”。

    /* 运行时的枚举 */

    // enum 类型是可编译出实质内容的类型，运行时亦可生效
    // 不同于接口等定义 只在编译时可用，运行时无法生效

    /* const enum */

    const enum Statu2 {
        SUCCESS,
        WATING,
        FAILED
    }
    // 类似于接口，只在编译时生效的枚举类型，不会编译出实际代码
})()

```

## 类型推论

```js
/**
 * 类型推论
 */
(() => {
    /* 类型推论 */
    /* 1.1 基础 */

    let _name = 'Che';
    // _name = 123; //不能将类型“number”分配给类型“string”。
    _name = 'Gayhub'; // √

    /* 1.2 多类型联合 */

    let arr1 = [1, 'a']; // (string | number)[]

    arr1 = [2, 'b'] // √

    arr1 = [2, 3] // √

    /* 1.3 上下文类型 */

    window.onmousedown = (ev) => {
        console.log(ev);
    }

    /* 类型兼容性 */

    /* 2.1 基础 */

    interface Infos {
        name: string
    }
    let info: Infos;

    const info1 = { name: 'Che' }
    const info2 = { age: 18 }
    const info3 = { name: 'Che', age: 18 };
    info = info1;
    // info = info2; // 类型 "{ age: number; }" 中缺少属性 "name"，但类型 "Infos" 中需要该属性。
    info = info3;
    // console.log(info.age); // 类型“Infos”上不存在属性“age”。

    /* 2.2 函数兼容性 */

    /* 2.2.1 参数个数 */

    // tslint:disable-next-line:prefer-const
    let x = (a: number) => a;
    let y = (a: number, b: string) => a;

    // x = y
    y = x; // √

    /* 2.2.2 参数类型 */

    // tslint:disable-next-line:prefer-const
    let x1 = (a: string[]) => console.log(a)
    // tslint:disable-next-line:prefer-const
    let y1 = (a: (string | number)[]) => console.log(a)

    x1 = y1;
    y1 = x1; // √

    /* 2.2.3 返回值类型 */

    // tslint:disable-next-line:prefer-const
    let x2 = (a: number) => a;
    // tslint:disable-next-line:prefer-const
    let y2 = (a: number) => a > 10 ? '' + a : a;

    // x2 = y2;
    y2 = x2; // √

    /* 2.2.4 可选参数和剩余参数 */

    const getSum = (
        arr: number[],
        cb: (...arg: number[]) => number,
        base?: number
    ) => {
        return cb(...arr, base ? base : 0);
    }

    let res = getSum([1, 2], (...args) => {
        return args.reduce((pre, value) => pre + value, 0);
    })
    console.log(res);
    res = getSum([1, 2], (...args) => {
        return args.reduce((pre, value) => pre + value, 0);
    }, 10)
    console.log(res);

    /* 2.2.5 参数双向协变 */
    /**
     * 协变与逆变(covariance and contravariance)是在计算机科学中，
     * 描述具有父/子型别关系的多个型别通过型别构造器、构造出的
     * 多个复杂型别之间是否有父/子型别关系的用语。
     */
    class Parent {
        // SomeThing
    }
    // tslint:disable-next-line:max-classes-per-file
    class Child extends Parent {
        // SomeThine
    }

    interface C2C {
        (param: Child): Child;
    }
    interface C2P {
        (param: Child): Parent;
    }
    interface P2C {
        (param: Parent): Child;
    }
    interface P2P {
        (param: Parent): Parent;
    }
    let fun1: C2C = child => child;
    let fun2: C2P = child => child;
    let fun3: P2C = child => child;
    let fun4: P2P = child => child;

    fun1 = fun2
    fun2 = fun1
    fun1 = fun3
    fun3 = fun1
    fun1 = fun4
    fun4 = fun1

    /* 2.2.6 函数重载 */

    function merge(arg1: number, arg2: number): number
    function merge(arg1: string, arg2: string): string
    function merge(arg1, arg2) {
        return arg1 + arg2;
    }

    function sum(arg1: number, arg2: number): number
    function sum(arg1, arg2) {
        return arg1 + arg2;
    }

    // tslint:disable-next-line:prefer-const
    let fun5 = merge;
    // tslint:disable-next-line:prefer-const
    let fun6 = sum;
    fun6 = fun5 // √
    // fun5 = fun6 // ×

    /* 2.3 枚举 */

    enum SWITCH {
        ON,
        OFF
    }
    enum STATUS {
        WATING,
        SUCCESS,
        FAILE
    }
    let s = SWITCH.ON;
    s = 1;
    // s = STATUS.WATING; // ×

    /* 2.4 类 */

    // tslint:disable-next-line:max-classes-per-file
    class Animal {
        constructor(public name: string) { }
    }
    // tslint:disable-next-line:max-classes-per-file
    class Person {
        public age: number;
        constructor(public name: string) { }
    }
    // tslint:disable-next-line:max-classes-per-file
    class Food {
        constructor(public name: number) { }
    }

    // tslint:disable-next-line:prefer-const
    let animal1: Animal;
    // tslint:disable-next-line:prefer-const
    let person1: Person;
    // tslint:disable-next-line:prefer-const
    let food1: Food;
    animal1 = person1; // √可以舍弃部分属性
    // person1 = food1; // × food缺少成员属性
    // food1 = animal1; // × food成员属性类型不一致

    /* private protected */
    // tslint:disable-next-line:max-classes-per-file
    class Parent1 {
        private age: number;
    }
    // tslint:disable-next-line:max-classes-per-file
    class Child1 extends Parent1{
        constructor() {
            super()
        }
    }

    // tslint:disable-next-line:max-classes-per-file
    class Other {
        private age: number;
    }

    const children1: Parent1 = new Child1()
    // const other: Parent1 = new Other() // × 类型具有私有属性“age”的单独声明。

    /* 2.5 泛型 */

    // tslint:disable-next-line:no-empty-interface
    interface Data<T> {
        data: T
    }
    // tslint:disable-next-line:prefer-const
    let data1: Data<number>;
    // tslint:disable-next-line:prefer-const
    let data2: Data<string>;
    // data1 = data2; // × 不能将类型“string”分配给类型“number”。
    // data2 = data1; // × 不能将类型“number”分配给类型“string”。
})()

```

## 高级类型(一)

```js
/* 高级类型 */
(() => {
    /* 1. 交叉类型 */

    const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
        const res: T & U = Object.assign(arg1, arg2);
        return res;
    }
    // tslint:disable-next-line:no-unused-expression
    // mergeFunc({ a: '1' }, { b: 'x'}).c // × 不存在属性“c”。

    /* 联合类型 */

    interface LengthAble {
        length: number
    }
    const getLengthFunc = (content: string | number | object): number => {
        if (typeof content == 'string') return content.length;
        else return content.toString().length;
    }
    console.log(getLengthFunc('123'));
    console.log(getLengthFunc({ length: 10 }));
    console.log(getLengthFunc(999));

    /* 类型保护 */

    const valueList = [123, 'abc'];
    const getRandomValue = () => {
        const num = Math.random() * 10;
        return valueList[Math.floor(num / 5)]
    }
    const item = getRandomValue();
    if ((item as string).length) {
        console.log((item as string).length);
    } else {
        console.log((item as number).toFixed());
    }

    // 定义一个函数类型保护
    function isString(value: number | string): value is string {
        return typeof value === 'string';
    }

    if (isString(item)) {
        console.log(item.length);
    } else {
        console.log(item.toFixed());
    }

    // 使用typeof类型保护
    /*
     * 使用条件：
     *
     * 1. 只能使用 == != === !==
     * 2. 如 includes 等判断无效
     * 3. 只能保护 string/number/boolean/symbol
     */

    if (typeof item === 'string') {
        console.log(item.length);
    } else {
        console.log(item.toFixed());
    }

    // 使用instanceof类型保护

    // tslint:disable-next-line:max-classes-per-file
    class CreateByClass1 {
        public age = 18;
    }
    // tslint:disable-next-line:max-classes-per-file
    class CreateByClass2 {
        public name = 'Gyahub'
    }

    const itemList = [new CreateByClass1(), new CreateByClass2()];

    function getRandomItem() {
        const num = Math.random() * 10;
        return itemList[Math.floor(num / 5)]
    }
    const item2 = getRandomItem();
    if (item2 instanceof CreateByClass1) {
        console.log('CreateByClass1', item2.age)
    } else {
        console.log('CreateByClass2', item2.name)
    }

    /* null和undefined */

    // 非严格模式下 undefined可以赋值给部分类型
    // tslint:disable-next-line:prefer-const
    let strvalue = 'str';
    // strvalue = undefined; // 非严格模式 √

    // 严格模式下 "strictNullChecks": true
    // 可选参数会默认变成 类型|undefined 的联合类型
    const sumFunc = (arg1: number, arg2?: number) => {
        return arg1 + (arg2 ?? 0);
    }

    console.log(sumFunc(5), sumFunc(5, 6));

    /* 类型保护和类型断言 */

    // 严格模式下 一个值若即可为为undefined也可以为string
    // 必须手动声明为一个联合类型

    const getLengthFunc2 = (value: string | null): number => {
        return (value ?? '').length
    }

    function getSpliceStr(num: number | null): string {
        function getRes(prefix: string) {
            // num! 标识 num不为null
            return prefix + num!.toFixed().toString()
        }
        num = num ?? 0.1;
        return getRes('Che_')
    }
    console.log(getSpliceStr(1.2))

    /* 类型别名 */

    type TypeString = string;
    const strvalue1: TypeString = '';

    type PositionType<T> = { x: T, y: T }
    const position1: PositionType<number> = {
        x: 1,
        y: -1
    }

    const position2: PositionType<string> = {
        x: 'left',
        y: 'top'
    }
    /* 类型别名可以在*属性*中引用自己 */
    type Tree<T> = {
        current: T,
        child?: Tree<T>[]
    }

    const tree: Tree<string> = {
        current: 'root',
        child: [
            {
                current: 'child_node',
                child: [{
                    current: 'leaf'
                }]
            }
        ]
    }

    // 为接口或类声明别名时*不可以*使用implement和extends

    type Alias = { num: number }
    interface AliasInter{ num: number }
    const _alias: Alias = { num: 10 }
    const _aliasInter = _alias;

    // 类型需要拓展时应使用接口
    // 临时使用时应使用类型别名

    /* 字面量类型 */

    // 字符串字面量

    type Name = 'Che';
    const name1: Name = 'Che';
    // const name2: Name = 'Gayhub'; // 不能将类型“"Gayhub"”分配给类型“"Che"”

    type Direction = 'north' | 'east' | 'south' | 'west'
    function getDirection(direction: Direction) {
        return direction[0];
    }
    console.log(getDirection('west'))

    // 数字字面量

    type State = -1 | 0 | 1 | 2 | 3;
    interface ReturnMsg {
        msg: string,
        code: State
    }
    const returnMsg: ReturnMsg = {
        msg: 'success',
        code: 1
    }
    /* 枚举成员类型 */

    // 条件
    // 不带初始值的成员
    // 值为字符串字面量
    // 值为数字字面量
    // 所有枚举成员都满足以上任一条件的情况下，枚举成员可以作为类型使用

    enum Animals {
        Dog = 1,
        Cat = 'cat',
        Monkey = 2,
        Ribbit
    }

    interface Dog {
        type: Animals.Dog // 可以是Animals.Dog 或number
    }
    const dog: Dog = { type: Animals.Dog }
    dog.type = 2;

    interface Cat {
        type: Animals.Cat
    }
    const cat: Cat = { type: Animals.Cat } // 只可以是Animals.Cat

    /* 可辨识联合 */
    // 1. 单例类型 【枚举成员类型和字面量类型】
    // 2. 联合类型
    // 3. 类型别名
    // 4. 类型保护
    // 合并称为 可辨识联合/标签联合/代数数据类型

    /* 辨识特征： 具有普通的单例类型属性 */
    /* 类型别名包含了哪些类型的联合 */

    interface Square {
        kind: 'square',
        size: number
    }

    interface Ractangle {
        kind: 'rectangle',
        height: number,
        width: number
    }

    interface Circle {
        kind: 'circle',
        radius: number
    }

    type Shape = Square | Ractangle | Circle;
    function assertNever(value: never): never {
        throw new Error('Unexpected Object: ' + value);
    }
    function getArea(s: Shape):number {
        switch (s.kind) {
            case 'square': return s.size ** 2; break;
            case 'rectangle': return s.height * s.width; break;
            case 'circle': return Math.PI * s.radius ** 2; break;
            default:
                return assertNever(s);
        }
    }
    // 完整性检查
    // 1. 利用 strictNullChecks 若缺少分支，返回值为undefined
    // 2. 使用 never 类型 比较通用
})()

```

## 高级类型II


```js
/**
 * 高级类型II
 */
(() => {
    /* 1. this类型 */
    class Counter {
        constructor(public count: number = 0) { }
        add(value: number) {
            this.count += value;
            return this;
        }

        subtract(value: number) {
            this.count -= value;
            return this;
        }
    }
    const counter = new Counter();
    counter.add(10);
    counter.subtract(3);
    console.log(counter.count)

    // tslint:disable-next-line:max-classes-per-file
    class PowCounter extends Counter {
        constructor() {
            super()
        }

        public pow(value: number) {
            this.count **= value;
            return this;
        }
    }
    const powCounter = new PowCounter();
    console.log(powCounter.add(2).pow(4).subtract(10).count)

    /* 2. 索引类型 */
    /* 2.1 索引类型查询操作符 */
    // keyof

    interface Info {
        name: string;
        age: number;
    }
    let infoProp: keyof Info;
    infoProp = 'name';
    infoProp = 'age';
    // infoProp = 'gender';

    function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
        return names.map(bean => obj[bean]);
    }

    const info1: Info = {
        name: 'Che_Gayhub',
        age: 18
    }
    console.log(getValue(info1, ['name', 'age']))

    /* 2.2 索引访问操作符 */
    // [] 返回类型指定字段（索引）的类型

    type NameTypes = Info['name']; // string

    function getProperty<T, K extends keyof T>(obj: T, name: K): T[K] {
        return obj[name];
    }

    interface Objs<T> {
        // [key: number]: T
        [key: string]: T
    }
    const objs1: Objs<number> = {
        age: 10
    }

    // tslint:disable-next-line:prefer-const
    let _keys: keyof Objs<number>;
    Object.keys(objs1).forEach(bean => {
        _keys = bean;
    });

    interface Type {
        a: never;
        b: never;
        c: string;
        d: number;
        e: undefined;
        f: null;
        g: object;
    }

    type Test = Type[keyof Type] // string | number | object

    /* 3. 映射类型 */
    /* 3.1 基础 */
    // 借助旧类型创建新类型
    interface Info2 {
        age: number;
        name: string;
        gender: string;
    }
    interface ReadonlyInterface {
        readonly age: number;
        readonly name: string;
        readonly gender: string;
    }

    type ReadOnlyType<T> = {
        readonly [P in keyof T]: T[P] // ReadOnly映射
    }
    type PartialType<T> = {
        [P in keyof T]?: T[P] // Partial映射
    }
    type PickType<T, K extends keyof T> = {
        [P in K]?: T[P] // Pick映射
    }
    type RecodeType<T> = {
        [P in keyof T]?: T[P] // Partial映射
    }
    type ReadOnlyInfo2 = ReadOnlyType<Info2>;
    const info2: ReadOnlyInfo2 = {
        age: 18,
        name: 'Che_Gayhub',
        gender: 'male'
    }
    // 内置的映射类型
    // ReadOnly[只读] Partial[可选]
    // Pick[子集] Recode[转化]
    // info2.age = 10; // 只读
    interface Info3 {
        name: string,
        age: number,
        address: string
    }
    const info3: Info3 = {
        name: 'Che_gayhub',
        age: 18,
        address: 'Tianjin'
    }

    function pick<T, K extends keyof T>(obj: T, keys: K[]): PickType<T, K> {
        const res: any = {};
        keys.forEach(key => { res[key] = obj[key] });
        return res;
    }

    const nameAndAddress = pick(info3, ['name', 'address']);
    console.log(nameAndAddress)

    // 将类型 Record<number, string> 转化为 Record<number, number>
    function mapObject<K extends string | number, T, U>(
        obj: Record<K, T>, f: (x: T) => U
    ): Record<K, U> {
        const res: any = {};
        // tslint:disable-next-line:forin
        for (const key in obj) {
            res[key] = f(obj[key]);
        }
        return res;
    }

    const _names = { 0: 'hello', 1: 'world', 2: 'bye' }
    const length = mapObject(_names, (s) => s.length);
    console.log(length)
    // 同态：两个代数结构之间的保持结构不变的映射
    // ReadOnly Partial Pick 为同态的
    // Recode为非同态

    /* 3.2 由映射类型进行推断 */

    // 映射封包
    type Proxy<T> = {
        get(): T,
        set(value: T): void
    }
    type Proxify<T> = {
        [P in keyof T]: Proxy<T[P]>
    }
    function proxify<T>(obj: T): Proxify<T> {
        const result = {} as Proxify<T>;
        // tslint:disable-next-line:forin
        for (const key in obj) {
            result[key] = {
                get: () => obj[key],
                set: (value) => obj[key] = value
            }
        }
        return result;
    }

    const props = {
        name: 'Che',
        age: 18,
    }

    const proxyProps = proxify(props);
    proxyProps.name.set('Gayhub');

    // 映射拆包
    function unproxify<T>(t: Proxify<T>): T {
        const result = {} as T;
        // tslint:disable-next-line:forin
        for (const k in t) {
            result[k] = t[k].get();
        }
        return result;
    }
    const originalProps = unproxify(proxyProps);
    console.log(originalProps)

    /* 3.3 增加或移除特定修饰符 */

    // 通过在修饰符前增加"+","-"符合来实现增加/移除该修饰符
    // 默认为增加修饰符
    type RemoveReadonlyInfo2<T> = {
        -readonly [P in keyof T]: T[P]
    }

    type InfoWithoutReadonly = RemoveReadonlyInfo2<ReadOnlyInfo2>;

    /* 3.4 keyof和映射类型在2.9版本的升级 */

    const stringIndex = 'a';
    const numberIndex = 1;
    const symbolIndex = Symbol()
    type Objs2 = {
        [stringIndex]: string,
        [numberIndex]: number,
        [symbolIndex]: symbol
    }
    type keysType = keyof Objs2;

    type ReadonlyTypes<T> = {
        readonly [P in keyof T]: T[P]
    }

    const Objs3: ReadonlyTypes<Objs2> = {
        a: 'aa',
        1: 11,
        [symbolIndex]: Symbol()
    }
    // Objs3.a = 'bb'; // 无法分配到 "a" ，因为它是只读属性。

    /* 3.5 元组和数组上的映射类型 */

    type MapToPrmise<T> = {
        [K in keyof T]: Promise<T[K]>
    }

    type Tuple = [number, string, boolean]
    type promiseTuple = MapToPrmise<Tuple>
    const tuple1: promiseTuple = [
        new Promise((resolve, reject) => resolve(1)),
        new Promise((resolve, reject) => resolve('a')),
        new Promise((resolve, reject) => resolve(false)),
    ]

    /* 3.6 unknown */
    // TS3.0中新增的顶级类型，相对any来说是安全的
    /* 3.6.1 任何类型的值都可以赋值给unknown */
    let value1: unknown;
    value1 = 'a';
    value1 = null;
    value1 = () => {/* some */ };
    /*
    3.6.2 在没有类型断言或基于控制流的类型细化时
    unknow不可以赋值给其他类型
    此时它只能赋值给unknown和any类型
    */
    // tslint:disable-next-line:prefer-const
    let value2: unknown;
    // tslint:disable-next-line:prefer-const
    // let strval: string = value2; // 不能将类型“unknown”分配给类型“string”。
    value1 = value2;
    /*
    3.6.3 如果没有类型断言或基于控制流的类型细化时
    不能在它上面进行任何操作
    */
    // tslint:disable-next-line:prefer-const
    let value4: unknown = 1;
    // value4 += 1;
    (value4 as number) += 1;

    /* 3.6.4 unkunow与其他类型组成的交叉类型都等于其他类型 */

    type type1 = string & unknown; // string
    type type2 = boolean | number & unknown; // string

    /* 3.6.5 unkunow与除any外其他类型组成的联合类型都等于unkunow类型 */

    type type3 = boolean | unknown; // unknown
    type type4 = any | unknown; // any

    /* 3.6.6 never是unknown类型的子类型 */

    type type5 = never extends unknown ? true : false;

    /* 3.6.7 keyof unknow类型为never */

    type type6 = keyof unknown;

    /* 3.6.8 只能对unkunow进行等于或不等于操作，不能进行其他操作 */

    console.log(value1 === value2)
    console.log(value1 !== value4);

    /*
    3.6.9 unkunow类型的值不能访问其属性，
    也不能作为函数调用，
    或作为类创建实例
    */

    /* 3.6.X 使用映射类型时，如果便利的unknown类型则不会映射任何实例 */
    type Type1<T> = {
        [P in keyof T]: T[P]
    }
    type type7 = Type1<unknown>;

    /* 4. 条件类型 */
    /* 4.1 基础 */
    // T extends U ? X : Y
    type Type2<T> = T extends string ? string : number;
    // tslint:disable-next-line:prefer-const
    let indexStr: Type2<'a'>;
    // tslint:disable-next-line:prefer-const
    let indexNum: Type2<1>;

    /* 4.2 分布式条件类型 */

    type TypeName<T> = T extends string ? string :
        T extends number ? number :
        T extends boolean ? boolean :
        T extends undefined ? undefined :
        T extends ()=>any ? ()=>any : object;
    // tslint:disable-next-line:prefer-const
    type index3 = TypeName<string | number>;

    type Diff<T, U> = T extends U ? never : T;
    type test = Diff<string | number | boolean, undefined | number>;

    // 条件类型 与 映射类型
    type Type3<T> = {
        // tslint:disable-next-line:ban-types
        [K in keyof T]: T[K] extends Function ? K : never;
    }[keyof T]
    interface Part {
        id: number,
        name: string,
        subparts: Part[],
        undatePart(newName: string): void
    }
    type test2 = Type3<Part>

    /* 4.3 条件类型的类型推断 */

    // infer Array<infer U> (infer U)[]
    type Type4<T> = T extends any[] ? T[number] : T
    type type8 = Type4<string[]>;

    type Type5<T> = T extends Array<infer U> ? U : T
    type type9 = Type5<string[]>;

    /* 4.4 TS预设条件类型 */
    // Exclude<T, U> 取T 与 U 的差集
    type type10 = Exclude<'a' | 'b' | 'c', 'a'>
    // Extract<T, U> 取T 与 U 的交集
    type type11 = Extract<'a' | 'b' | 'c', 'a' | 'c'>
    // NonNullable<T> 去除T中的 null 和 undefined
    type type12 = NonNullable<string | boolean | null | void>
    // ReturnType<T extends Function>
    type type13 = ReturnType<() => string>
    // InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any>
    // 获取构造函数类型的实例类型
    // tslint:disable-next-line:max-classes-per-file
    class Aclass {
        constructor() {/* */};
    }
    type type14 = InstanceType<typeof Aclass>
    type type15 = InstanceType<any>
    type type16 = InstanceType<never>
    type type17 = InstanceType<typeof String>
})()
```