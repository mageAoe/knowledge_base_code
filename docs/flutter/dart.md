---
# 取二三级标题生成目录
outline: [2,3]
---


## 安装 dart运行环境

https://chocolatey.org/

https://chocolatey.org/install

> 首先进入这个网站https://chocolatey.org/install#individual
>
> 将网站的命令复制到 管理员运行的powershell 里面回车
>
> ```shell
> // 查看版本号
> choco -v
> ```

> 进入这个网站https://dart.dev/get-dart
>
> 安装 ```dart-sdk```
>
> ```shell
> choco install dart-sdk
> ```

>vs code 安卓 **dart  ** **Code Runner**  插件

## Dart基础

> 官网教程： https://dart.dev/language/error-handling

### 变量和常量

1. 使用```var```声明变量，可以赋予不同类型的值

   ```dart
       var a = 1;
       var b ;
       print(a); // 1
       print(b); // null
   ```

2. 未初始时，默认值为```null```

3. 使用```final ```声明一个只能赋值一次的变量

```dart
// 初始化指定了值， a的类型就指定了
 	var a = 1; 
    a = '123'; // 报错，不能将 string 赋值给 int类型
// 初始化未被赋值时，b 是动态类型
    var b ;
    b = 2;
    b = 'holle';
// 上面 a 的类型跟下面的 dynamic 一样
    dynamic c;
    c = 1;
    c = 'll';
// final 声明必须赋值，而且不能修改
     final d = 'holle';
```



**常量**

1. 使用const声明常量
2. 使用const声明的必须是编译器常量

```dart
    const f = 0;
```



**cosnt和final的区别:  final只能在初始化时赋值一次，后续值不可以修改。const同时也是final，区别在于 const 更加严格，它是编译时常量，也就是说如果一个变量声明为const ，那么应该在非运行时就能得到这个值**

### 内置类型

1. number（num、int、double）数字
2. string 
3. boolean
4. lists 类似数组
5. maps
6. runes
7. symbol

#### number

```dart
void main() {
  var a = 1;
  int a1 = 1; // 强类型声明
  // a1 = 2.1; // 报错 int 类型不能赋值 double类型
  double a2 = 2.1;
  //int类型跟double类型可以相互转换
  print(a2.toInt()); // 2
  print(a1.toDouble()); // 1.0
}
```

**num 类型是int类型跟double的父类** 变量可以同时具有整数和双精度值

```dart
  num a3 = 1;
  a3 = 2.3;
```

#### string

```dart
void main() {
  
  var str = 'holle';
  String str1 = 'holle word';
  String str2 = "holle dart";
// 类似 js 模板字符串
  String str3 = '''
  holle word $str
  holle dart
  ''';

  print(str3);

  String str4 = "$str1 and $str2";
  print(str4);
  // 如果在前面加个 r 就会输出原始字符 \n 会失效
  String str5 = r"$str1 and \n $str2"; // 会换行
  print(str5);
}
```

字符串转换为数字的方法

```dart
// String -> int
var one = int.parse('1');
// String -> double
var onePointOne = double.parse('1.1');
// int -> String
String oneAsString = 1.toString();
// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
```

#### boolean

```dart
void main() {
  // dart 中 bool 只能声明 true or false
  bool isTrue = true;
  bool isFalse = false;
// 这个段代码在 js 中是可以运行的，但是在 dart中报错
  var a = 1;
  if(a){
    print('holle');
  }
// dart中可以这样来判断， 但是没有 === 
  if(a == 1){
    print('holle');
  }

}
```

#### List

```dart
void main() {
  // 列表类型 List Array
  var arr = [1,2,3];
  List arr2 = [3,3,3];
  //list 类
  // var arr3 = new List();

  print(arr);

  //列表常用的操作
  arr[0] = 100;
  print(arr[0]);
  // 从 list 最后面添加
  arr.add(300); // [100,2,3,300]
  // 按照 list 值删除
  arr.remove(300); // [100,2,3]
  // 按照 下标 删除
  arr.removeAt(1); // [100,3]
  print(arr);

  // 定义一个不可变的列表
  var arr5 = const [1,2];
  // arr5.add(6); // 会报错

  print(arr.indexOf(2)); // -1
  print(arr.indexOf(3)); // 1

  arr.forEach((element) {
    print(element); // 100 3
  });
}
```

```dart
//1、第一种定义List的方式

  var l1=["张三",20,true];
  print(l1);  //[张三, 20, true]
  print(l1.length);  //3
  print(l1[0]); //张三
  print(l1[1]); //20

  // 2、第二种定义List的方式 指定类型

  var l2=<String>["张三","李四"];
  print(l2);

  var l3 = <int>[12, 30];
  print(l3);

 // 3、第三种定义List的方式  增加数据 ,通过[]创建的集合它的容量可以变化

  var l4 = [];
  print(l4);
  print(l4.length);

  l4.add("张三");
  l4.add("李四");
  l4.add(20);
  print(l4);
  print(l4.length);

  var l5 = ["张三", 20, true];
  l5.add("李四");
  l5.add("zhaosi");
  print(l5);


 // 4、第四种定义List的方式

     var l6=new List();  //在新版本的dart里面没法使用这个方法了

    var l6=List.filled(2, "");  //创建一个固定长度的集合
    print(l6);
    print(l6[0]);

    l6[0]="张三";   //修改集合的内容
    l6[1]="李四";
    print(l6);  //[张三, 李四]
    l6.add("王五");  //错误写法  通过List.filled创建的集合长度是固定  没法增加数据



   // 通过List.filled创建的集合长度是固定
    var l6=List.filled(2, "");
    print(l6.length);
    l6.length=0;  //修改集合的长度   报错



    var l7=<String>["张三","李四"];
    print(l7.length);  //2
    l7.length=0;  //可以改变的
    print(l7);  //[]




    var l8=List<String>.filled(2, "");
    l8[0]="string";
    // l8[0]=222;
    print(l8);
```

#### Map

```dart
void main() {
  var user = {
    "name": "张三",
    "age": 21,
    "hobby": ["footbal","swimming"]
  };
  // 不可变的 map
  var user2 = const {
    "name": "张三",
    "age": 21,
    "hobby": ["footbal","swimming"]
  };

  Map user3 = {
    "name": "张三",
    "age": 21,
    "hobby": ["footbal","swimming"]
  };
  print(user3);

  var user4 = new Map();
  user4["name"] = "李四";
  user4.remove('name');

  print(user4); // {}

  user.forEach((key, value) => print(value));
} 
```

#### runes

> dart 中，Runes代表字符串的 UTF-32字符集，Dart字符串是UTF-16的字符序列
>
> unicode为每一个字符、标点符号、表情等都定义了一个唯一的数值

```dart
void main() {
  // 两个都打印的爱心符号
  var heart = "\u2665";
  print(heart);

  var heart2 = new Runes('\u2665');

  print(new String.fromCharCodes(heart2));
}
```

#### symbol

> dart 语言的标识符

```dart
void main() {
  var sym1 = Symbol("name");
  print(sym1); // Symbol("name");
  var b = #b;
  print(b); // Symbol("b");
}
```

#### 判断类型

```dart
  var str=123;
  if(str is String){
    print('是string类型');
  }else if(str is int){
     print('int');
  }else{
     print('其他类型');
  }
```

### 运算符

> dart 定义了下表所示的运算符，你可以重写许多这些运算符

