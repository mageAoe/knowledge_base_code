---
# 取二三级标题生成目录
outline: [2,3]
---

## 内置组件的使用

### Container 组件

| 名称       | 功能                                                         |
| ---------- | ------------------------------------------------------------ |
| alignment  | topCenter：顶部居中对齐topLeft：顶部左对齐topRight：顶部右对齐center： 水平垂直居中对齐centerLeft：垂直居中水平居左对齐centerRight：垂直居中水 平居右对齐bottomCenter底部居中对齐bottomLeft：底部居左对齐 bottomRight：底部居右对齐 |
| decoration | decoration: BoxDecoration( color: Colors.blue, border: Border.all( color: Colors.red, width: 2.0), borderRadius:BorderRadius.circular((8)),// 圆角 ， boxShadow: [ BoxShadow( color: Colors.blue, offset: Offset(2.0, 2.0), blurRadius: 10.0, ) ], ) //LinearGradient 背景线性渐变 RadialGradient径向渐变 gradient: LinearGradient( colors: [Colors.red, Colors.orange], ), |
| margin     | margin属性是表示Container与外部其他组件的距离。 EdgeInsets.all(20.0) |
| padding    | padding就是Container的内边距，指Container边缘与Child之间的距离 padding:EdgeInsets.all(10.0 |
| transform  | 让Container容易进行一些旋转之类的transform: Matrix4.rotationZ(0.2 |
| width      | 宽度                                                         |
| height     | 容器高度                                                     |
| child      | 容器子元素                                                   |

#### 示例代码01：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('这是fultter的标题')),
        body: Column(
          children: const [
            MyApp(),
            MyButton(),
            MyText()
          ],
        ),
      ),
    )
  );
}

