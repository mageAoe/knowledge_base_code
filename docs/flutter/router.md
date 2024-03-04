---
# 取二三级标题生成目录
outline: [2,3]
---

## Flutter中的路由

### Flutter中的路由

> Flutter中的路由通俗的讲就是页面跳转。在Flutter中通过Navigator组件管理路由导航。 并提供了管理堆栈的方法。如：Navigator.push和Navigator.pop Flutter中给我们提供了两种配置路由跳转的方式：1、基本路由 2、命名路由

### Flutter 中的普通路由使用

> 比如我们现在想从HomePage组件跳转到SearchPage组件。
>
> **1、需要在HomPage中引入SearchPage.dart**
>
> ```dart
> import '../SearchPage.dart';
> ```
>
> **2、在HomePage中通过下面方法跳转**
>
> ```dart
> ElevatedButton(onPressed: (){
>  Navigator.of(context).push(
>        MaterialPageRoute(builder: (BuildContext context){
>              return const SearchPage();
>          })
>  );
> }, child: const Text('搜索')),
> ```



### Flutter 中的普通路由跳转传值

> 跳转传值和调用组件传值的实现方法是一样的
>
> **1、定义一个NewsPage接收传值**
>
> ```dart
> import 'package:flutter/material.dart';
> // 新闻页面接收上个页面传过来的参数
> 
> class NewsPage extends StatefulWidget {
> final String title;
> final int aid;
> const NewsPage({super.key,required this.title, required this.aid});
> 
> @override
> State<NewsPage> createState() => _NewsPageState();
> }
> 
> class _NewsPageState extends State<NewsPage> {
> 
> @override
> void initState() {
>  // TODO: implement initState
>  super.initState();
>  print(widget.aid);
> }
> 
> @override
> Widget build(BuildContext context) {
>  return Scaffold(
>    appBar: AppBar(title: Text(widget.title)),
>    body: Text(widget.title),
>    floatingActionButton: FloatingActionButton(
>      onPressed: (){
>        Navigator.pop(context);
>      },
>      child: const Icon(Icons.arrow_back),
>    ),
>  );
> }
> }
> ```
>
> **2、跳转页面实现传值**
>
> ```dart
> Navigator.of(context).push(
>  MaterialPageRoute(builder: (BuildContext context){
>        return const NewsPage(title: '我是 传过来的值 111', aid: 12);
>     })
>  );
> }, child: const Text('新闻-跳转传值'))
> ```

#### Flutter 中的命名路由

**1、main.dart中配置路由**

```dart
import 'package:flutter/material.dart';
import './pages/tabs.dart';
import './pages/search.dart';
import './pages/news.dart';
import './pages/form.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: Colors.blue),
      // home: const Tabs(),
      initialRoute: "/",
      routes: {
        "/": (context)=> const Tabs(),
        "/news": (context)=> const NewsPage(),
        "/form": (context)=> const FormPage(),
        "/search": (context)=> const SearchPage(),
      },
    );
  }
}
```

**2、跳转路由**

```dart
ElevatedButton(onPressed: (){
    Navigator.pushNamed(context, "/news");
}, child: const Text('命名路由跳转 - news')),
```

### Flutter 中的命名路由传值

> 官方文档：https://flutter.dev/docs/cookbook/navigation/navigate-with-arguments

**1. 配置onGenerateRoute**

```dart
import 'package:flutter/material.dart';
import '../pages/tabs.dart';
import '../pages/search.dart';
import '../pages/news.dart';
import '../pages/form.dart';
import '../pages/shop.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  // 1. 配置路由
  Map routes = {
        "/": (context)=> const Tabs(),
        "/news": (context)=> const NewsPage(),
        "/form": (context, { arguments }) => FormPage(arguments: arguments),
        "/search": (context)=> const SearchPage(),
        "/shop": (context, { arguments })=> ShopPage(arguments: arguments),
 };
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: Colors.blue),
      // home: const Tabs(),
      initialRoute: "/",
      onGenerateRoute: (RouteSettings settings){
        // 统一处理
        final String? name = settings.name;
        final Function? pageContentBuilder = routes[name];
        if (pageContentBuilder != null) {
          if (settings.arguments != null) {
            final Route route = MaterialPageRoute(
              builder: (context) => pageContentBuilder(context, arguments: settings.arguments));
            return route;
          } else {
            final Route route = MaterialPageRoute(
              builder: (context) => pageContentBuilder(context));
            return route;
          }
        }
        return null;
  	  },
    );
  }
}
```

**2. 定义页面接收arguments传参**