| 描述           | 运算符                                                  |
| -------------- | ------------------------------------------------------- |
| 一元后缀       | expr++  expr-- ()  []  .  ?.                            |
| 一元前缀       | -expr  !expr  ~expr   ++expr  --expr                    |
| 乘法类型       | *  /  %  ~/                                             |
| 加法类型       | +  -                                                    |
| 移动位运算     | <<    >>                                                |
| 与位运算       | &                                                       |
| 异或位运算     | ^                                                       |
| 或运算         | \|                                                      |
| 关系和类型测试 | >=  <=   <    >   as   is   !is                         |
| 等式           | ==   !=                                                 |
| 逻辑与         | &&                                                      |
| 逻辑或         | \|\|                                                    |
| 条件           | expr?  expr2 : expr3                                    |
| 级联           | ..                                                      |
| 赋值           | =   *=  /=  ~/=   +=   -=  <<=   >>=  &=  ^=  \|=   ??= |

```dart
  int a=13;
  int b=5;

  print(a+b);   //加
  print(a-b);   //减
  print(a*b);   //乘
  print(a/b);   //除
  print(a%b);   //其余
  print(a~/b);  //取整
```

```
  //  ==    ！=   >    <    >=    <=

  int a=5;
  int b=3;

  print(a==b);   //判断是否相等
  print(a!=b);   //判断是否不等
  print(a>b);   //判断是否大于
  print(a<b);   //判断是否小于
  print(a>=b);   //判断是否大于等于
  print(a<=b);   //判断是否小于等于


  if(a>b){
    print('a大于b');
  }else{
    print('a小于b');
  }
```

####  逻辑运算符

```dart
  /* ! 取反 */ 

  // bool flag=false;
  // print(!flag);   //取反



 /* &&并且:全部为true的话值为true 否则值为false */ 

  // bool a=true;
  // bool b=true;
  // print(a && b);


 /* ||或者：全为false的话值为false 否则值为true */ 

  // bool a=false;
  // bool b=false;
  // print(a || b);



//如果一个人的年龄是20 并且 sex是女的话我们打印这个人

  // int age=20;
  // String sex="女";
  // if(age==20 && sex=="女"){
  //   print("$age --- $sex");
  // }else{
  //   print("不打印");
  // }



//如果一个人的年龄是20 或者 sex是女的话我们打印这个人

  int age=23;
  String sex="女";
  if(age==20 || sex=="女"){
    print("$age --- $sex");
  }else{
    print("不打印");
  }
```

####  赋值运算符

```dart
//  1、基础赋值运算符   =   ??=      

        // int a=10;
        // int b=3;
        // print(a);
        // int c=a+b;   //从右向左

    // b??=23;  表示如果b为空的话把 23赋值给b
        
        // int b=6;
        // b??=23;
        // print(b);

      
        // int b;
        // b??=23;
        // print(b);

//2、  复合赋值运算符   +=  -=  *=   /=   %=  ~/=
  
    // var a=12;
    // a=a+10;
    // print(a);

    // var a=13;
    // a+=10;   //表示a=a+10
    // print(a);

   var a=4;
   a*=3;  //a=a*3;
   print(a);
```

#### 条件表达式

```dart
  //1、if  else   switch case 


    // bool flag=true;
    // if(flag){
    //   print('true');
    // }else{
    //   print('false');
    // }


  //判断一个人的成绩 如果大于60 显示及格   如果大于 70显示良好  如果大于90显示优秀

  // var score=41;
  // if(score>90){
  //   print('优秀');
  // }else if(score>70){
  //    print('良好');
  // }else if(score>=60){
  //   print('及格');
  // }else{
  //   print('不及格');
  // }


  // var sex="女";
  // switch(sex){
  //   case "男":
  //     print('性别是男');
  //     break;
  //   case "女":
  //     print('性别是女');
  //     print('性别是女');
  //     break;
  //   default:
  //     print('传入参数错误');
  //     break;
  // }



  //2、三目运算符 

  // var falg=true;
  // var c;
  // if(falg){
  //     c='我是true';
  // }else{
  //   c="我是false";
  // }
  // print(c);



  bool flag=false;
  String c=flag?'我是true':'我是false';
  print(c);

     
  //3  ??运算符

  // var a;
  // var b= a ?? 10;
  // print(b);   10


  var a=22;
  var b= a ?? 10;
  print(b);
```

#### Dart类型转换

```dart
    //1、Number与String类型之间的转换

      // Number类型转换成String类型 toString()
      // String类型转成Number类型  int.parse()


      // String str='123';
      // var myNum=int.parse(str);
      // print(myNum is int);


      // String str='123.1';
      // var myNum=double.parse(str);
      // print(myNum is double);



      //  String price='12';
      // var myNum=double.parse(price);
      // print(myNum);
      // print(myNum is double);



      //报错
      // String price='';
      // var myNum=double.parse(price);
      // print(myNum);
      // print(myNum is double);


    // try  ... catch
    //  String price='';
    //   try{
    //     var myNum=double.parse(price);
    //     print(myNum);
    //   }catch(err){
    //        print(0);
    //   } 


    // var myNum=12;
    // var str=myNum.toString();
    // print(str is String);


    
  
 // 2、其他类型转换成Booleans类型

        // isEmpty:判断字符串是否为空

        
        // var str='';
        // if(str.isEmpty){
        //   print('str空');
        // }else{
        //   print('str不为空');
        // }


        // var myNum=123;
        // if(myNum==0){
        //    print('0');
        // }else{
        //   print('非0');
        // }


        // var myNum;
        // if(myNum==0){
        //    print('0');
        // }else{
        //   print('非0');
        // }



        // var myNum;
        // if(myNum==null){
        //    print('空');
        // }else{
        //   print('非空');
        // }



        var myNum=0/0;        
        // print(myNum);
        if(myNum.isNaN){
          print('NaN');
        }
```

### 流程控制

> dart 里的流程控制与大多数语言类似

- 条件控制： if  ，else
- 循环： for，  while，do-while
- 跳出循环、下一个循环：break ，continue
- 分支选择： switch，case
- 断言： assert

```dart
/*
     ++  --   表示自增 自减 1

    在赋值运算里面 如果++ -- 写在前面 这时候先运算 再赋值，如果++ --写在后面 先赋值后运行运算


    var a=10;
    var b=a--;

    print(a);  //9
    print(b);  //10
  
  */

    // var a=10;
    // a++;   //a=a+1;
    // print(a);


    // var a=10;
    // a--;    //a=a-1;
    // print(a);




    // var a=10;
    // var b=a++;

    // print(a);  //11
    // print(b);  //10



    // var a=10;
    // var b=++a;

    // print(a);  //11
    // print(b);  //11


    
    // var a=10;
    // var b=--a;

    // print(a);  //9
    // print(b);  //9



    // var a=10;
    // var b=a--;

    // print(a);  //9
    // print(b);  //10



    var a=10;
    ++a;
    print(a);
```

#### for循环以及循环遍历List

