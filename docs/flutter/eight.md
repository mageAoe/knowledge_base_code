---
# 取二三级标题生成目录
outline: [2,3]
---

## 状态管理、Flutter Getx介绍

### 状态管理

通俗的讲： 当我们想在多个页面（组件、widget）之间共享状态（数据），或者一个页面（组件、widget）中的多个子组件之间共享状态（数据），这个时候我们就可以用Flutter中的状态管理来管理统一的状态（数据），实现不同组件之间的传值和数据共享

现在Flutter的状态管理方案很多，redux、bloc、state、provider、Getx

provider是官方提供的状态管理解决 方案，主要功能就是状态管理。Getx是第三方的状态管理插件，不仅具有状态管理的功能，还具有路由管理、主题管理、国际化多语言管理、Obx局部更新、网络请求、数据验证等功能，相比其他状态管理插件Getx简单、功能强大并且高性能

### Flutter Getx介绍

GetX是Flutter上一个轻量且强大的解决方案，GetX为我们提供了高性能的状态管理、智能的依赖注入和便捷的路由管理

- getx有3个基本原则、
  - 性能： getx专注于性能和最小资源消耗。getx打包后的apk占用大小和运行时的内存占用与其他状态管理插件不相上下
  - 效率： getx的语法非常简捷，并保持了极高的性能，能极大缩短你的开发时长
  - 结构： getx可以讲界面、逻辑、依赖和路由完全解耦，用起来更清爽，逻辑更清晰，代码 更容易维护
- getx并不臃肿，却很轻量。如果你只使用状态管理，只有状态管理模块会被编译，其他没用到的东西都不会被编译到你的代码中。它拥有众多的功能，但这些功能都在独立的容器中，只有在使用后才会启动
- getx有一个庞大的生态系统，能够在Android、ios、web、mac、Linux、windows和你的服务器上用同样的代码运行。通过get Server可以在你的后端瓦全重用你在前端写的代码

官网： https://pub.dev/packages/get

中文文档：https://github.com/jonataslaw/getx/blob/master/README.zh-cn.md

## Flutter Getx 中的Dialog 以及改变主题

###  Getx安装

将 Get 添加到你的 pubspec.yaml 文件中。

```js
dependencies:
get: ^4.6.5
```

在需要用到的文件中导入，它将被使用。

```js
import 'package:get/get.dart';
```

### Getx 使用 Dialog

#### 设置应用程序入口

当我们导入依赖后，在应用程序顶层把 GetMaterialApp 作为顶层，如下所示

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';

