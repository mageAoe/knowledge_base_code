## 安装运行环境

### Flutter介绍

> Flutter是谷歌公司开发的一款开源、免费的UI框架，可以让我们快速的在Android和iOS上构建高质量 App。它最大的特点就是跨平台、以及高性能。 目前 Flutter 已经支持 iOS、Android、Web、 Windows、macOS、Linux等。
>
> Flutter基于谷歌的dart语言，如果没有任何Dart语言的基础，不建议直接学习Flutter。建议先学习Dart 语言的基本语法。然后再进入Flutter的学习。
>
> Dart基础教程：https://www.itying.com/goods-1101.html 
>
> 市面上已经有很多的混合App开发框架了，但是有些混合APP开发框架主要是针对前端开发者的：比如 ReactNative（基于React）、Ionic（基于Angular、Vue、React）。有些则是针对.Net平台针对.Net开 发者的比如：Xamarin 
>
> Flutter是谷歌基于Dart语言开发的一款跨平台的App开发框架。它针对的开发者是全部开发者。它的性 能相比RN、Ionic这样的框架要更好一些。 Flutter在2019年的时候就拥有了非常高的关注度。 我们录制的《Flutter仿京东商城项目实战第一版》 已经有100多万的学习者了。Flutter目前已经非常稳定，并且社区也非常完善了, 应用市场中新发布的新 应用有进一半是Flutter开发的应用。Flutter3.x以后不仅支持了Android Ios App的跨平台开发，还支持 了Web、Windows、MacOs、Linux桌面应用的跨平台开发。全球很多公司都已经在商业项目中使用 Flutter，比如Google、微软、阿里、字节、百度、京东等。Flutter 在 Github Star 数已经有150万了， 在跨端框架中排名第一。据官方统计截止到2022年6月，已经有超过50万个商业应用程序是用Flutter建 立的 。Flutter是一个非常值得学习的框架，Flutter不仅具有跨平台、高性能等特点，还具有稳定性的 特点，从2018年12月5日发布的Flutter1.0到后面的所有版本用法都是一样的。 
>
> Flutter 官网：https://flutter.dev/ 
>
> Flutter Packages官网：https://pub.dev/

### Windows上面搭建Flutter Android运 行环境（适用于Flutter3.7.3之后的版本）

提示：Flutter3.7.x之前的版本配置请参考教程，或者参考文档《Flutter Android开发环境搭建，适用于 Flutter3.3.10之前的版本》

**Flutter Android环境搭建**： 

- 电脑上面安装配置JDK （版本 java version "19.0.2" 2023-01-17） 

- 电脑上下载安装Android Studio （版本 2022.1.1 Patch 1)
- 电脑上面下载配置Flutter Sdk （版本 Flutter3.7.3以及Flutter之后的版本） 
- 电脑上配置Flutter国内镜像 
- 运行 flutter doctor命令检测环境是否配置成功，根据提示配置安装对应软件 
- 打开Android Studio 安装Flutter插件 
- 创建运行Flutter项目

### 电脑上面安装配置JDK

#### 下载安装JDK（19.0.2版本）

https://www.oracle.com/java/technologies/downloads/#jdk19-windows

![image-20230521185129413](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185129413.png)

#### 配置JDK（19.0.2版本）

提示：jdk19安装完成后输入java、javac就有提示信息，但是也需要配置环境变量 

1、系统变量 里面新增JAVA_HOME，设置值为java sdk 根目录：

![image-20230521185155379](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185155379.png)

2、系统变量 找到Path 在Path环境变量里面增加如下代码 (提示jdk19无需配置jre) 

;%JAVA_HOME%\bin; 

win10、win11中的配

![image-20230521185223097](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185223097.png)

### 电脑上下载安装Android Studio（2022.1.1 Patch 1）

https://developer.android.google.cn/studio

![image-20230521185259396](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185259396.png)

![image-20230521185308624](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185308624.png)

![image-20230521185317705](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185317705.png)

![image-20230521185326585](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185326585.png)

![image-20230521185335850](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185335850.png)

![image-20230521185344216](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185344216.png)

![image-20230521185353327](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185353327.png)