```dart
// for(int i=1;i<=10;i++){
  //     print(i);
  // }


  //1、打印0-50所有的偶数

    // for(int i=0;i<=50;i++){
    //     if(i%2==0){
    //       print(i);
    //     }
    // }









  //2、求 1+2+3+4 +...100的和

    // var sum=0;
    // for(var i=1;i<=100;i++){
    //     sum+=i;
    // }
    // print(sum);

    /*
      sum=0+1;
      sum=0+1+2;
      sum=0+1+2+3+...+100;

    */



  // 3、计算5的阶乘   (1*2*3*4*5    n的阶乘1*2……*n)

    // var sum=1;
    // for(var i=1;i<=5;i++){
    //     sum*=i;
    // }
    // print(sum);

    /*
    sum=1*1;

    sum=1*1*2;

    sum=1*1*3;

    sum=1*1*3*4*5;
    */



  //4、打印List  ['张三','李四','王五'] 里面的内容


    // List list=['张三','李四','王五'];
    // print(list[1]);
    // for(var i=0;i<list.length;i++){
    //   print(list[i]);
    // }




  //5、打印List 

    // List list=[{
    //   "title":"新闻111"
    // },
    // {
    //   "title":"新闻222"
    // },
    // {
    //   "title":"新闻333"
    // }];

    // print(list[1]);

    // for(var i=0;i<list.length;i++){
    //   print(list[i]['title']);
    // }


  //4、定义一个二维数组 打印里面的内容

        List list=[
          {
              "cate":'国内',
              "news":[
                {"title":"国内新闻1"},
                {"title":"国内新闻2"},
                {"title":"国内新闻3"}
              ]
          },
          {
              "cate":'国际',
              "news":[
                {"title":"国际新闻1"},
                {"title":"国际新闻2"},
                {"title":"国际新闻3"}
              ]
          }
        ];

        /*
        国内
            国内新闻1
            国内新闻2
            国内新闻3
        国际
            国际新闻1
            国际新闻2
        */


        for(var i=0;i<list.length;i++){
            print(list[i]["cate"]);
            print('-------------');
            for(var j=0;j<list[i]["news"].length;j++){
                print(list[i]["news"][j]["title"]);
            }
        }

```

#### while  do...while

```dart
/*
    int i=1;
    while(i<=10){
        print(i);
    }
    //死循环
 
 */ 



    // int i=1;
    // while(i<=10){
    //     print(i);
    //     i++;
    // }


//1、求1+2+3+4 ...+100的和


    // int i=1;
    // var sum=0;
    // while(i<=100){
    //    sum+=i;
    //    i++;
    // }
    // print(sum);


    // int i=1;
    // var sum=0;
    // do{
    //    sum+=i;
    //    i++;
    // }while(i<=100);
    // print(sum);







  //while 和 do while的区别   第一次循环条件不成立的情况下
    // int i=10;
	  // while(i<2){
	  // 	print('执行代码');
	  // }


	  var j=10;	  
	  do{
	  	print('执行代码');
	  }while(j<2);
```

#### break和continue

```dart
/*
			break语句功能:
          1、在switch语句中使流程跳出switch结构。
          2、在循环语句中使流程跳出当前循环,遇到break 循环终止，后面代码也不会执行
          
          强调:
          1、如果在循环中已经执行了break语句,就不会执行循环体中位于break后的语句。
          2、在多层循环中,一个break语句只能向外跳出一层

        break可以用在switch case中 也可以用在 for 循环和 while循环中

      continue语句的功能:
			  
        【注】只能在循环语句中使用,使本次循环结束，即跳过循环体重下面尚未执行的语句，接着进行下次的是否执行循环的判断。

        continue可以用在for循环以及 while循环中，但是不建议用在while循环中，不小心容易死循环

*/

main() {

    // for(var i=1;i<=10;i++){
    //   print(i);
    // }


    //1、如果i等于4的话跳过

    // for(var i=1;i<=10;i++){
    //   if(i==4){
    //     continue;  /*跳过当前循环体 然后循环还会继续执行*/
    //   }
    //   print(i);
    // }
  


    //2、如果 i等于4的话跳出循环

    // for(var i=1;i<=10;i++){
    //   if(i==4){
    //     break;  /*跳出循环体*/
    //   }
    //   print(i);
    // }
      

    //3、break语句只能向外跳出一层


    	//  for(var i=0;i<5;i++){	 	           	
			//   	print('外层---$i');
      //     for(var j=0;j<3;j++){            
      //       if(j==1){
      //         break;
      //       }
      //       print('里层$j');	
      //     }	
			//  }



  //4、while循环 break跳出循环

  var i=1;
  while(i<=10){
    if(i==4){
      break;
    }
    print(i);
    i++;
  }


  // var sex="男";
  // switch (sex) {
  //   case "男":
  //     print('男');
  //     break;
  //   case "女":
  //     print('男');
  //     break;
  //   default:
  // }
    
}
```

#### for循环中的闭包捕获

在for循环中，出现的闭包，dart会捕获信息，这点和JavaScript中使用var不一样

```dart
var callbacks = []
for(var i=0;i<2;i++){
    callbacks.add(()=>pringt(i))
}
callbacks.forEach((c)=> c()) // 0,1
```

如果要遍历的对象实现了```iterable```接口，那么可以使用forEach方法（不过forEach方法没有索引，这点也是和JavaScript不一样的）

```dart
candidates.forEach((candidate)=>candidates.interview())
```

而```list```和```Set```这些实现了iterable接口的类，他们还支持```for-in```形式的遍历，如下：

```dart
var collection = [0,1,2]
for(var x in collection){
    print(x)
}
```

#### switch/case

dart 里，switch适用于比较intger，string和编译时常量（const），它使用的是 == 进行比较，此外，有个强制要求，那就是：

> 每个非空分支下，必须包含break语句

```dart
var command = 'open'
switch(command){
    case 'close':
        executeClosed()
    break; // 必须，如果没有提供，则会报错
    case 'open':
        executeOpen()
     break;
    default:
        excuteKnown()
}
```

> 我们可以对某个节点加上标签，然后跳转到对应的标签：如

```dart
void main() {
  var age = 18;
  switch(age){
    case 18:
    print('you are');
    continue showAge;
    showAge:
    default:
    print('you\'re $age');
  }
}

// 输出 
// you are
// you're 18
```

### list、map、set、（forEach   、map、where、any、every）

  #### List里面常用的属性和方法

```dart
/*
List里面常用的属性和方法：

    常用属性：
        length          长度
        reversed        翻转
        isEmpty         是否为空
        isNotEmpty      是否不为空
    常用方法：  
        add         增加
        addAll      拼接数组
        indexOf     查找  传入具体值
        remove      删除  传入具体值
        removeAt    删除  传入索引值
        fillRange   修改   
        insert(index,value);            指定位置插入    
        insertAll(index,list)           指定位置插入List
        toList()    其他类型转换成List  
        join()      List转换成字符串
        split()     字符串转化成List
        forEach   
        map
        where
        any
        every

*/


void main(){

  // List myList=['香蕉','苹果','西瓜'];
  // print(myList[1]);


  // var list=new List();  //新版本没法使用
  // list.add('111');
  // list.add('222');
  // print(list);


//List里面的属性：
    // List myList=['香蕉','苹果','西瓜'];
    // print(myList.length);
    // print(myList.isEmpty);
    // print(myList.isNotEmpty);
    // print(myList.reversed);  //对列表倒序排序
    // var newMyList=myList.reversed.toList();
    // print(newMyList);

//List里面的方法：


    // List myList=['香蕉','苹果','西瓜'];
    //myList.add('桃子');   //增加数据  增加一个
    // myList.addAll(['桃子','葡萄']);  //拼接数组
    // print(myList);
    //print(myList.indexOf('苹x果'));    //indexOf查找数据 查找不到返回-1  查找到返回索引值


    // myList.remove('西瓜');
    // myList.removeAt(1);
    // print(myList);
  



    // List myList=['香蕉','苹果','西瓜'];
    // myList.fillRange(1, 2,'aaa');  //修改
    // myList.fillRange(1, 3,'aaa');  

    // myList.insert(1,'aaa');      //插入  一个
    // myList.insertAll(1, ['aaa','bbb']);  //插入 多个
    // print(myList);






    // List myList=['香蕉','苹果','西瓜'];
    // var str=myList.join('-');   //list转换成字符串
    // print(str);
    // print(str is String);  //true


    var str='香蕉-苹果-西瓜';
    var list=str.split('-');
    print(list);
    print(list is List);

}
```