void main() {
	runApp(MyApp());
}
class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return GetMaterialApp(
        	title: "GetX",
        	home: Scaffold(
            appBar: AppBar(title: Text("GetX Title"),),
            ),
        );
    }
}
```

### 调用BottomSheet 以及改变主题

我们可以通过``` GetX``` 很轻松的调用 ```bottomSheet()``` ，而且无需传入 ```context``` ，下面我给出一个例子， 使用 ```GetX``` 弹出``` bottomSheet ```并很轻松的实现切换主题 。 

我们可以通过 ```Get.bottomSheet() ```来显示 ```BottomSheet ```，通过 ```Get.back()``` 实现路由返回，通过 ```Get.changeTheme(ThemeData.dark())``` 切换皮肤主题，通过```Get.isDarkMode```判断主题样式。

```dart
ElevatedButton(
	onPressed: () {
        Get.bottomSheet(Container(
        color: Get.isDarkMode ? Colors.black12 : Colors.white,
        height: 200,
        child: Column(
            children: [
                ListTile(
                leading: Icon(Icons.wb_sunny_outlined,
        color: Get.isDarkMode ? Colors.white : Colors.black),
        title: Text("白天模式",
        style: TextStyle(
            color: Get.isDarkMode
            ? Colors.white
            : Colors.black)),
        onTap: () {
        Get.changeTheme(ThemeData.light());
        Get.back();
    },
),
    ListTile(
        leading: Icon(Icons.wb_sunny,
        color:
        Get.isDarkMode ? Colors.white : Colors.black),
        title: Text("黑夜模式",
        style: TextStyle(
        color: Get.isDarkMode? Colors.white: Colors.black)),
        onTap: () {
            Get.changeTheme(ThemeData.dark());
            Get.back();
            },
        )
        ],
        ),
    ));
 },
child: const Text("Show BottomSheet"))
```

**BottomSheet属性和说明**

| 字段                     | 属性          | 描述                         |
| ------------------------ | ------------- | ---------------------------- |
| bottomsheet              | Widget        | 弹出的Widget组件             |
| backgroundColor          | Color         | bottomsheet的背景颜色        |
| elevation                | double        | bottomsheet的阴影            |
| persistent               | bool          | 是否添加到路由中             |
| shape                    | ShapeBorder   | 边框形状，一般用于圆角效果   |
| clipBehavior             | Clip          | 裁剪的方式                   |
| barrierColor             | Color         | 弹出层的背景颜色             |
| ignoreSafeArea           | bool          | 是否忽略安全适配             |
| isScrollControlled       | bool          | 是否支持全屏弹出，默认false  |
| useRootNavigator         | bool          | 是否使用根导航               |
| isDismissible            | bool          | 点击背景是否可关闭，默认ture |
| enableDrag               | bool          | 是否可以拖动关闭，默认true   |
| settings                 | RouteSettings | 路由设置                     |
| enterBottomSheetDuration | Duration      | bottomsheet进入时的动画时间  |
| exitBottomSheetDuration  | Duration      | bottomsheet退出时的动画时间  |

### 三、调用snackbar

Snackbar 和我们前面讲的toast有点相似， 如果想在应用程序中触发某些特定的事件后，需要弹出快 捷消息，那么使用 Snackbar 则是最佳的选择。

 我们可以通过 Get.snackbar() 来显示 snackbar ，如下所示

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
void main() {
runApp(MyApp());
}
class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {
return GetMaterialApp(
title: "GetX",
home: Scaffold(
appBar: AppBar(
title: Text("GetX Title"),
),
body: Center(
child: Column(
mainAxisAlignment: MainAxisAlignment.center,
crossAxisAlignment: CrossAxisAlignment.center,
children: [
ElevatedButton(
onPressed: () {
Get.snackbar("Snackbar 标题", "欢迎使用Snackbar");
},
child: Text("显示 Snackbar"))
],
),
),
),
);
}
}
```

如果您运行了代码，那么恭喜你，你已经会用 GetX 来展示 snackbar 了。你将得到下面的结果

**Snackbar属性和说明**

| 字段      | 属性   | 描述                     |
| --------- | ------ | ------------------------ |
| title     | String | 弹出的标题文字           |
| message   | String | 弹出的消息文字           |
| colorText | Color  | title和message的文字颜色 |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |
|           |        |                          |

## Flutter Getx 路由管理

GetX 为我们封装了 Navigation ，无需 context 可进行跳转，使用 GetX 进行路由跳转非常的简单， 只需要调用 Get.to() 即可进行路由跳转， GetX 路由跳转简化了跳转动画设置 、动画时长定义、动画 曲线设置。

### Get.to()实现普通路由跳转

#### 设置应用程序入口

当我们导入依赖后，在应用程序顶层把 GetMaterialApp 作为顶层，如下所示

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
void main() {
runApp(MyApp());
}
class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {
return GetMaterialApp(
title: "GetX",
home: Scaffold(
appBar: AppBar(title: Text("GetX Title"),),
),
);
}
}
```

### 调用to方法切换路由

```dart
import './Home.dart'
ElevatedButton(
onPressed: () async {
Get.to(Home());
},
child: Text("跳转到首页")
)
```

### 调用Get.toNamed()跳转到命名路由

以前

```dart
Navigator.pushNamed(context, "/login");
```

使用Getx后

```dart
Get.toNamed("/login");