![image-20230521185402333](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185402333.png)

![image-20230521185421267](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185421267.png)

![image-20230521185432408](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185432408.png)

![image-20230521185443063](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185443063.png)

![image-20230521185452754](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185452754.png)

![image-20230521185501768](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185501768.png)

![image-20230521185510776](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185510776.png)

![image-20230521185521271](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185521271.png)

![image-20230521185530352](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185530352.png)

![image-20230521185539591](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185539591.png)

![image-20230521185550120](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185550120.png)

![image-20230521185601872](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185601872.png)

![image-20230521185611370](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185611370.png)

![image-20230521185619960](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185619960.png)

![image-20230521185629329](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185629329.png)

![image-20230521185638535](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185638535.png)

![image-20230521185648710](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185648710.png)

### 电脑上面下载配置Flutter Sdk（所有版本方法一 样）

#### 1、下载Flutter SDK

https://flutter.dev/docs/development/tools/sdk/releases#windows

2、把下载好的Flutter SDK随便减压到你想安装Sdk的目录

如减压到（F:\flutter_windows\flutter_windows_3.0.4\flutter）

3、把 Flutter安装目录的bin目录配置到环境变量

如上图所示需要把F:\flutter_windows\flutter_windows_3.0.4\flutter\bin目录配置到path环境变量里 面

windows10、windows11

![image-20230521185754146](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185754146.png)

### 电脑上配置Flutter国内镜像

搭建环境过程中要下载很多资源文件，当一些资源下载不了的时候，可能会报各种错误。在国内访问 Flutter的时候有可能会受到限制。Flutter官方为我们提供了国内的镜像

https://flutter.dev/community/china

 https://flutter-io.cn/ 

拉到Flutter中文网最下面有配置方式，把下面两句配置到环境变量里面

```shell
FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
PUB_HOSTED_URL: https://pub.flutter-io.cn
```

![image-20230521185901862](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185901862.png)

Flutter 社区镜像

```
FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
PUB_HOSTED_URL: https://pub.flutter-io.cn
```

清华大学 TUNA 协会镜像

```
FLUTTER_STORAGE_BASE_URL: https://mirrors.tuna.tsinghua.edu.cn/flutter
PUB_HOSTED_URL: https://mirrors.tuna.tsinghua.edu.cn/dart-pub
```

### 运行 flutter doctor命令检测环境是否配置成功

![image-20230521185942816](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521185942816.png)

第一次执行可能会提示下面错误：

#### 错误一：cmdline-tools component is missing

![image-20230521190008612](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190008612.png)

#### 错误二：Visual Studio not installed 如果只是开发 Flutter APP可以忽略此错误信息

![image-20230521190028606](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190028606.png)

#### 错误三： Android Studio Unable to find bundled Java version.

![image-20230521190046144](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190046144.png)

#### Android Studio Unable to find bundled Java version 解决方法：

如果是macOS系统，在jbr同目录下创建一个jre目录，然后将jbr目录内的全部文件复制一份到jre目录下 即可。 如果是Windows系统，jre目录是存在的，不过里面几乎没东西，可以直接将jbr目录内的全部文件复制 一份到jre目录下即可 详情参考：http://bbs.itying.com/topic/63eafd840d0a6c0aecbe5436

#### 错误一的解决方法安装cmdline-tools 以及配置androidlicenses：

安装cmdline-tools

![image-20230521190134950](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190134950.png)

![image-20230521190145714](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190145714.png)

 配置android-licenses

![image-20230521190223815](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190223815.png)

这个时候复制上面红色框框内的命令

```
flutter doctor --android-licenses
```

注意：提示输入Y/N的地方全部输入Y

![image-20230521190248805](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190248805.png)

#### 错误二的解决方法安装Visual Studio ：

Visual Studio主要用于flutter 桌面软件开发，如果您只是开发flutter app可以不用安装Visual Studio

 https://visualstudio.microsoft.com/zh-hans/downloads

![image-20230521190326177](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190326177.png)

如果安装失败可以修改DNS尝试

![image-20230521190343041](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190343041.png)

![image-20230521190354504](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190354504.png)

#### 错误三的解决方法

