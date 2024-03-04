---
# 取二三级标题生成目录
outline: [2,3]
---

## 自定义Flutter Dialog 、Material组件、InkWell组件

> 自定义Flutter Dialog 包括 Material组件、InkWell组件 的使用

> 自定义Dialog对象，需要继承Dialog类，尽管Dialog提供了child参数可以用来写视图界面，但是往往会 达不到我们想要的效果，因为默认的Dialog背景框是满屏的。如果我们想完全定义界面，就需要重写 build函数。下面我们通过两个案例给大家演示一下Dialog的使用。

**自定义一个提示的Dialog**

1. 新建myDialog.dart

```dart
import 'package:flutter/material.dart';

class MyDialog extends Dialog{
  final String title;
  final String content;
  final void Function()? onTap;
  const MyDialog({Key?key, required this.title,required this.content, required this.onTap}):super(key: key);
  @override
  Widget build(context){
    return Material(
      type: MaterialType.transparency,
      child: Center(
        child: Container(
          height: 300,
          width: 300,
          color: Colors.white,
          child: Column(
            children: [
              Padding(padding: const EdgeInsets.all(10),child: Stack(
                children: [
                   Align(alignment: Alignment.centerLeft,child: Text( title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600))),
                   Align(alignment: Alignment.centerRight,child: InkWell(
                    onTap: onTap,
                    child: const Icon(Icons.close),
                   ))
                ],
              )),
              const Divider(),
              Container(
                padding: const EdgeInsets.all(10),
                width: double.infinity,
                child: Text(content),
              )
            ],
          ),
      ),
      ),
    );
  }
}
```

2. 调用Mydialog

```dart
 void _myDialog(){
    showDialog(context: context, builder: (context){
      return  MyDialog(title: '提示信息',content: '这是一段内容',onTap: () {
        print('消失');
        Navigator.pop(context);
      });
    });
  }
```