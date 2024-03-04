---
# 取二三级标题生成目录
outline: [2,3]
---

## 线性布局（Row和Column）

### padding 组件

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(10),
      child: Text('sdsa'),
    );
  }
}

```

### Row 水平布局组件

| 属性               | 说明           |
| ------------------ | -------------- |
| mainAxisAlignment  | 主轴的排序方式 |
| crossAxisAlignment | 次轴的排序方式 |
| children           | 组件子元素     |

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      // width: double.infinity,
      // height: double.infinity,
      color: Colors.black12,
      child: Row(
      // mainAxisAlignment: MainAxisAlignment.spaceAround,
      // crossAxisAlignment: CrossAxisAlignment.center,
      // children: [
      //   Expanded(
      //     flex: 1,
      //     child: IconContainer(Icons.home, color: Colors.red)
      //   ),
      //   Expanded(
      //     flex: 2,
      //     child: IconContainer(Icons.ac_unit_outlined, color: Colors.green)
      //   ),
      // ],

      // 左侧固定宽, 右侧自适应
      children: [
        Expanded(
          flex: 1,
          child: IconContainer(Icons.home, color: Colors.red)
        ),
        IconContainer(Icons.ac_unit_outlined, color: Colors.green)
      ],
    ),
    );
  }
}

// 自定义iconContainer 组件
class IconContainer extends StatelessWidget {
  Color color;
  IconData icon;
  IconContainer(this.icon , {super.key,this.color = Colors.red});

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      width: 120,
      height: 120,
      decoration:  BoxDecoration(
        color: color
      ),
      child:  Icon(icon,color: Colors.white,size: 28),
    );
  }
}

```

### Column垂直布局组件

| 属性               | 说明           |
| ------------------ | -------------- |
| mainAxisAlignment  | 主轴的排序方式 |
| crossAxisAlignment | 次轴的排序方式 |
| children           | 组件子元素     |

#### double.infinity 和double.maxFinite

double.infinity 和double.maxFinite可以让当前元素的width或者height达到父元素的尺寸 

底层代码: 

```dart
static const double nan = 0.0 / 0.0;
static const double infinity = 1.0 / 0.0;
static const double negativeInfinity = -infinity;
static const double minPositive = 5e-324;
static const double maxFinite = 1.7976931348623157e+308;
```

如下可以让Container铺满整个屏幕

```dart
Widget build(BuildContext context) {
return Container(
height: double.infinity,
width: double.infinity,
color: Colors.black26,
child: Column(
crossAxisAlignment: CrossAxisAlignment.center,
mainAxisAlignment: MainAxisAlignment.spaceEvenly,
children: [
IconContainer(Icons.home, color: Colors.red),
IconContainer(Icons.search, color: Colors.blue),
IconContainer(Icons.send, color: Colors.orange),
],
),
);
}
```

如下可以让Container的宽度和高度等于父元素的宽度高度

```dart
class HomePage extends StatelessWidget {
    const HomePage({Key? key}) : super(key: key);
    @override
    Widget build(BuildContext context) {
      return Container(
        height: 400,
        width: 600,
        color: Colors.red,
        child: Container(
            height: double.maxFinite,
            width: double.infinity,
            color: Colors.black26,
            child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
            IconContainer(Icons.home, color: Colors.red),
            IconContainer(Icons.search, color: Colors.blue),
            IconContainer(Icons.send, color: Colors.orange),
            ],
            ),
        ),
      );
    }
}

```