Get.toNamed("/shop",arguments: {
"id":20
});
```

### Get.back(); 返回到上一级页面

以前

```dart
Navigator.of(context).pop();
```

使用Getx后

```dart
Get.back();
```

### Get.offAll(); 返回到根

以前

```dart
Navigator.of(context).pushAndRemoveUntil(
MaterialPageRoute(builder: (BuildContext context) {
return const Tabs(index: 4);
})
, (route) => false);
```

使用Getx后

```dart
Get.offAll( const Tabs(index: 4));
```

### Get.off(NextScreen())

进入下一个页面，但没有返回上一个页面的选项（用于闪屏页，登录页面等）。

```dart
Get.off(NextScreen());
```

### Flutter Getx 配置路由以及动画

#### defaultTransition可以配置默认动画

```dart
GetMaterialApp(
debugShowCheckedModeBanner: false,
title: 'Flutter Demo',
theme: ThemeData(
primarySwatch: Colors.blue,
appBarTheme: const AppBarTheme(
centerTitle: true,
)),
initialRoute: "/",
defaultTransition: Transition.rightToLeftWithFade,
getPages: [
],
);

```

#### GetPage 可以配置动态路由

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import './pages/tabs.dart';
import './pages/shop.dart';
import './pages/user/login.dart';
import './pages/user/registerFirst.dart';
import './pages/user/registerSecond.dart';
import './pages/user/registerThird.dart';
void main() {
runApp(const MyApp());
}
class MyApp extends StatelessWidget {
const MyApp({Key? key}) : super(key: key);
// This widget is the root of your application.
@override
Widget build(BuildContext context) {
return GetMaterialApp(
debugShowCheckedModeBanner: false,
title: 'Flutter Demo',
theme: ThemeData(
primarySwatch: Colors.blue,
appBarTheme: const AppBarTheme(
centerTitle: true,
)),
initialRoute: "/",
defaultTransition: Transition.rightToLeftWithFade,
getPages: [GetPage(name: "/", page: () => const Tabs()),
GetPage(name: "/login", page: () => const LoginPage()),
GetPage(
name: "/registerFirst",
page: () => const RegisterFirstPage(),
transition: Transition.rightToLeft),
GetPage(
name: "/registerSecond", page: () => const RegisterSecondPage()),
GetPage(name: "/registerThird", page: () => const RegisterThirdPage()),
GetPage(name: "/shop", page: () => const ShopPage()),
],
);
}
}

```

#### Getx 路由跳转传值以及接受数据

路由配置

```dart
getPages: [
...
GetPage(name: "/shop", page: () => const ShopPage()),
...
],
```

跳转传值

```dart
Get.toNamed("/shop",arguments: {
"id":20
});
```

接受数据

```dart
print(Get.arguments);
```

### Flutter Getx 中间件配置

更多详情参考：https://github.com/jonataslaw/getx/blob/master/README.zh-cn.md#redirect

#### 新建shopMiddleware.dart

```dart
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
class ShopMiddleWare extends GetMiddleware {
@override
// 优先级越低越先执行
int? get priority => -1;
@override
RouteSettings redirect(String ? route){
return const RouteSettings(name: '/login');
}
}

```

#### GetPage配置路由

```dart
return GetMaterialApp(
...
    initialRoute: "/",
    defaultTransition: Transition.rightToLeftWithFade,
    getPages: [
    GetPage(name: "/", page: () => const Tabs()),
...
GetPage(
    name: "/shop",
    page: () => const ShopPage(),
    middlewares: [ShopMiddleWare()]),
    ],
);
```

## Flutter Getx 状态管理

## Flutter get_cli的使用

### win安装get_cli

```dart
flutter pub global activate get_cli
```

提示

```dart
Warning: Pub installs executables into F:\flutter_windows\flutter_windows_3.3.0-
stable\flutter\.pub-cache\bin, which is not on your path.
```

下面路径添加到Path环境变量里面

```dart
F:\flutter_windows\flutter_windows_3.3.0-stable\flutter\.pub-cache\bin
```

### mac安装get_cli

```dart
flutter pub global activate get_cli
```

配置环境变量 

一般 Mac 的环境变量都是通过根目录的 .bash_profile 进行环境变量设置

```dart
vim ~/.bash_profile
vim ~/.zshrc
```

```dart
export PATH=/Users/aishengwanwu/flutter_mac/flutter/bin:$PATH
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export PATH="$PATH":"$HOME/Documents/flutter_sdk/flutter/.pub-cache/bin"

```

让配置环境变量生效

