# typescript

> npm install typescript -g 全局安装

> tsc -v 查看版本

> tsc --init 生成 tsconfig.json

> tsc index.ts 编译文件

### 调试

> 使用 vs code 调试，选择 nodeJS
> 然后配置它

```json
"program": "${workspaceFolder}\\src\\index.ts",
// 告诉vscode 使用typescript 编译
"preLaunchTask": "tsc: build - tsconfig.json",
```

## 基础类型

### any

> tsconfig.json 中 设置 "noImplicitAny": false,
> 当 ts 类型推断时，推断为 any 也不会报错

### Array

```ts
let numbers = []; // 类型推断为  any
```

### 元组

> 固定长度的数组。其中每个元素都有一个特定的类型

```ts
let user: [number, string] = [0, "a"];
```

### enum 枚举

> 枚举如果不使用 常量 声明，那么生成的 javascript 会很冗长
> 如果 使用 const 声明，那么生成的 javascript 会少很多 const enum Size {}

```ts
// 枚举的类型 索引 默认为0 ，可以自己指定为  1 2 3等，后面的依次增长
enum Size {
  Samll = 1,
  Medium,
  Large,
}

let mySize: Size = Size.Medium;

console.log(mySize);
```

### function

> tsconfig.json 配置
> noUnusedParameters:true 当函数 传递的参数未使用时，会以波浪线 提示
> "noImplicitReturns": true, 当函数 没有手动返回值时，提示
> "noUnusedLocals": true, 当在函数中声明 变量，但是未使用时 提示

### Object

```ts
// 给对象 添加类型
let employee: {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
} = {
  id: 0,
  name: "mosh",
  retire: (date: Date) => {
    console.log(date);
  },
};

// employee 是雇员 的意思，那么雇员的 id 是不能够被修改的
employee.id = 10; // 所以 这里 是会报错的，因为我们添加了一个 readonly 在 id 前面
```

### TYPE 别名(aliases)

> 将上面代码进行拆分
> 使用 type 后，我们可以重复使用该 声明

```ts
type Employee {
  readonly id: number
  name: string,
  retire:(date:Date)=>void
}

let employee: Employee = {
  id: 0,
  name: 'mosh',
  retire: (date: Date) => {
    console.log(date);
  }
}
```

### union Types 联合类型

```ts
function kgToLbs(weight: number | string): number {
  if (typeof weight === "number") return weight * 2.2;
  else return parseInt(weight) * 2.2;
}

kgToLbs(10);
kgToLbs("10");
```

### literal Types 字面量类型

```ts
type Quantity = 50 | 100;

let quantity: Quantity = 50;

type Metric = "cm" | "inch";
```

### null types

```ts
function greet(name: string | null | undefined) {
  if (name) console.log(name.toUpperCase());
  else console.log("hello");
}

greet(null);
```

### 可选链

```ts
let a = {};
a?.name;
```

### 空值合并

```ts
let speed: number | null = null;

let ride = {
  speed: speed ?? 30,
};

console.log(ride.speed); // 30
```

### 类型断言

```ts
let phone = document.getElementById("phone") as HTMLInputElement;

phone.value;
```

### 未知类型 unknown

### never 从不

> tsconfig.json 配置
> "allowUnreachableCode": false 可以让我们查看 那么代码是运行时无法到达的地方

## 对象类型

### creating classes 创建类

```ts
class Account {
  id: number;
  owner: string;
  balance: number;
  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("invalid amount");
    this.balance += amount;
  }
}
```

### 创建对象

```ts
const account = new Account(1, "mosh", 0);
account.deposit(100);
console.log(account.balance); // 100
```

### 只读 与 可选属性

> +--- 表示新增的代码

```ts
class Account {
+---  readonly id: number;
  owner: string;
  balance: number;
+---  nickname?: string;
  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("invalid amount");
    this.balance += amount;
  }
}
```

### 访问控制关键字

