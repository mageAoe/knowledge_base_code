---
# 取二三级标题生成目录
outline: [2,3]
---

## 层叠布局（Stack、Align、 Positioned）

### Flutter Stack组件

Stack表示堆的意思，我们可以用Stack或者Stack结合Align或者Stack结合 Positiond来实现页面的定位 布局

| 属性      | 说明                     |
| --------- | ------------------------ |
| alignment | 配置所有子元素的显示位置 |
| children  | 子组件                   |

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          height: 400,
          width: 300,
          color: Colors.red,
        ),
         Container(
          height: 200,
          width: 200,
          color: Colors.yellow,
        ),
        const Text('flutter')
      ],
    );
  }
}
```

### Flutter Stack Align

Align 组件可以调整子组件的位置 , Stack组件中结合Align组件也可以控制每个子元素的显示位置

| 属性      | 说明                     |
| --------- | ------------------------ |
| alignment | 配置所有子元素的显示位置 |
| child     | 子组件                   |

**Align结合Container的使用**

我们先来看一个简单的例子： FlutterLogo 是Flutter SDK 提供的一个组件，内容就是 Flutter 的 log

```dart
class HomePage extends StatelessWidget {
const HomePage({Key? key}) : super(key: key);
@override
Widget build(BuildContext context) {
return Container(
height: 120.0,
width: 120.0,
color: Colors.blue.shade50,
child: const Align(
alignment: Alignment.topRight,
child: FlutterLogo(
size: 60,
),
),
);
}
}

```

**Align结合Alignment 参数**

```dart
class HomePage extends StatelessWidget {
const HomePage({Key? key}) : super(key: key);
@override
Widget build(BuildContext context) {
return Container(
height: 120.0,
width: 120.0,
color: Colors.blue.shade50,
child: const Align(
alignment: Alignment(2, 0.0),
child: FlutterLogo(
size: 60,
),
));
}
}

```

Alignment Widget会以矩形的中心点作为坐标原点，即 Alignment(0.0, 0.0) 。 x 、 y 的值从-1到 1分别代表矩形左边到右边的距离和顶部到底边的距离，因此2个水平（或垂直）单位则等于矩形的宽 （或高），如 Alignment(-1.0, -1.0) 代表矩形的左侧顶点，而 Alignment(1.0, 1.0) 代表右侧底 部终点，而 Alignment(1.0, -1.0) 则正是右侧顶点，即 Alignment.topRight 。为了使用方便，矩 形的原点、四个顶点，以及四条边的终点在 Alignment 类中都已经定义为了静态常量。

Alignment 可以通过其坐标转换公式将其坐标转为子元素的具体偏移坐标：

```
(Alignment.x*childWidth/2+childWidth/2, Alignment.y*childHeight/2+childHeight/2)
```

### Flutter Stack Positioned

Stack组件中结合Positioned组件也可以控制每个子元素的显示位置

| 属性   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| top    | 子元素距离顶部的距离                                         |
| bottom | 子元素距离底部的距离                                         |
| left   | 子元素距离左侧距离                                           |
| right  | 子元素距离右侧距离                                           |
| child  | 子组件                                                       |
| width  | 组件的高度 （注意：宽度和高度必须是固定值，没法使用double.infinity） |
| height | 子组件的高度                                                 |

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 400,
      height: 300,
      color: Colors.red,
      child: Stack( // 注意： 相对于外部容器进行定位，如果没有外部容器，就相对于整个屏幕定位
        children: [
          Positioned(
            left: 0,
            bottom: 0,
            child: 
            Container(
              height: 100,
              width: 100,
              color: Colors.yellow,
          )),
          const Positioned(
            right: 0,
            top: 140,
            child: Text('flutter'))
        ],
      ),
    );
  }
}
```

### Flutter Stack Positioned固定导航案例

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {

    final size =MediaQuery.of(context).size;

    return Stack(
      children: [
        ListView(
          padding: const EdgeInsets.only(top: 50),
          children: const [
            ListTile(title: Text('我是一个列表1')),
            ListTile(title: Text('我是一个列表2')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
          ],
        ),
        Positioned( // 使用 Positioned 定位时，如果里面子组件是行，那么需要指定高度宽度
          left: 0,
          top: 0,
          width: size.width,
          height: 44,
          child: Row(
            children: [
              Expanded(
                flex: 1,
                child: Container(
                  alignment: Alignment.center,
                  height: 44,
                  color: Colors.black,
                  child:
                      const Text('二级导航', style: TextStyle(color: Colors.white)),
              ))
          ],
        ))
      ],
    );
  }
}
```

**简写**

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Stack(
      children: [
        ListView(
          padding: const EdgeInsets.only(top: 50),
          children: const [
            ListTile(title: Text('我是一个列表1')),
            ListTile(title: Text('我是一个列表2')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
            ListTile(title: Text('我是一个列表')),
          ],
        ),
        Positioned(
            // 使用 Positioned 定位时，如果里面子组件是行，那么需要指定高度宽度
            left: 0,
            top: 0,
            width: size.width, // 配置子元素的宽度
            height: 44, // 配置子元素的高度
            child: Container(
              alignment: Alignment.center,
              color: Colors.black,
              child: const Text('二级导航', style: TextStyle(color: Colors.white)),
            ))
      ],
    );
  }
}
```