```
source ~/.bash_profile
source ~/.zshrc
```

### 验证get_cli是否安装配置成功

终端输入

```
get
```

或者

```
getx
```

如果能出来命令提示说明get_cli安装配置成功

```dart
D:\getx\getx_cli>get
Can't load Kernel binary: Invalid SDK hash.
List available commands:
create:
controller: 生成 controller
page: 用于生成 page
project: 用于生成新项目
provider: 创建一个新 Provider
screen: 生成新 Screen
view: 生成 view
generate:
locales: 从 json 文件生成国际化翻译文件
model: 从 json 生成 model 类
help: 显示本帮助
init: 生成所选结构在现有项目:
install: 为你的项目安装依赖:
remove: 为你的项目移除依赖:
sort: 排序 import 并格式化 dart 文件
update: 更新 GET_CLI
--version: 显示当前 CLI 版本'
Time: 119 Milliseconds
```

### 使用get_cli命令行

#### 初始化项目

```dart
get init
```

#### 创建页面

> 需要定位到项目目录下

```dart
get create page:search
get create page:cart
get create page:user
get create page:category
```

#### 创建控制器

```dart
get create controller:counter

在指定目录里面创建控制器
get create controller:counter on home
```

#### 创建view

只会生成一个继承GetView的dart文件

```dart
get create view:dialogview on home
```

#### 创建provider

生成一个继承GetConnect的类，用于请求数据，GetConnect可以便捷的通过http或websockets进行 前后台通信。

```dart
get create provider:user on home
```

#### 生成国际化文件

在 assets/locales 目录创建 json 格式的语言文件 输入: zh_CN.json

```dart
{
"buttons": {
"login": "登录",
"sign_in": "注册",
"logout": "注销",
"sign_in_fb": "用 Facebook 登录",
"sign_in_google": "用 Google 登录",
"sign_in_apple": "用 Apple 登录"
}
}
```

en_US.json

```dart
{
"buttons": {
"login": "Login",
"sign_in": "Sign-in",
"logout": "Logout",
"sign_in_fb": "Sign-in with Facebook",
"sign_in_google": "Sign-in with Google",
"sign_in_apple": "Sign-in with Apple"
}
}
```

运行 :

```dart
get generate locales assets/locales
```

输出

```dart
abstract class AppTranslation {
static Map<String, Map<String, String>> translations = {
'en_US' : Locales.en_US,
'zh_CN' : Locales.zh_CN,
};
}
abstract class LocaleKeys {
static const buttons_login = 'buttons_login';
static const buttons_sign_in = 'buttons_sign_in';
static const buttons_logout = 'buttons_logout';
static const buttons_sign_in_fb = 'buttons_sign_in_fb';
static const buttons_sign_in_google = 'buttons_sign_in_google';
static const buttons_sign_in_apple = 'buttons_sign_in_apple';
}
abstract class Locales {
static const en_US = {
'buttons_login': 'Login',
'buttons_sign_in': 'Sign-in',
'buttons_logout': 'Logout',
'buttons_sign_in_fb': 'Sign-in with Facebook',
'buttons_sign_in_google': 'Sign-in with Google',
'buttons_sign_in_apple': 'Sign-in with Apple',
};
static const zh_CN = {
'buttons_login': 'Entrar',
'buttons_sign_in': 'Cadastrar-se',
'buttons_logout': 'Sair',
'buttons_sign_in_fb': '用 Facebook 登录',
'buttons_sign_in_google': '用 Google 登录',
'buttons_sign_in_apple': '用 Apple 登录',
};
}
```

现在只需要在 GetMaterialApp 中加入

```dart
GetMaterialApp(
...
translationsKeys: AppTranslation.translations,
locale:const Locale('zh', 'CN'), // 将会按照此处指定的语言翻译
fallbackLocale:const Locale('en', 'US'), // 添加一个回调语言选项，以备上面指定的
语言翻译不存在
...
)

```

#### 生成 model

在实际项目中我们需要把服务器返回的map对象转换成model类，这个时候就可以使用get中的 generate model 生成model

```dart
get generate model on home from "https://jdmall.itying.com/api/focus"
```

