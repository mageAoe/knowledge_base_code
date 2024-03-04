---
# 取二三级标题生成目录
outline: [2,3]
---

### Widget Tree、Element Tree 和 RenderObject Tree

> Flutter应用是由是Widget Tree、Element Tree 和 RenderObject Tree组成 Widget可以理解成一个类，Element可以理解成Widget的实例，Widget与Element的关系可以是一对 多，一份配置可以创造多个Element实例

| 属性         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| Widget       | Widget就是一个类， 是Element 的配置信息。与Element的关系可以是一对 多，一份配置可以创造多个Element实例 |
| Element      | Widget 的实例化，内部持有Widget和RenderObject。              |
| RenderObject | 负责渲染绘制                                                 |

## AnimatedList 实现动态列表

### AnimatedList实现动画

> AnimatedList 和 ListView 的功能大体相似，不同的是， AnimatedList 可以在列表中插入或删除节点 时执行一个动画，在需要添加或删除列表项的场景中会提高用户体验。
>
> AnimatedList 和 ListView 的功能大体相似，不同的是， AnimatedList 可以在列表中插入或删除节点 时执行一个动画，在需要添加或删除列表项的场景中会提高用户体验。
>
> ```dart
> void insertItem(int index, { Duration duration = _kDuration });
> void removeItem(int index, AnimatedListRemovedItemBuilder builder, { Duration
> duration = _kDuration }) ;
> ```

**AnimatedList常见属性：**

| 属性             | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| key              | globalKey final globalKey = GlobalKey();                     |
| initialItemCount | 子元素数量                                                   |
| itemBuilder      | 方法 ( BuildContext context, int index, Animation animation) {} |

**关于GlobalKey**： 每个 Widget 都对应一个 Element ，我们可以直接对 Widget 进行操作，但是无法直 接操作 Widget 对应的 Element 。而 GlobalKey 就是那把直接访问 Element 的钥匙。通过 GlobalKey 可以获取到 Widget 对应的 Element 。

### AnimatedList增加列表FadeTransition、ScaleTransition

**FadeTransition Demo、ScaleTransition demo**

```dart
import 'dart:async';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: Colors.blue),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _globalKey = GlobalKey<AnimatedListState>();
  List<String> list = ["第一条","第二条"];
  bool flag = true;

  Widget _buildItem(index){
    return ListTile(
      title: Text(list[index]),
      trailing: IconButton(
        icon: const Icon(Icons.delete),
        onPressed: (){
          // 删除
          _deleteItem(index);
        },
      ),
    );
  }

  _deleteItem(index){
    if(flag == true){
      flag = false;
        _globalKey.currentState!.removeItem(index, (context, animation){
        var removeItem = _buildItem(index);
        list.removeAt(index); // 数组中删除数据
        return FadeTransition(
          opacity: animation,
          child: removeItem, // 删除的时候执行动画的元素
        );
      });

      // 解决快速删除的bug
      Timer.periodic(const Duration(milliseconds: 500), (timer) { 
        flag = true;
        timer.cancel();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('flutter App')),
      body: AnimatedList(
        key: _globalKey, // 必须要一个key，不然报错
        initialItemCount: list.length,
        itemBuilder: (context, index, animation){
          // return FadeTransition(
            return ScaleTransition(
            // opacity: animation,
            scale: animation,
            child: _buildItem(index),
          );
        }
      ),
      floatingActionButton: FloatingActionButton(onPressed: (){
        setState(() {
          list.add('我是新增的数据');
          _globalKey.currentState!.insertItem(list.length - 1);
        });
      }, child: const Icon(Icons.add)),
    );
  }
}
```

### AnimatedList 删除列表

> 完整版，可以参考上面

```dart
_deleteItem(index){
    if(flag == true){
      flag = false;
        _globalKey.currentState!.removeItem(index, (context, animation){
        var removeItem = _buildItem(index);
        list.removeAt(index); // 数组中删除数据
        return FadeTransition(
          opacity: animation,
          child: removeItem, // 删除的时候执行动画的元素
        );
      });

      // 解决快速删除的bug
      Timer.periodic(const Duration(milliseconds: 500), (timer) { 
        flag = true;
        timer.cancel();
      });
    }
  }
```