// Container 是容器，类似 div

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
        // transform: Matrix4.translationValues(40, 0, 0), // 位移
        // transform: Matrix4.rotationZ(0.2), // 旋转
        transform: Matrix4.skewY(.2),
        width: 200,
        height: 200,
        decoration: BoxDecoration(
          color: Colors.yellow, // 配置背景颜色
          border: Border.all( // 配置边框
            color: Colors.red,
            width: 2
          ),
          borderRadius: BorderRadius.circular(8), // 圆角
          boxShadow: const [
            BoxShadow(color: Colors.black,blurRadius: 20.0), // 阴影
          ],
          //LinearGradient 背景线性渐变 RadialGradient径向渐变
          gradient: const LinearGradient(
            colors: [
              Colors.pink,Colors.yellow
            ]
          )
          // gradient: const RadialGradient(
          //   colors: [
          //     Colors.pink,Colors.yellow
          //   ]
          // )
          // borderRadius: BorderRadius.circular(100) // 圆形
        ),
        child: const Text('你好fultter', style: TextStyle(
          color: Colors.black,
          fontSize: 20
        ),),
      )
    );
  }
}
```

#### 示例代码02：

> 按钮

```dart
class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      width: 200,
      height: 40,
      // margin: const EdgeInsets.all(10), // 上下左右 10
      margin: const EdgeInsets.fromLTRB(0, 20, 0, 0),
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(20)
      ),
      child: const Text('按钮', style: TextStyle(
        color: Colors.white,
        fontSize: 20
      ),),
    );
  }
}
```



### Text组件详解

| 名称            | 功能                                                         |
| --------------- | ------------------------------------------------------------ |
| textAlign       | 文本对齐方式（center居中，left左对齐，right右对齐，justfy两端对齐） |
| textDirection   | 文本方向（ltr从左至右，rtl从右至左）                         |
| overflow        | 文字超出屏幕之后的处理方式（clip裁剪，fade渐隐，ellipsis省略号） |
| textScaleFactor | 字体显示倍率                                                 |
| maxLines        | 文字显示最大行数                                             |
| style           | 字体的样式设置                                               |

下面是 TextStyle 的参数 ：

| 名称            | 功能                                                         |
| --------------- | ------------------------------------------------------------ |
| decoration      | 文字装饰线（none没有线，lineThrough删除线，overline上划线， underline下划线） |
| decorationColor | 文字装饰线颜色                                               |
| decorationStyle | 文字装饰线风格（[dashed,dotted]虚线，double两根线，solid一根实线， wavy波浪线） |
| wordSpacing     | 单词间隙（如果是负值，会让单词变得更紧凑                     |
| letterSpacing   | 字母间隙（如果是负值，会让字母变得更紧凑）                   |
| fontStyle       | 文字样式（italic斜体，normal正常体）                         |
| fontSize        | 文字大小                                                     |
| color           | 文字颜色                                                     |
| fontWeight      | 字体粗细（bold粗体，normal正常体）                           |

```dart
class MyText extends StatelessWidget {
  const MyText({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(0, 40, 0, 0),
      width: 200,
      height: 200,
      decoration: const BoxDecoration(
        color: Colors.yellow
      ), 
      child: const Text(
        '我的fultter应用我的fultter应用我的fultter应用我的fultter应用我的fultter应用',
        textAlign: TextAlign.left,
        overflow: TextOverflow.ellipsis,
        maxLines: 1,
        style: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w900,
          color: Colors.red,
          fontStyle: FontStyle.italic,
          letterSpacing: 2,
          decoration: TextDecoration.underline,
          decorationColor: Colors.black,
          decorationStyle: TextDecorationStyle.dashed

        ),
      ),
    );
  }
}
```

###  Image图片组件

#### 图片组件介绍

 Flutter 中，我们可以通过 Image 组件来加载并显示图片 Image 的数据源可以是asset、文件、内存以 及网络 。

这里我们主要给大家讲两个 

**Image.asset， 本地图片**

**Image.network 远程图片**

Image组件的常用属性:

| 名称                   | 类型      | 说明                                                         |
| ---------------------- | --------- | ------------------------------------------------------------ |
| alignment              | Alignment | 图片的对齐方式                                               |
| color和 colorBlendMode |           | 设置图片的背景颜色，通常和colorBlendMode配合一起使 用，这样可以是图片颜色和背景色混合。上面的图片就是进 行了颜色的混合，绿色背景和图片红色的混合 |
| fit                    | BoxFit    | fit属性用来控制图片的拉伸和挤压，这都是根据父容器来 的。 BoxFit.fill:全图显示，图片会被拉伸，并充满父容器。 BoxFit.contain:全图显示，显示原比例，可能会有空隙。 BoxFit.cover：显示可能拉伸，可能裁切，充满（图片要充 满整个容器，还不变形）。 BoxFit.fitWidth：宽度充满（横 向充满），显示可能拉伸，可能裁切。 BoxFit.fitHeight ： 高度充满（竖向充满）,显示可能拉伸，可能裁切。 BoxFit.scaleDown：效果和contain差不多，但是此属性不 允许显示超过源图片大小，可小不可大。 |
| repeat                 | 平铺      | ImageRepeat.repeat : 横向和纵向都进行重复，直到铺满整 个画布。ImageRepeat.repeatX: 横向重复，纵向不重复。 ImageRepeat.repeatY：纵向重复，横向不重复。 |
| width                  |           | 宽度 一般结合ClipOval才能看到效果                            |
| height                 |           | 高度 一般结合ClipOval才能看到效果                            |

#### 加载远程图片

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('flutter title')),
      body: const MyImage()
    )
  ));
}

class MyImage extends StatelessWidget {
  const MyImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: 300,
        width: 300,
        decoration: const BoxDecoration(
          color: Colors.yellow
        ),
        child: Image.network(
          'https://www.itying.com/images/201906/goods_img/1120_P_1560842352183.png',
          scale: 2, // 图片缩放
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
```

#### Container实现圆形图片

```dart
// 实现一张圆形图片
class Circular extends StatelessWidget {
  const Circular({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      height: 150,
      decoration: BoxDecoration(
          color: Colors.yellow,
          borderRadius: BorderRadius.circular(75),
          image: const DecorationImage(
              image: NetworkImage(
                  'https://www.itying.com/themes/itying/images/ionic4.png'),
              fit: BoxFit.cover)),
    );
  }
}
```

#### ClipOval实现圆形图片

