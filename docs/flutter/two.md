---
# 取二三级标题生成目录
outline: [2,3]
---

## flutter 的使用

### 初步使用

#### Flutter入口文件、入口方法

每一个flutter项目的lib目录里面都有一个main.dart这个文件就是flutter的入口文件 main.dart里面的

```dart
void main(){
runApp(MyApp());
}
也可以简写
void main()=>runApp(MyApp())
```

其中的main方法是dart的入口方法。runApp方法是flutter的入口方法。 MyApp是自定义的一个组件。

#### Flutter第一个Demo Center组件的使用

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('你好flutter')),
      body: const Center(
    child: 
      Text('你好flutter',textDirection: TextDirection.ltr,style: TextStyle(
        // color: Colors.red,
        color: Color.fromARGB(244, 244, 123, 1),
        fontSize: 40
      ),)
    ),
    )
  ));
}
```

#### Flutter把内容单独抽离成一个组件

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
      home: Scaffold(
    appBar: AppBar(title: const Text('你好flutter')),
    body: const MyApp(),
  )));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
        child: Text(
      '你好flutter 我是一個自定义组件',
      textDirection: TextDirection.ltr,
      style: TextStyle(
          // color: Colors.red,
          color: Color.fromARGB(244, 244, 123, 1),
          fontSize: 40),
    ));
  }
}
```

在Flutter中自定义组件其实就是一个类，这个类需要继承StatelessWidget/StatefulWidget 前期我们都继承StatelessWidget。后期给大家讲StatefulWidget的使用。

 StatelessWidget 是无状态组件，状态不可变的widget 

StatefulWidget 是有状态组件，持有的状态可能在widget生命周期改变

#### 件用MaterialApp 和 Scaffold两个组件装饰App

```dart
void main() {
  runApp(MaterialApp(
      home: Scaffold(
    appBar: AppBar(title: const Text('你好flutter')),
    body: const MyApp(),
  )));
}
```

**MaterialApp是一个方便的Widget，它封装了应用程序实现Material Design所需要的一些Widget。一 般作为顶层widget使用**

常用的属性：

 home（主页）

 title（标题） 

color（颜色） 

theme（主题） 

routes（路由）

**Scaffold是Material Design布局结构的基本实现。此类提供了用于显示drawer、snackbar和底部sheet 的API。**

Scaffold 有下面几个主要属性：

 appBar - 显示在界面顶部的一个 AppBar。 

body - 当前界面所显示的主要内容 Widget。 

drawer - 抽屉菜单控件。