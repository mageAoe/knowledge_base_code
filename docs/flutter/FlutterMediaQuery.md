---
# 取二三级标题生成目录
outline: [2,3]
---

## FlutterMediaQuery获取屏幕宽度和高度

```dart
final size =MediaQuery.of(context).size;
```

组件的build方法中可以通过，```MediaQuery.of(context).size```;

```dart
Widget build(BuildContext context) {
    final size =MediaQuery.of(context).size;
    final width =size.width;
    final height =size.height;
}
```

## 类似浮动左右元素效果

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    // row 跟 align 组件不能实现一个左一个右
    // return Row(
    //   children: const [
    //     Align(alignment: Alignment.topLeft,child: Text('收藏')),
    //     Align(alignment: Alignment.topRight,child: Text('购买')),
    //   ],
    // );
    // return Stack(  // Stack 可以
    //   children: const [
    //     Align(alignment: Alignment.topLeft,child: Text('收藏')),
    //     Align(alignment: Alignment.topRight,child: Text('购买')),
    //   ],
    // );
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          height: 40,
          child: Stack(
            children: const [
              Align(alignment: Alignment.topLeft, child: Text('收藏')),
              Align(alignment: Alignment.topRight, child: Text('购买')),
            ],
          ),
        ),
        SizedBox(
          width: double.infinity,
          height: 40,
          child: Stack(
            children: const [
              Positioned(left: 10, child: Text('收藏')),
              Positioned(right: 10, child: Text('购买')),
            ],
          ),
        )
      ],
    );
  }
}
```