> public
> private 只有类的 内部能够访问

```ts
class Account {
  readonly id: number
  owner: string
+--  private _balance: number
  nickname?:string
  constructor(id: number, owner: string, balance: number) {
    this.id = id
    this.owner = owner
+--    this._balance = balance
  }
  deposit(amount:number):void {
    if (amount <= 0)
      throw new Error('invalid amount')
+--    this._balance += amount
  }
+  getBalance(): number {
+    return this._balance
+  }
+  private calculateTax() {
+
+  }
}

const account = new Account(1, 'mosh', 0)
account.deposit(100)
// console.log(account.balance); // 100
+ console.log(account.getBalance());

```

### 参数属性

> 为了让我们 写的 类更加简洁，不用重复编写

```ts
class Account {
  nickname?: string;
  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number
  ) {}
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("invalid amount");
    this._balance += amount;
  }
  getBalance(): number {
    return this._balance;
  }
}
```

### 存储器 getting and setting

> get set 的名字可以 跟 参数名不相同

```ts
class Account {
  nickname?: string;
  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number
  ) {}

  getBalance(): number {
    return this._balance;
  }

  get balance() {
    return this._balance;
  }

  set balance(val) {
    if (val <= 0) throw new Error("invalid val");
    this._balance += val;
  }
}
```

### 索引签名

> 使用索引签名 ，可以动态创建属性

```ts
class Seat {
  [seatNumber: string]: string;
}

const seat = new Seat();
seat.A1 = "mosh";
seat.A2 = "yuhan";
```

### static members 静态成员

> 静态成员属性 static
> 静态成员只允许 类本身访问，它的实例无法访问

```ts
class Ride {
  private static _activeRides: number = 0;

  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }

  static get activeRides() {
    return Ride._activeRides;
  }
}

const ride1 = new Ride();
console.log(ride1.start());
console.log(Ride.activeRides); // 1
```

### inheritance 继承

> 继承公共属性

```ts
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName() {
    return this.firstName + "" + this.lastName;
  }

  walk() {
    console.log("take in walk");
  }
}

class Student extends Person {
  constructor(public id: number, firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  takeTest() {
    console.log("taking a test");
  }
}

const student = new Student(1, "johy", "123@qq.com");
```

### 方法重写

> override 是方法重写的关键字

```ts
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName() {
    return this.firstName + "" + this.lastName;
  }

  walk() {
    console.log("take in walk");
  }
}

+class Teacher extends Person {
+  override get fullName() {
+    return "professor" + super.fullName;
+  }
+}

+const teacher = new Teacher("Jo", "han");
+console.log(teacher.fullName); // professor Johan
```

### 多态性

```ts
class Person {
  constructor(public firstName:string,public lastName:string) { }

  get fullName() {
    return this.firstName + '' + this.lastName
  }

  walk() {
    console.log('take in walk');
  }
}


class Student extends Person {
  constructor(public id:number,firstName:string,lastName:string) {
    super(firstName,lastName)
  }

  takeTest() {
    console.log('taking a test');
  }
}

class Teacher extends Person {
  override get fullName() {
    return 'professor' + ' ' + super.fullName
  }
}

+printFullName([
+  new Student(1, 'zhang', 'san'),
+  new Teacher('han','wen')
+])

+function printFullName(persoArr:Person[]) {
+  for (const person of persoArr) {
+    console.log(person.fullName);
+  }
+}
```

### 私有成员和保护成员

> private 私有成员 : 只有类 内部能够访问
> protected 保护成员 : 可以被继承 类成员在类以及子类中可以被访问

### 抽象类和方法

> abstract 关键字
> 用来定义抽象类和抽象方法
> 被 abstract 标记的 类 必须被 其他类 继承 并扩展

```ts
abstract class Shape {
  constructor(public color: string) {}

  abstract render(): void;
}

// const shape = new Shape() // 报错
```

