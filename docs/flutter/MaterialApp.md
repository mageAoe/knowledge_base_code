---
# 取二三级标题生成目录
outline: [2,3]
---


### MaterialApp 去掉debug图标

```dart
return MaterialApp(
    debugShowCheckedModeBanner:false , //去掉debug图标
    home:Tabs(),
    ...
);
```

### 全局配置主题

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.blue,
        appBarTheme: const AppBarTheme(  // 全局appbar居中
          centerTitle: true
        )
        ),
      // home: const Tabs(),
      initialRoute: "/",
      onGenerateRoute: onGenerateRoute,
    );
  }
}

```