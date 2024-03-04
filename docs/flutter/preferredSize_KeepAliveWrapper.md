---
# 取二三级标题生成目录
outline: [2,3]
---

### preferredSize组件

> PreferredSize可以改变appBar的高度

```dart
appBar: PreferredSize(
        preferredSize: const Size.fromHeight(40),
        child: AppBar(
            elevation: 0.5,
            backgroundColor: Colors.white,
            title: SizedBox(
              height: 30,
              child: TabBar(
                // onTap: (index){
                //   print(index); // 只能监听点击事件，不能监听滑动事件
                // },
                isScrollable: true,
                controller: _tabController,
                indicatorColor: Colors.red,
                labelColor: Colors.red,
                labelStyle: const TextStyle(fontSize: 14),
                unselectedLabelColor: Colors.black,
                indicatorSize: TabBarIndicatorSize.label,
                tabs: const [
                  Tab(child: Text('关注')),
                  Tab(child: Text('热门')),
                  Tab(child: Text('视频')),
                  Tab(child: Text('娱乐')),
                  Tab(child: Text('篮球')),
                  Tab(child: Text('唱')),
                  Tab(child: Text('跳')),
                  Tab(child: Text('rap')),
                ],
              ),
            )),
      ),
```

### 自定义KeepAliveWrapper 缓存页面

> AutomaticKeepAliveClientMixin 可以快速的实现页面缓存功能，但是通过混入的方式实现不是很优 雅， 所以我们有必要对AutomaticKeepAliveClientMixin 混入进行封装

```dart
import 'package:flutter/material.dart';

class KeepAliveWrapper extends StatefulWidget {
  final Widget? child;
  final bool keepAlive;

  const KeepAliveWrapper(
    {super.key, required this.child, this.keepAlive = true}
  );

  @override
  State<KeepAliveWrapper> createState() => _KeepAliveWrapperState();
}

class _KeepAliveWrapperState extends State<KeepAliveWrapper> with AutomaticKeepAliveClientMixin {
  @override
  Widget build(BuildContext context) {
    return widget.child!;
  }

  @override
  bool get wantKeepAlive => widget.keepAlive;

  @override
  void didUpdateWidget(covariant KeepAliveWrapper oldWidget) {
    if (oldWidget.keepAlive != widget.keepAlive) {
    // keepAlive 状态需要更新，实现在 AutomaticKeepAliveClientMixin 中
      updateKeepAlive();
    }
    super.didUpdateWidget(oldWidget);
  }
}
```