#### set

```dart
//Set 

//用它最主要的功能就是去除数组重复内容

//Set是没有顺序且不能重复的集合，所以不能通过索引去获取值

void main(){

  
  // var s=new Set();
  // s.add('香蕉');
  // s.add('苹果');
  // s.add('苹果');
  // print(s);   //{香蕉, 苹果}
  // print(s.toList()); 


  List myList=['香蕉','苹果','西瓜','香蕉','苹果','香蕉','苹果'];
  var s=new Set();
  s.addAll(myList);
  print(s);
  print(s.toList());
  
}
```

#### map

```dart
/*
  映射(Maps)是无序的键值对：

    常用属性：
        keys            获取所有的key值
        values          获取所有的value值
        isEmpty         是否为空
        isNotEmpty      是否不为空
    常用方法:
        remove(key)     删除指定key的数据
        addAll({...})   合并映射  给映射内增加属性
        containsValue   查看映射内的值  返回true/false
        forEach   
        map
        where
        any
        every


*/

void main(){

 
  // Map person={
  //   "name":"张三",
  //   "age":20
  // };


  // var m=new Map();
  // m["name"]="李四";  
  // print(person);
  // print(m);

//常用属性：

    // Map person={
    //   "name":"张三",
    //   "age":20,
    //   "sex":"男"
    // };

    // print(person.keys.toList());
    // print(person.values.toList());
    // print(person.isEmpty);
    // print(person.isNotEmpty);


//常用方法：
    Map person={
      "name":"张三",
      "age":20,
      "sex":"男"
    };

    // person.addAll({
    //   "work":['敲代码','送外卖'],
    //   "height":160
    // });
    // print(person);



    // person.remove("sex");
    // print(person);


    print(person.containsValue('张三'));
}
```

#### forEach map where any every

```dart
/*
        forEach     
        map         
        where       
        any
        every
*/
void main(){


      //  List myList=['香蕉','苹果','西瓜'];
      // for(var i=0;i<myList.length;i++){
      //   print(myList[i]);
      // }


      // for(var item in myList){
      //   print(item);
      // }


      // myList.forEach((value){
      //     print("$value");
      // });




      // List myList=[1,3,4];
      // List newList=new List();
      // for(var i=0;i<myList.length;i++){
      //   newList.add(myList[i]*2);
      // }
      // print(newList);





      // List myList=[1,3,4];      
      // var newList=myList.map((value){
      //     return value*2;
      // });
      // print(newList.toList());





      // List myList=[1,3,4,5,7,8,9];
      // var newList=myList.where((value){
      //     return value>5;
      // });
      // print(newList.toList());



      // List myList=[1,3,4,5,7,8,9];
      // var f=myList.any((value){   //只要集合里面有满足条件的就返回true
      //     return value>5;
      // });
      // print(f);



      // List myList=[1,3,4,5,7,8,9];
      // var f=myList.every((value){   //每一个都满足条件返回true  否则返回false
      //     return value>5;
      // });
      // print(f);



      // set

      // var s=new Set();

      // s.addAll([1,222,333]);

      // s.forEach((value)=>print(value));



      //map

       Map person={
          "name":"张三",
          "age":20
        };

        person.forEach((key,value){            
            print("$key---$value");
        });

}
```



### 异常处理

#### throw

*下面是抛出或引发*异常的示例：

```dart
throw FormatException('Expected at least 1 section');
```

您还可以抛出任意对象：

```dart
throw 'Out of llamas!';
```

#### catch

捕获或捕获异常会阻止异常传播（除非您重新抛出异常）。捕获异常让您有机会处理它：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

#### finally

要确保无论是否抛出异常，某些代码都会运行，请使用子句`finally`。如果没有`catch`子句与异常匹配，则在`finally`子句运行后传播异常：

```dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

该子句在任何匹配的子句`finally`之后运行：`catch`

```dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```

### 方法的定义

```dart
// 方法的定义的三种方式
// 1, String 返回类型，bool string list map num class
String getUser(String name){
  return '$name is very good';
}

// 2. dynamic 方式
getUser2(name){
  return '$name is very good';
}

// 3, => arrow function
String getUser3(String name) => '$name is very good';


// 程序入口  void 表示没有返回值
void main() {
  print(getUser3('ZhangSan'));
}
```

#### 方法的必传参数和可选参数、参数默认值

```dart
  /**
   *  方法的参数： 必须的参数，可选的参数
   *  可选的参数：命名参数：{k:v} 位置参数: [type:name] 
   */

// num :id 必须传递
getProduct(num id,{bool flag = true,String name = 'zhangsan'}){

}
// 可选的位置参数
getProduct2(num id,[bool flag = true,String name = 'zhangsan']){

}

void main() {
  getProduct(1);
  getProduct(1, flag: false);
  getProduct(1, name: 'lisi');

  getProduct2(1);
  getProduct2(1,false);
  getProduct2(1,true,'lisi');
    
    
  // 定义一个命名参数的方法，最新的dart定义命名参数需要指定类型默认值

  String printUserInfo(String username, {int age = 0, String sex = '男'}) {//行参    
    if (age != 0) {
      return "姓名:$username---性别:$sex--年龄:$age";
    }
    return "姓名:$username---性别:$sex--年龄保密";
  }
  print(printUserInfo('张三', age: 20, sex: '未知'));
}
```

#### 匿名方法的使用

```dart
var getName = (){
  print('holle');
};

void main() {
  getName();

  var list = [1,2,3,4];
  list.forEach((e) { 
    print(e);
  });

  getAll((data){
    print(data);
  });
}

getAll(Function cb){
  cb(['holle word']);
}
```

#### 闭包

```dart
/*
闭包：

    1、全局变量特点:    全局变量常驻内存、全局变量污染全局
    2、局部变量的特点：  不常驻内存会被垃圾机制回收、不会污染全局  


  /*  想实现的功能：

        1.常驻内存        
        2.不污染全局   

          产生了闭包,闭包可以解决这个问题.....  

          闭包: 函数嵌套函数, 内部函数会调用外部函数的变量或参数, 变量或参数不会被系统回收(不会释放内存)
  
	        闭包的写法： 函数嵌套函数，并return 里面的函数，这样就形成了闭包。

    */  
*/

void main() {
  var func = count();
  func();
  func();
}

// 闭包
count(){
  var n = 1;
  return (){
    n++;
    print(n);
  };
}
```

#### 箭头函数  函数的相互调用 

```dart
void main() {
/*需求：使用forEach打印下面List里面的数据*/

  // List list=['苹果','香蕉','西瓜'];
  // list.forEach((value){
  //   print(value);
  // });
  // list.forEach((value)=>print(value));

  //注意和方法的区别: 箭头函数内只能写一条语句，并且语句后面没有分号(;)
  // list.forEach((value)=>{
  //   print(value)
  // });

/*需求：修改下面List里面的数据，让数组中大于2的值乘以2*/

  // List list=[4,1,2,3,4];
  // var newList=list.map((value){
  //     if(value>2){
  //       return value*2;
  //     }
  //     return value;
  // });
  // print(newList.toList());
  //  var newList=list.map((value)=>value>2?value*2:value);
  //  print(newList.toList());
  

/*
需求：    1、定义一个方法isEvenNumber来判断一个数是否是偶数  
         2、定义一个方法打印1-n以内的所有偶数
*/

// 1、定义一个方法isEvenNumber来判断一个数是否是偶数  
  bool isEvenNumber(int n) {
    if (n % 2 == 0) {
      return true;
    }
    return false;
  }
//  2、定义一个方法打印1-n以内的所有偶数
  printNum(int n) {
    for (var i = 1; i <= n; i++) {
      if (isEvenNumber(i)) {
        print(i);
      }
    }
  }
  printNum(10);
}

