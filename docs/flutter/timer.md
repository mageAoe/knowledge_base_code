---
# 取二三级标题生成目录
outline: [2,3]
---

### Flutter定时器

```dart
  late PageController _pageController;
   _pageController = PageController(initialPage: 0);
    timer = Timer.periodic(const Duration(seconds: 5), (t) {
      _pageController.animateToPage( (_currentIndex + 1) % pageList.length, duration: const Duration(milliseconds: 200), curve: Curves.linear);
    });
```

组件销毁的时候取消定时器

```dart
  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    timer.cancel();
    _pageController.dispose();
  }
```

### Flutter定时器 让dialog自动关闭

**Flutter定时器**

```dart
import 'dart:async';
const timeout = Duration(seconds: 3);
var t=Timer.periodic(timeout, (timer) {
print('afterTimer='+DateTime.now().toString()););
// timer.cancel(); // 取消定时器
});
t.cancel(); // 取消定时器
```

组件销毁的时候取消定时器 

```dart
void dispose() {
    super.dispose();
    t.cancel();
}

```

**MyDialog过几秒后关闭**

```dart
import 'package:flutter/material.dart';
import 'dart:async';

class MyDialog extends Dialog{
  final String title;
  final String content;
  final void Function()? onTap;
  const MyDialog({Key?key, required this.title,required this.content, required this.onTap}):super(key: key);

  _showTimer(context){
    Timer.periodic(
     const Duration(milliseconds: 3000), (t) {
      print('关闭');
      Navigator.of(context).pop();
      t.cancel();
    });
  }

  @override
  Widget build(context){
    _showTimer(context);
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