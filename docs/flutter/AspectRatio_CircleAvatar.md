---
# 取二三级标题生成目录
outline: [2,3]
---

## Flutter AspectRatio

> AspectRatio的作用是根据设置调整子元素child的宽高比。
>
> AspectRatio首先会在布局限制条件允许的范围内尽可能的扩展，widget的高度是由宽度和比率决定 的，类似于BoxFit中的contain，按照固定比率去尽量占满区域。 
>
> 如果在满足所有限制条件过后无法找到一个可行的尺寸，AspectRatio最终将会去优先适应布局限制条 件，而忽略所设置的比率。



| 属性        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| aspectRatio | 宽高比，最终可能不会根据这个值去布局，具体则要看综合因素，外层是否允许 按照这种比率进行布局，这只是一个参考值 |
| child       | 子组件                                                       |

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      // aspectRatio: 2/1, // 宽度沾满屏幕，高度为宽度的一半
      // aspectRatio: 3/1, // 宽度沾满屏幕，高度为宽度的 1/3
       aspectRatio: 1/3,  // 高度沾满屏幕，宽度为宽度的 1/2
      child: Container(
        color: Colors.red,
      ),
      );
  }
}
```

##  CircleAvatar实现一个圆形图片

![image-20230517223124782](../image/flutter-assets/image-20230517223124782.png)

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  List<Widget> _iniyListData(){
    var tempList = listData.map((value) {
      return Card(
          margin: const EdgeInsets.all(10),
          elevation: 20,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20)
          ),
          child: Column(
            children: [
              AspectRatio(
                aspectRatio: 16/9,
                child: Image.network(value['imageUrl'], fit: BoxFit.cover,),
              ),
              ListTile(
                leading: CircleAvatar(
                  backgroundImage:NetworkImage(value['imageUrl'])
                ),
                title:  Text(value['title']),
                subtitle:  Text(value['author']),
              )
            ],
          ),
        );
    });
    return tempList.toList();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: _iniyListData(),
    );
  }
}
```

## CircleAvatar实现一个圆形图片

 radius 元的半径

```dart
 leading: CircleAvatar(
                  backgroundImage:NetworkImage(value['imageUrl'])
 ),
```

基本上，CircleAvatar 不提供设置边框的属性。但是，可以将其包裹在具有更大半径和不同背景颜色的 不同 CircleAvatar 中，以创建类似于边框的内容。

```dart
return const CircleAvatar(
 radius: 110,
 backgroundColor: Color(0xffFDCF09),
 child: CircleAvatar(
	radius: 100,
	backgroundImage:
	NetworkImage("https://www.itying.com/images/flutter/3.png"),
	)
)

```