```

####  自执行方法 方法的递归

```dart
void main() {

//自执行方法

  // ((int n){
  //   print(n);
  //   print('我是自执行方法');
  // })(12);

//方法的递归
  // var sum = 1;
  // fn(int n) {
  //   sum *= n;
  //   if (n == 1) {
  //     return;
  //   }
  //   fn(n - 1);
  // }
  // fn(5);
  // print(sum);

//通过方法的递归 求1-100的和

  var sum=0;
  fn(int n){
      sum+=n;
      if(n==0){
        return;
      }
      fn(n-1);
  }

  fn(100);
  print(sum);
}

```

### 类

```dart
/*

面向对象编程(OOP)的三个基本特征是：封装、继承、多态      

      封装：封装是对象和类概念的主要特性。封装，把客观事物封装成抽象的类，并且把自己的部分属性和方法提供给其他对象调用, 而一部分属性和方法则隐藏。
                
      继承：面向对象编程 (OOP) 语言的一个主要功能就是“继承”。继承是指这样一种能力：它可以使用现有类的功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。
            
      多态：允许将子类类型的指针赋值给父类类型的指针, 同一个函数调用会有不同的执行效果 。


Dart所有的东西都是对象，所有的对象都继承自Object类。

Dart是一门使用类和单继承的面向对象语言，所有的对象都是类的实例，并且所有的类都是Object的子类

一个类通常由属性和方法组成。

*/

/*
* 类（class）是面向对象程序设计，实现信息封装的基础
* 类是一种用户定义的类型。每个类包含数据说明和一组操作数据或传递消息的函数
* 类的实例成为对象
*/


/**
 * Dart 的类与其他语言都有很大区别
 * 比如在dart的类中可以有无数个构造函数，可以重写类中的操作符
 * 有默认的构造函数，由于dart没有接口，所以dart的类也是接口
 * 因此你可以直接将类作为接口来重新实现
 * 
 * Dart 是一门使用类和单继承的面向对象语言，所有的对象都是类的实例
 * 并且所有的类都是Object的子类
 */

/**
 * 类的结构：
 * 1. 构造方法 ：构造一个类的对象的方法
 * 2. 成员变量  成员方法（实例方法）
 * 3. 类变量  类方法 (静态属性、方法)
 */
class Animal {

  // 类变量
  static late List tags;
  // 类方法
  static sleep(){
    print('Animal is sleep');
  }

  // 成员变量
  late String name;
  // 成员方法
  eat(){
    print('$name is eatting');
  }
  // 构造方法
  Animal(String name){
    this.name = name;
  }
}


void main() {
  var cat  = new Animal('cat');
  var cat1  = Animal('cat'); // new 可以省略
  Animal car2 = Animal('cat');
  print(cat.name);
  cat.eat();
  Animal.tags = ['小可爱'];
  print(Animal.tags); // ['小可爱']
  Animal.sleep(); // 'Animal is sleep'
}
```

#### 静态成员

```dart
class Person {
  static String name = '张三';
  int age=20;  
  static void show() {
    print(name);
  }
  void printInfo(){  /*非静态方法可以访问静态成员以及非静态成员*/
      // print(name);  //访问静态属性
      // print(this.age);  //访问非静态属性
      show();   //调用静态方法
  }
  static void printUserInfo(){//静态方法
        print(name);   //静态属性
        show();        //静态方法
        //print(this.age);     //静态方法没法访问非静态的属性
        // this.printInfo();   //静态方法没法访问非静态的方法
        // printInfo();
  }

}

main(){
  // print(Person.name);
  // Person.show(); 

  // Person p=new Person();
  // p.printInfo(); 

  Person.printUserInfo();
}
```

#### Dart 中的对象操作符

```dart
/*
Dart中的对象操作符:

    ?     条件运算符 （了解）   https://dart.dev/tools/diagnostic-messages#invalid_null_aware_operator        
    as    类型转换
    is    类型判断
    ..    级联操作 （连缀）  (记住)
*/

class Person {
  String name;
  num age;
  Person(this.name, this.age);
  void printInfo() {
    print("${this.name}---${this.age}");
  }
}

main() {
  // Person p;
  // p?.printInfo();   //已被最新的dart废弃 了解

  //  Person p=new Person('张三', 20);
  //  p?.printInfo();   //已被最新的dart废弃 了解



  Person p=new Person('张三', 20);
  if(p is Person){
      p.name="李四";
  }
  p.printInfo();
  print(p is Object);



  // var p1;
  // p1='';
  // p1=new Person('张三1', 20);
  // p1.printInfo();
  // (p1 as Person).printInfo();




  //  Person p1=new Person('张三1', 20);
  //  p1.printInfo();
  //  p1.name='张三222';
  //  p1.age=40;
  //  p1.printInfo();


  Person p1 = new Person('张三1', 20);
  p1.printInfo();
  p1
    ..name = "李四"
    ..age = 30
    ..printInfo();
}

```

#### 命名的构造方法

```dart
class Student {
  late String name;
  late int age;
  final int gender;

  Student(this.name,this.age,this.gender);

  // 命名的构造方法
  Student.widthName(this.gender){}
}

void main() {
  var s1 = new Student('zhangsan', 20,1);
  print(s1.name); // zhangsan

  var s2 = new Student.widthName(0);
  print(s2.gender); // 0
}
```

#### 常量构造方法

```dart
class Student{
  final String name;
  final int age;
  final int gender;
   // 常量构造方法
  const Student(this.name,this.age,this.gender);
}

void main() {
    // 如果需要生成的类对象不可以改变，需要把类中的构造方法，改为常量构造方法
    // 如果是常量的构造方法，类中的所有实例属性必须是final
  const s1 = Student('张三', 18, 1);
  print(s1.name);
}
```

#### 类成员的私有设置

> 16-class.dart , 设置私有属性的前提是要把 类单独抽离成一个文件

```dart
class Student{
  String name;
  int _age;  // dart 中如果需要把成员变量或者成员方法私有化,那么就需要在前面加个  下划线

  Student(this.name,this._age);

  _learn(){
    print('learnning.....');
  }

}

void main() {
  var s1 = new Student('张三', 21);
  s1._learn(); // 是可以访问的
}
```

> 17-class-test.dart

```dart
import '16-class.dart';

void main() {
  var s1 = new Student('张三', 21);
  s1._learn(); // 报错了 访问不了
}
```

#### getting、setting

```dart
class Student{
  late final String name;
  late int _age;

  Student(this.name);
 // get 没有花括号
  int get age {
    return this._age;
  }
  set age(int age){ // setter 存储器
    this._age = age;
  }

  void learn(){
    print('learnning.....$age');
  }
}
```

> 测试 .dart

```dart
import '18-class.dart';

void main() {
  var s1 = new Student('zhangsan');
  s1.age = 20;
  s1.learn();
}
```

#### 工厂构造方法

```dart
// 使用factory关键字实现构造函数时，不一定要创建一个新的类实例
// 例如，一个工厂的构造函数可能从缓存中返回一个实例
// 或者返回一个子类的实例
class Person{
  static late Map<String,Person> _cache;