```dart
// 使用 ClipOval 实现一张圆形图片
class ClipImage extends StatelessWidget {
  const ClipImage({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipOval(
      child: Image.network(
        'https://www.itying.com/themes/itying/images/ionic4.png',
        width: 150,
        height: 150,
        fit: BoxFit.cover,
      ),
    );
  }
}
```

#### CircleAvatar实现圆形图片

```dart
class CircleImage extends StatelessWidget {
  const CircleImage({super.key});

  @override
  Widget build(BuildContext context) {
    return const CircleAvatar(
        radius: 110,
        backgroundColor: Color(0xffFDCF09),
        child: CircleAvatar(
          radius: 100,
          backgroundImage:
              NetworkImage("https://www.itying.com/images/flutter/3.png"),
        ));
  }
}
```

#### 加载本地图片

> SizedBox
>
> Container
>
> 他们两都可以实现

```dart
// 加载本地图片
class LocalImage extends StatelessWidget {
  const LocalImage({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: 150, height: 150, child: Image.asset("images/a.jpeg"));
    // return Container(
    //   height: 150,
    //   width: 150,
    //   decoration:const BoxDecoration(
    //     color: Colors.red
    //   ),
    //   child: Image.asset('images/a.jpeg'),
    // );
  }
}
```

### 图标组件

#### 使用Flutter官方Icons图标

 Material Design所有图标可以在其官网查看：https://material.io/tools/icons/

```dart
import 'package:flutter/material.dart';
import './myFonts.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.blue
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('flutter icon')),
        body: const MyHomePage(),
      ),
    );
  }
}

// 加载 flutter 内置图标
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        SizedBox(height: 20),
        Icon(Icons.home,size: 40,color: Colors.red),
        SizedBox(height: 20),
        Icon(Icons.ac_unit_outlined,size: 40,color: Colors.red),
        SizedBox(height: 20),
        Icon(Icons.search,size: 40,color: Colors.red),
        SizedBox(height: 20),
        // 下面时自定义图标
        Icon(MyIcons.book,size: 40,color: Colors.red),
        SizedBox(height: 20),
        Icon(MyIcons.gouwuchekong,size: 40,color: Colors.red),
        SizedBox(height: 20),
        Icon(MyIcons.tushu,size: 40,color: Colors.red),
        SizedBox(height: 20),
        Icon(MyIcons.weixin,size: 40,color: Colors.red),
      ],
    );
  }
}
```

#### Flutter中借助阿里巴巴图标库自定义字体图标

我们也可以使用自定义字体图标。阿里巴巴图标库官网 iconfont.cn上有很多字体图标素材，我们可以 选择自己需要的图标打包下载后，会生成一些不同格式的字体文件，在Flutter中，我们使用ttf格式即 可。 

假设我们项目中需要使用一个书籍图标和微信图标，我们打包下载后导入：

1. 导入字体图标文件；这一步和导入字体文件相同，假设我们的字体图标文件保存在项目根目录下， 路径为"fonts/iconfont.ttf"：

```yaml
fonts:
- family: myIcon #指定一个字体名
fonts:
- asset: fonts/iconfont.ttf
```

也可以配置多个字体文件：

```yaml
fonts:
- family: myIcon #指定一个字体名
fonts:
- asset: fonts/iconfont.ttf
- family: alipayIcon #指定一个字体名
fonts:
- asset: fonts/iconfont2.ttf
```

2、 为了使用方便，我们定义一个 MyIcons 类，功能和 Icons 类一样：将字体文件中的所有图标都定义 成静态变量：

```dart
import 'package:flutter/material.dart';

class MyIcons{
  static const IconData book = IconData(
    0xe600,
    fontFamily: 'myIcons',
    matchTextDirection: true
  );
  static const IconData gouwuchekong = IconData(
    0xe601,
    fontFamily: 'myIcons',
    matchTextDirection: true
  );
  static const IconData tushu = IconData(
    0xe602,
    fontFamily: 'myIcons',
    matchTextDirection: true
  );
  static const IconData weixin = IconData(
    0xe603,
    fontFamily: 'myIcons',
    matchTextDirection: true
  );
}
```

3、 在要用的文件里面导入就可以了