Android Studio Unable to find bundled Java version 解决方法：

如果是macOS系统，在jbr同目录下创建一个jre目录，然后将jbr目录内的全部文件复制一份到jre目录 下即可。

 如果是Windows系统，jre目录是存在的，不过里面几乎没东西，可以直接将jbr目录内的全部文件复制 一份到jre目录下即可。

![image-20230521190427710](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190427710.png)

详情参考：http://bbs.itying.com/topic/63eafd840d0a6c0aecbe5436

### 打开Android Studio 安装Flutter插件

新版Android Studio配置

![image-20230521190457097](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190457097.png)

![image-20230521190506240](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190506240.png)

![image-20230521190515215](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190515215.png)

![image-20230521190524745](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190524745.png)

![image-20230521190534792](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190534792.png)

提示：新版本android studio也可能是下面界面

![image-20230521190553807](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190553807.png)

![image-20230521190603208](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190603208.png)

### 创建 运行Flutter项目

![image-20230521190649536](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190649536.png)

![image-20230521190658249](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190658249.png)

![image-20230521190707647](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190707647.png)

![image-20230521190716559](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190716559.png)

![image-20230521190725511](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190725511.png)

通过 flutter devices 可以检测检测可用的设备

![image-20230521190744303](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190744303.png)

### 可能遇到的错误

#### 导入项目提示Gradle相关错误

![image-20230521190809598](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521190809598.png)



### Flutter Android真机调试

必备条件： 

1、准备一台Android手机 

2、手机需要开启调试模式 

3、用数据线把手机连上电脑 

4、手机要允许电脑进行Usb调试 

5、手机对应的sdk版本必须安装 

注意： 

1、关闭电脑上面的手机助手比如：360手机助手、应用宝等占用adb端口的软件 

2、关闭HBuilder之类占用Adb端口的软件 

3、数据线一定要可用（可以用360手机助手检测）

### Flutter虚拟机模拟器调试

必备条件： 

1、准备虚拟机模拟器，虚拟机模拟器可以是Android Studio自带的模拟器，也可以是第三方模拟器。 

2、模拟器安装好后需要打开

注意： 1、关闭电脑上面的手机助手比如：360手机助手、应用宝等占用adb端口的软件 2、关闭HBuilder之类占用Adb端口的软件

#### 使用Android Studio自带模拟器

![image-20230521191040639](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191040639.png)

![image-20230521191049574](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191049574.png)

![image-20230521191057944](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191057944.png)

![image-20230521191106080](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191106080.png)

![image-20230521191115247](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191115247.png)

![image-20230521191122800](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191122800.png)

![image-20230521191131241](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191131241.png)

![image-20230521191140641](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191140641.png)

![image-20230521191149136](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191149136.png)

![image-20230521191202124](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191202124.png)

## 创建flutter项目的方式

### 一、使用Android studio

### 二、使用命令行

```shell
flutter create <project name>
```

## Vscode中开发 运行Flutter应用

> 如果你习惯用Android Studio的话可以直接用Android Studio直接开发Flutter。但是Android Studio比 较耗费电脑资源，所以这里我们推荐使用Vscode

### Vscode中安装Flutter插件 Dart插件。

![image-20230521191642686](https://gitee.com/sun-chaoqun/image-bed/raw/master/notepad/image-20230521191642686.png)

### Vscode中打开flutter项目进行开发

注意：定位到项目目录，不需要定位到项目目录对应的android目录



### 运行Flutter项目、热加载Flutter项目

```
flutter run
flutter run -d all

Flutter run key commands.
r Hot reload.
R Hot restart.
h List all available interactive commands.
d Detach (terminate "flutter run" but leave application running).
c Clear the screen
q Quit (terminate the application on the device).

```

常用的快捷键 

r 键 ：点击后热加载，也就算是重新加载吧。 

R键：热重启项目。 

p 键：显示网格，这个可以很好的掌握布局情况，工作中很有用。 

o 键：切换android和ios的预览模式。 

q 键：退出调试预览模式。

查看设备

```
flutter devices
```

运行在所有的设备

```
flutter run -d all
```

指定设备运行

```
flutter run -d chrome
```