  // 工厂构造器
  factory Person(){
    if(_cache == null){
      _cache = new Map<String,Person>();
    }

    if(_cache['p'] == null){
      _cache['p'] = Person._inner();
    }

    return _cache['p'];
  }

  Person._inner();

  say(){

  }
}

```

#### 对象的仿真函数

```dart
// 如果类实现了 call 方法，则该类的对象可以作为方法使用
class Student{
  call(int a,int b){
    print('$a hahahaha $b');
  }
}

void main() {
  var s = Student();
  s(1,2);
}

```

#### 类的继承与构造方法的继承

```dart
class A{
  late int x;
  late int _y;
  A(this.x);
  A.widthName(){}
  getX(){
    return 1;
  }
}

class B extends A{
  late int b1;
  // 构造函数的继承
  // B():super(1){

  // }
  // 命名构造函数的继承
  B():super.widthName(){}

  getB1(){
    
  }
  // 属性重写
  @override
  int get x => super.x;
  @override
  void set x(int _x){
    super.x = _x;
  }

  // 方法重写
  @override
  getX() {
    return 2;
  }
}

void main() {
  var b = new B();
  print(b.getX()); // 2
}
```

#### 抽象类

> 定义一些规范，让子类继承并实现

```dart
/*
Dart中抽象类: Dart抽象类主要用于定义标准，子类可以继承抽象类，也可以实现抽象类接口。


  1、抽象类通过abstract 关键字来定义

  2、Dart中的抽象方法不能用abstract声明，Dart中没有方法体的方法我们称为抽象方法。

  3、如果子类继承抽象类必须得实现里面的抽象方法

  4、如果把抽象类当做接口实现的话必须得实现抽象类里面定义的所有属性和方法。

  5、抽象类不能被实例化，只有继承它的子类可以

extends抽象类 和 implements的区别：

  1、如果要复用抽象类里面的方法，并且要用抽象方法约束自类的话我们就用extends继承抽象类

  2、如果只是把抽象类当做标准的话我们就用implements实现抽象类


*/

/**
 * 类：普通类，抽象类
 * 抽象的特点：
 * 1. class 类的前面加上一个关键字 abstract
 * 2. abstract 类是不能实例化，不能有对象，主要是来让子类继承
 * 3. 抽象类中的方法可以有方法体，也可以没有
 */

abstract class Person {
  // 普通属性或方法
  getName(){
    print('haha');
  }
  // 抽象方法
  sleep();
}

class B extends Person{
  @override
  sleep() {
    // TODO: implement sleep
    throw UnimplementedError();
  }
}
void main() {
  
}
```

#### 接口的用法

```dart
/**
 * interface ： dart中没有，但是可以用别的方法实现
 * 1. 接口中的所有属性或者方法，子类都需要实现
 * 2. 一个类可以实现多个接口，从而多继承
 */

abstract class  Person {
  late String name;
  say(){}
  eat(){}
}

class Driver{
  driver(){}
}

class A implements Person,Driver{
  @override
  eat() {
    // TODO: implement eat
    throw UnimplementedError();
  }

  @override
  say() {
    // TODO: implement say
    throw UnimplementedError();
  }
  
  @override
  late String name;
  
  @override
  driver() {
    // TODO: implement driver
    throw UnimplementedError();
  }

}

void main() {
  
}
```

#### 混合

```dart
/*
mixins的中文意思是混入，就是在类中混入其他功能。

在Dart中可以使用mixins实现类似多继承的功能


因为mixins使用的条件，随着Dart版本一直在变，这里讲的是Dart2.x中使用mixins的条件：

  1、作为mixins的类只能继承自Object，不能继承其他类
  2、作为mixins的类不能有构造函数
  3、一个类可以mixins多个mixins类
  4、mixins绝不是继承，也不是接口，而是一种全新的特性
*/

class A{
  a(){}
}

class B{
  b(){}
}

class C with A,B{
  c(){}
}

void main() {
  var c = C();
  c.a();
  c.b();
  c.c();
}

// ===================================分割线

class Person{
  String name;
  num age;
  Person(this.name,this.age);
  printInfo(){
    print('${this.name}----${this.age}');
  }
  void run(){
    print("Person Run");
  }
}

class A {
  String info="this is A";
  void printA(){
    print("A");
  }
  void run(){
    print("A Run");
  }
}

class B {  
  void printB(){
    print("B");
  }
  void run(){
    print("B Run");
  }
}

class C extends Person with B,A{
  C(String name, num age) : super(name, age);
  
}

void main(){  
  var c=new C('张三',20);  
  c.printInfo();
  // c.printB();
  // print(c.info);
  c.run();
}
```

### 枚举

```dart
enum Color{
  red, // 0
  yellow, // 1
  red // 2
}
```

### 泛型

```dart
/*
通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)
*/
class User{}

show<T>(T a){
  print(a);
}


void main() {
  var list = new Set<String>();
  list.add('orange');

  var user = new Set<User>();
  user.add(new User());

  show<String>('hello');
  show<int>(1);
}

// =============================================================================
/*
Dart中的泛型接口:

    实现数据缓存的功能：有文件缓存、和内存缓存。内存缓存和文件缓存按照接口约束实现。

    1、定义一个泛型接口 约束实现它的子类必须有getByKey(key) 和 setByKey(key,value)

    2、要求setByKey的时候的value的类型和实例化子类的时候指定的类型一致

*/
abstract class Cache<T> {
  getByKey(String key);
  void setByKey(String key, T value);
}

class FileCache<T> implements Cache<T> {
  @override
  getByKey(String key) {
    return null;
  }
  @override
  void setByKey(String key, T value) {
    print("我是文件缓存 把key=${key}  value=${value}的数据写入到了文件中");
  }
}

class MemoryCache<T> implements Cache<T> {
  @override
  getByKey(String key) {
    return null;
  }
  @override
  void setByKey(String key, T value) {
    print("我是内存缓存 把key=${key}  value=${value} -写入到了内存中");
  }
}

void main() {
  // MemoryCache m=new MemoryCache<String>();
  //  m.setByKey('index', '首页数据');

  MemoryCache m = new MemoryCache<Map>();
  m.setByKey('index', {"name": "张三", "age": 20});
}
```

### dart 异步编程

#### async await

```dart
import 'dart:io';

String doTask() {
  sleep(Duration(seconds: 2)); // 等待执行
  print('do something');
  return 'haha';
}

void main() async{
  print('start');
  await doTask();
  print('end');
}
```

```dart
import 'dart:io';
import 'dart:convert';


void main() async{
  var result = await getDataFromZhihuAPI();
  print(result);
}


//api接口： http://news-at.zhihu.com/api/3/stories/latest
getDataFromZhihuAPI() async{
  //1、创建HttpClient对象
  var httpClient = new HttpClient();  
  //2、创建Uri对象
  var uri = new Uri.http('news-at.zhihu.com','/api/3/stories/latest');
  //3、发起请求，等待请求
  var request = await httpClient.getUrl(uri);
  //4、关闭请求，等待响应
  var response = await request.close();
  //5、解码响应的内容
  return await response.transform(utf8.decoder).join();
}
```

#### future

> future 相当于 JavaScript 的promise
>
> 支持链式调用

```dart
String getSome(){
  print('some123');
  return 'some';
}