```dart
import 'package:flutter/material.dart';
// 其他页面跳转到form页面进行命名路由传值

class FormPage extends StatefulWidget {
  final Map arguments;
  const FormPage({super.key, required this.arguments});

  @override
  State<FormPage> createState() => _FormPageState();
}

class _FormPageState extends State<FormPage> {

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    print(widget.arguments);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('表单页面')
      ),
      body:  const Center(
        child: Text('form....'),
      ),
    );
  }
}
```

**3.跳转页面实现传参**

```dart
          ElevatedButton(onPressed: (){
            Navigator.pushNamed(context, "/form", arguments: {
              "title" : '我是命名路由传值'
            });
          }, child: const Text('命名路由传值 - form')),
```

### Flutter 中的命名路由单独抽离到一个文件

**新建routers/routers.dart 配置路由**

```dart
import 'package:flutter/material.dart';
import '../pages/tabs.dart';
import '../pages/search.dart';
import '../pages/news.dart';
import '../pages/form.dart';
import '../pages/shop.dart';

  // 1. 配置路由
  Map routes = {
        "/": (context)=> const Tabs(),
        "/news": (context)=> const NewsPage(),
        "/form": (context, { arguments }) => FormPage(arguments: arguments),
        "/search": (context)=> const SearchPage(),
        "/shop": (context, { arguments })=> ShopPage(arguments: arguments),
 };

   // 2. 配置onGenerateRoute  固定写法  这个方法也相当于一个中间件，这里可以做权限判断
 var onGenerateRoute = (RouteSettings settings){
        // 统一处理
        final String? name = settings.name;
        final Function? pageContentBuilder = routes[name];
        if (pageContentBuilder != null) {
          if (settings.arguments != null) {
            final Route route = MaterialPageRoute(
              builder: (context) => pageContentBuilder(context, arguments: settings.arguments));
            return route;
          } else {
            final Route route = MaterialPageRoute(
              builder: (context) => pageContentBuilder(context));
            return route;
          }
        }
        return null;
  };
```

**修改main.dart**

```dart
import 'package:flutter/material.dart';
import './routes/routes.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: Colors.blue),
      // home: const Tabs(),
      initialRoute: "/",
      onGenerateRoute: onGenerateRoute,
    );
  }
}
```

**实现页面跳转传值**

```dart
 ElevatedButton(
   onPressed: (){
     Navigator.pushNamed(context, "/shop", arguments: {
        "title" : '我是命名路由传值 - shop'
     });
 	}, 
   child: const Text('命名路由传值 - shop')
 )
```

### Flutter 返回上一级路由

```dart
Navigator.of(context).pop();
```

### Flutter 中替换路由

> 比如我们从用户中心页面跳转到了registerFirst页面，然后从registerFirst页面通过 pushReplacementNamed跳转到了registerSecond页面。这个时候当我们点击registerSecond的返回 按钮的时候它会直接返回到用户中心。

```dart
ElevatedButton(onPressed: (){
            // 命名路由跳转
            // Navigator.pushNamed(context, "/registerThird");
            // 替换路由跳转
            Navigator.of(context).pushReplacementNamed('/registerThird');
 }, child: const Text('下一步'))
```

### Flutter 返回到根路由

> 比如我们从用户中心跳转到registerFirst页面，然后从registerFirst页面跳转到registerSecond页面，然 后从registerSecond跳转到了registerThird页面。这个时候我们想的是registerThird注册成功后返回到 用户中心。 这个时候就用到了返回到根路由的方法。

```dart
		// 返回跟目录
 Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(builder: (BuildContext context){
                return const Tabs(index: 4); 
              }), (route) => false);
}, child: const Text('完成注册'))
```

#### Flutter Android 和Ios使用同样风格的路由跳

> Material组件库中提供了一个MaterialPageRoute组件，它可以使用和平台风格一致的路由切换动画， 如在iOS上会左右滑动切换，而在Android上会上下滑动切换 , CupertinoPageRoute是Cupertino组件 库提供的iOS风格的路由切换组件如果在Android上也想使用左右切换风格，可以使用
>
> CupertinoPageRoute

**1、routers.dart中引入cupertino.dart**

```dart
// 配置 ios 风格的路由
// 1. 引入 cupertino.dart
// 2. 使用 CupertinoPageRoute
import 'package:flutter/cupertino.dart'; 
```

**2、MaterialPageRoute改为CupertinoPageRout**

```dart
var onGenerateRoute = (RouteSettings settings) {
  // 统一处理
  final String? name = settings.name;
  final Function? pageContentBuilder = routes[name];
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = CupertinoPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: settings.arguments));
      return route;
    } else {
      final Route route =
          CupertinoPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
  return null;
};
```