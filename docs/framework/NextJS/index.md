# NextJS

## 创建项目

可以使用官方脚手架创建项目。默认使用js文件，截止当前使用的版本是Nextjs 13+。

```shell
npx create-next-app@latest
# or
yarn create next-app
```
更推荐的是使用typescript加持下的项目。有更好的开发体验和对项目更高的掌控力。

```shell
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
```
项目核心依赖库next、react、react-dom三个库。


可以看到，在创建新项目的过程中会询问几个选项：

项目名称，这里输入nextjs-demo。
项目是否需要使用ESLint。
是否需要在项目中使用src目录，默认会吧所有文件放在根目录，为了方便开发，这里启用src目录。
是否启用app目录，默认会放一些框架相关的东西。这里启用之后会在app目录中生成首页内容。
是否启用别名，方便使用，直接启用了。

## 项目介绍

1. .next目录。这是Nextjs的缓存目录，在执行dev或者build等命令的时候，会在本地项目的根目录下生成此目录，开发不需要关注。想要了解更多的可以稍微研究一下，使用缓存/已生成的方式加速编译。
2. .vscode目录。看名字就知道，这个是vscode编辑器使用到的配置目录。
3. node_modules目录。这是三方依赖的目录，这里不多介绍。
4. public目录。这个主要放置静态资源，默认没有二级目录，为了方便可以简单创建几个目录来放相关资源。默认路径是在根目录，使用的时候可以使用类似/favicon.ico的形式引用。
5. src目录。这个目录是主要源代码的位置，初始目录下有app默认页和pages其他页面目录。在pages目录下还有一个默认api目录，主要放置Nextjs提供的服务端API。可以简单看一下默认提供的hello.ts文件内容。
6. .eslintrc.json。主要是eslint的规则。
7. .gitignore。git排除文件。
8. next-env.d.ts。nextjs的一些ts相关内容，目前只有默认引用。
9. next.config.js。Nextjs的配置文件，这里默认只有appDir参数。
10. package-lock.json。项目依赖lock文件。
11. package.json。项目npm相关文件。
12. README.md。文档说明。
13. tsconfig.json。typescript相关配置文件