void main() async{
  Future<String> name = new Future(getSome);
  name.then((String value) {
    print(value);
  });
}
```

#### wait 并行执行

> wait 相当于 promise.all

```dart
Future<String> methdod5() async{
  return '5';
}

Future<String> methdod6() async{
  return '6';
}

Future<String> methdod7() async{
  return '7';
}

void test(){
  Future.wait([methdod5(),methdod6(),methdod7()]).then((List responese){
    print(responese);
  }).catchError((e){
    print(e);
  });
}

void main() async{
  test();
}
```

### Dart 中的库

#### **dart 中的库主要有三种**

> 1. 我们自定义的库
>
>    ```
>    自己写的文件
>    ```
>
> 2. 系统内置库
>
>    ```dart
>    import 'dart:math';
>    import 'dart.io';
>    ```
>
> 3. pub 包管理系统中的库
>
>    ```js
>    https://pub.dev/
>    https://pub.flutter-io.cn/
>    https://pub.dartlang.org/
>    
>    ```
>
>  	    1、需要在自己想项目根目录新建一个pubspec.yaml
>            2、在pubspec.yaml文件 然后配置名称 、描述、依赖等信息
>            3、然后运行 pub get 获取包下载到本地  vscode 保存会自己运行这个命令
>            4、项目中引入库 import 'package:http/http.dart' as http; 看文档使用
>
>    ```
>    
>    
>    ```

#### 自定义库冲突

```dart
/*
1、冲突解决
当引入两个库中有相同名称标识符的时候，如果是java通常我们通过写上完整的包名路径来指定使用的具体标识符，甚至不用import都可以，但是Dart里面是必须import的。当冲突的时候，可以使用as关键字来指定库的前缀。如下例子所示：

    import 'package:lib1/lib1.dart';
    import 'package:lib2/lib2.dart' as lib2;

    Element element1 = new Element();           // Uses Element from lib1.
    lib2.Element element2 = new lib2.Element(); // Uses Element from lib2.

*/
import './one.dart' as lib1;
import 'two.dart' as lib2;

/*
部分导入
  如果只需要导入库的一部分，有两种模式：

     模式一：只导入需要的部分，使用show关键字，如下例子所示：

      import 'package:lib1/lib1.dart' show foo;

     模式二：隐藏不需要的部分，使用hide关键字，如下例子所示：

      import 'package:lib2/lib2.dart' hide foo;      

*/

import 'two.dart' as lib2 show getSome,getSome2; // 可以指定导出某个方法
import 'two.dart' as lib2 hide getSome,getSome2; // 可以指定隐藏某个方法
void main(List<String> args) {
  lib1.getSome();
  lib2.getSome();
}

/*
延迟加载

    也称为懒加载，可以在需要的时候再进行加载。
    懒加载的最大好处是可以减少APP的启动时间。

    懒加载使用deferred as关键字来指定，如下例子所示：

    import 'package:deferred/hello.dart' deferred as hello;

    当需要使用的时候，需要使用loadLibrary()方法来加载：

    greet() async {
      await hello.loadLibrary();
      hello.printGreeting();
    }

*/
```

### 使用第三方包

#### pubspec.yaml

yaml 是yaml ain't Markup language的外语缩写，是一种数据格式

YAML 是一个类似XML,JSON的标记性语言。YAML强调以数据为中心，并不是以标识语言为重点

#### yaml 语法

- 大小写敏感

- 用冒号和缩进代表层次关系

  - 缩进代表层级，使用空格，默认2个空格（flutter工具做了处理，tab也可以）

  - 代表注释内容

  - : 标识键值对，注意后面要空格

  - {} 标识键值表

  - ```-```标识列表，注意后面要空格

  - [] 标识数组，注意每项之间有空格

  - ？标识复杂的键

    

    只能用空格，不能用tab键，对空格多少没要求，同级对齐即可

    可表示三种数据类型，常量值，对象，数组


> 如果安装时  出现下面报错：
>
> ```shell
> Got TLS error trying to find package http at https://pub.dev.
> ```

> 那么修改镜像：
>
> 配置环境变量的方式（win10）
>
> 分别新建两个变量：
>
> 变量名：
>
> PUB_HOSTED_URL
>
> 值：
>
> ```javascript
> https://mirrors.cloud.tencent.com/dart-pub
> ```
>
> 变量名：
>
> FLUTTER_STORAGE_BASE_URL
>
> 值：
>
> ```javascript
> https://mirrors.cloud.tencent.com/flutter
> ```

```dart
import 'package:dio/dio.dart';

final dio = Dio();

void getHttp() async {
  final response = await dio.get('https://www.baidu.com');
  print(response);
}

void main(List<String> args) {
  getHttp();
}
```

### Dart 2.13 之后的新特性

#### 空安全

```dart
/*
  Null safety翻译成中文的意思是空安全。

  null safety 可以帮助开发者避免一些日常开发中很难被发现的错误，并且额外的好处是可以改善性能。

  Flutter2.2.0（2021年5月19日发布） 之后的版本都要求使用null safety。

  ? 可空类型

  ! 类型断言

*/
String? getData(apiUrl){
  if(apiUrl!=null){
    return "this is server data";
  }
  return null;
}

void printLength(String? str){
  try {
    print(str!.length); 
  } catch (e) {
     print("str is null"); 
  }
}
void main(args) {

//1、 ? 可空类型

  // int a=123;  //非空的int类型
  // a=null;  //A value of type 'Null' can't be assigned to a variable of type 'int'


  // String username="张三";  //非空的String类型
  // username=null;   //A value of type 'Null' can't be assigned to a variable of type 'String'.


  // String? username="张三";   // String?  表示username是一个可空类型
  // username=null;
  // print(username);


  // int? a=123;  //  int? 表示a是一个可空类型
  // a=null; 
  // print(a);


  // List<String> l1=["张三","李四","王五"];
  // l1=null;  //A value of type 'Null' can't be assigned to a variable of type 'List<String>'.


  // List<String>? l1=["张三","李四","王五"];
  // l1=null;  
  // print(l1);


  //调用方法
  // print(getData("http://www.itying.com"));

  // print(getData(null));


// ! 类型断言

  // String? str="this is str";

  // str=null;

  // print(str!.length);  
  
   //类型断言: 如果str不等于null 会打印str的长度，如果等于null会抛出异常

  //  printLength("str");
  
   printLength(null);
}
```

#### late 关键字

```dart
/*
Null safety翻译成中文的意思是空安全。

late 关键字主要用于延迟初始化。

*/
class Person {
  late String name;
  late int age;
  void setName(String name, int age) {
    this.name = name;
    this.age = age;
  }
  String getName() {
    return "${this.name}---${this.age}";
  }
}

void main(args) {
  Person p = new Person();
  p.setName("张三", 20);
  print(p.getName());
}
```

#### required关键词

```dart
/*
Null safety翻译成中文的意思是空安全。

required翻译成中文的意思是需要、依赖

required关键词:

    最开始 @required 是注解
    
    现在它已经作为内置修饰符。
    
    主要用于允许根据需要标记任何命名参数（函数或类），使得它们不为空。因为可选参数中必须有个 required 参数或者该参数有个默认值。

*/
String printUserInfo(String username, {int age=10, String sex="男"}) {//行参    
  return "姓名:$username---性别:$sex--年龄:$age";
}

String printInfo(String username, {required int age, required String sex}) {//行参    
  return "姓名:$username---性别:$sex--年龄:$age";
}


void main(args) {
    print(printUserInfo('张三'));

    print(printUserInfo('张三',age: 20,sex: "女"));
    
    //age 和 sex必须传入
    print(printInfo('张三',age: 22,sex: "女"));
}