```ts
class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }
  override render() {
    console.log("this is drive circle function");
  }
}

const circle = new Circle(15, "red");
```

### interface 接口

> implements 关键字
> 将 接口当做抽象类使用的 工具

```ts
interface Calendar {
  name: string;
  addEvent(): void;
  removeEvent(): void;
}

interface CloudCalendar extends Calendar {
  async(): void;
}

class GoogleCalendar implements Calendar {
  constructor(public name: string) {}
  addEvent() {}
  removeEvent() {}
}
```

## 泛型

> 1. 类泛型

```ts
class KeyValuePair<T, U> {
  constructor(public key: T, public value: U) {}
}

// 这个泛型 类型可以给也可以不给，会自己推断出来
const pair = new KeyValuePair<number, number>(1, 1);
```

> 2. 函数 泛型

```ts
class ArrayUtils {
  static wrapInArray<T>(value: T) {
    return [value];
  }
}

const utils = ArrayUtils.wrapInArray(1);
```

> 3. 对 api 接口使用泛型

```ts
interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: null };
}

interface User {
  username: string;
}
interface Product {
  title: string;
}
let result = fetch<User>("url");
result.data?.username;
```

### 泛型约束

> **extends** 关键字

```ts
function echo<T extends string | number>(value: T) {
  return value;
}

echo(true); // 类型“boolean”的参数不能赋给类型“string | number”的参数
```

```ts
function echo<T extends { num: string }>(value: T) {
  return value;
}

echo({ num: "1" });
```

> 使用接口进行扩展

```ts
interface Person {
  name: string;
}

function echo<T extends Person>(value: T) {
  return value;
}

echo({ name: "1" });
```

> 使用类进行扩展

```ts
class Person {
  constructor(public name: string) {}
}

class Customer extends Person {}

function echo<T extends Person>(value: T) {
  return value;
}

echo(new Person("1"));
echo(new Customer("2"));
```

### 泛型类和继承

```ts
interface Product {
  name: string;
  price: number;
}

class Store<T> {
  protected _objects: T[] = []; // 直接初始化

  add(obj: T): void {
    this._objects.push(obj);
  }
}
```

```ts
// 传递泛型类型参数
class CompressibleStore<T> extends Store<T> {
  compress() {}
}
let store = new CompressibleStore<Product>();
store.add({ name: "1", price: 4 });
store.compress();
```

```ts
// 限制泛型类型参数
class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this._objects.find((obj) => obj.name === name);
  }
}
```

```ts
// 修复泛型类型参数
class ProductStore extends Store<Product> {
  filterByCategory(category: string): Product[] {
    return [];
  }
}
```

## keyof

```ts
interface Product {
  name: string;
  price: number;
}

class Store<T> {
  protected _objects: T[] = []; // 直接初始化

  add(obj: T): void {
    this._objects.push(obj);
  }
  // T is Product
  // keyof T => 'name' | 'price'
  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find((obj) => obj[property] === value);
  }
}

let store = new Store<Product>();
store.add({ name: "a", price: 1 });
store.find("name", "a");
store.find("price", 1);
store.find("non", 1); //报错
```

## 类型映射

```ts
interface Product {
  name: string;
  price: number;
}

// 将上面的类型变成只读
type ReadonlyProduct = {
  readonly // [Property in keyof Product]: Product[Property]
  // 上面的可以简写为
  [P in keyof Product]: Product[P];
};
```

```ts
interface Product {
  name: string;
  price: number;
}

// 如果有其他的需求该如何呢，所以进行修改
type ReadonlyProduct<T> = {
  readonly [K in keyof T]: T[K];
};

let product: ReadonlyProduct<Product> = {
  name: "1",
  price: 1,
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

## 装饰器

## 导入和导出

## ts 与 react 结合

> npx create-react-app reminders-app --template typescript

vscode 插件

> Reactjs code snippets

在线 api 地址

> jsonplaceholder.typicode.com