// =========================================================
//表示 name 和age 是必须传入的命名参数
class Person {
  String name;
  int age;
  Person({required this.name,required this.age});  //表示 name 和age 必须传入

  String getName() {
    return "${this.name}---${this.age}";
  }
}


void main(args) {
   Person p=new Person(
     name: "张三",
     age: 20
   );
   print(p.getName());
}
// ===============================================================
// name 可以传入也可以不传入   age必须传入
class Person {
  String? name;   //可空属性
  int age;
  Person({this.name,required this.age});  //表示 name 和age 必须传入

  String getName() {
    return "${this.name}---${this.age}";
  }
}


void main(args) {
   Person p=new Person(
     name: "张三",
     age: 20
   );
   print(p.getName());  //张三---20


  Person p1=new Person(    
     age: 20
   );
   print(p1.getName());  //null---20
}

```

### Dart 性能优化之常量

```dart
// 回顾Dart常量
/*
Dart 常量: final 和 const修饰符  

  const 声明的常量是在编译时确定的，永远不会改变

  final 声明的常量允许声明后再赋值，赋值后不可改变，final 声明的变量是在运行时确定的;

  final不仅有const的编译时常量的特性，最重要的它是运行时常量，并且final是惰性初始化，即在运行时第一次使用前才初始化

*/

void main(){    
    
//const常量

//const PI=3.14;
// PI=3.14159;  //const定义的常量没法改变
//print(PI);


// final 常量

// final PI=3.14;
// print(PI);

//final和const区别：final 可以开始不赋值 只能赋一次 ; 而final不仅有const的编译时常量的特性，最重要的它是运行时常量，并且final是惰性初始化，即在运行时第一次使用前才初始化
  
 
 final a;
 a=13;
//  a=14;
 print(a);
  
final d=new DateTime.now();  
}
```

```dart
/*
dart:core 库中identical 函数的用法介绍如下。
有点儿类似 js 中的 instance 关键字

用法:
bool identical(
   Object? a,    
   Object? b   
)
检查两个引用是否指向同一个对象。

var o = new Object();

  var isIdentical = identical(o, new Object()); // false, different objects.
  print(isIdentical);

  isIdentical = identical(o, o); // true, same object
  print(isIdentical);

  isIdentical = identical(const Object(), const Object()); // true, const canonicalizes
  print(isIdentical);

  isIdentical = identical([1], [1]); // false
  print(isIdentical);

  isIdentical = identical(const [1], const [1]); // true
  print(isIdentical);

  isIdentical = identical(const [1], const [2]); // false
  print(isIdentical);
  
  isIdentical = identical(2, 1 + 1); // true, integers canonicalizes
  print(isIdentical);
*/


void main(){
  
  // var o1 = new Object();
  // var o2 = new Object();

  // print(identical(o1,o2));  //false  不共享存储空间

  // print(identical(o1,o1));   //true 共享存储空间



  // var o1 = Object();
  // var o2 = Object();
  // print(identical(o1,o2));  //false
  // print(identical(o1,o1));  //true



  //表示实例化常量构造函数
  //o1 和 o2共享了存储空间
  // var o1 = const Object();
  // var o2 = const Object();
  // print(identical(o1,o2));  //true 共享存储空间
  // print(identical(o1,o1));  //true 共享存储空间


  // print(identical([2],[2])); //false

  // var a=[2];
  // var b=[2];
  // print(identical(a,b)); //false 不共享存储空间



  // print(identical(const [2],const [2])); //true

  const a=[2];
  const b=[2];
  print(identical(a,b)); //true 共享存储空间



  const c=[2];
  const d=[3];
  print(identical(c,d)); //false  不共享存储空间


}
// 发现：const关键词在多个地方创建相同的对象的时候，内存中只保留了一个对象


// 共享存储空间条件：1、常量   2、值相等
```

```dart
// Dart普通构造函数
class Container{
  int width;
  int height;
  Container({required this.width,required this.height});
}

void main(){

  var c1=new Container(width: 100,height: 100);

  var c2=new Container(width: 100,height: 100);

  print( identical(c1, c2));  //false   c1和c2在内存中存储了2份

}

// ============================================================

/*
常量构造函数总结如下几点：

  1、常量构造函数需以const关键字修饰
  2、const构造函数必须用于成员变量都是final的类
  3、如果实例化时不加const修饰符，即使调用的是常量构造函数，实例化的对象也不是常量实例
  4、实例化常量构造函数的时候，多个地方创建这个对象，如果传入的值相同，只会保留一个对象。
  5、Flutter中const 修饰不仅仅是节省组件构建时的内存开销，Flutter 在需要重新构建组件的时候，由于这个组件是不应该改变的，重新构建没有任何意义，因此 Flutter 不会重建构建 const 组件  
*/

//常量构造函数
class Container{
  final int width;
  final int height;
  const Container({required this.width,required this.height});
}

void main(){

  var c1=Container(width: 100,height: 100);
  var c2=Container(width: 100,height: 100);
  print(identical(c1, c2)); //false

  
  var c3=const Container(width: 100,height: 100);
  var c4=const Container(width: 100,height: 100);
  print(identical(c3, c4)); //true


  var c5=const Container(width: 100,height: 110);
  var c6=const Container(width: 120,height: 100);
  print(identical(c5, c6)); //false
  
}
// 实例化常量构造函数的时候，多个地方创建这个对象，如果传入的值相同，只会保留一个对象。
```

## flutter 与android 运行环境

1. java 环境安装
   1. 下载jdk，进官网下载jdk： https://www.oracle.com/java/technologies/downloads/#java17
   2. 配置环境变量：JAVA_HOME  对应的变量值为你 jdk 安装的目录 
   3. 配置完成 cmd 运行 java、javac命名不报错就是安装与配置好了
2. Android studio 环境安装
   1. 安装Android studio ： https://developer.android.google.cn/studio
      2. 安装 Android SDK ：https://developer.android.google.cn/studio
      3. 配置android 环境变量  需要用 android sdk下的tools目录
3. flutter 环境配置
   1.  下载flutter SDK：https://docs.flutter.dev/release/archive
   2.  安装完 sdk 配置环境变量
   3.  在系统环境变量下添加 ：FLUTTER_STORAGE_BASE_URL：https://storage.flutter-io.cn
   4.  在系统环境变量下添加 ：PUB_HOSTED_URL: https://pub.flutter-io.cn
   5.  安装fluter-doctor ： 在flutter控制台运行 flutter doctor命名，检测是否依赖项未安装
   6.  android studio 安装flutter插件
   7.  配置 vscode flutter环境
   8.  夜神模拟器
       1.  进入安装目录,使用cmd，不能使用powershell
       2.  在bin目录下 运行 nox_adb.exe connect 127.0.0.1:62001
       3.  打开vscode 运行 adb connect 127.0.0.1:62001
   9.  genymotion
   10.  创建flutter项目
        1.  打开vscode，按 ctrl +shift +p ，输入 【flutter:new project】
        2.  flutter run -v 运行项目查看详细日志
4. flutter命令
   1. 运行完成之后，可以按 R 、r、o
   2. o 是切换iso、macOS、android
   3. R 是重新编译



**遇到 vscode 右下角找不到 夜神模拟器时，参考这两篇文章：**

2023Android SDK下载与安装：https://blog.csdn.net/weixin_45638642/article/details/122139997

vscode+flutter连接夜神模拟器：https://blog.csdn.net/weixin_43722571/article/details/115195985
