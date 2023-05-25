# vue 项目中  jsconfig.json 概念 及 使用步骤

## vue项目中 jsconfig.json概念及使用步骤

### vue项目中 jsconfig.json是什么

> 当您在工作空间中有一个定义项目上下文的jsconfig.json文件时，JavaScript体验会得到改进

### 概述

目录中存在tsconfig.json文件表明该目录是 TypeScript 项目的根目录。该tsconfig.json文件指定编译项目所需的根文件和编译器选项。

JavaScript 项目可以使用jsconfig.json文件来代替，它的作用几乎相同，但默认启用了一些与 JavaScript 相关的编译器标志

### 一、使用tsconfig.json或jsconfig.json

```js
jsconfig.json源于tsconfig.json，是TypeScript的配置文件。
jsconfig.json相当于tsconfig.json的“allowJs”属性设置为true
```
### 二、使用步骤

> 1. 配置说明
```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            // 解决项目中使用@作为路径别名，导致vscode无法跳转文件的问题
            "@/*": ["src/*"]
        },
        // 解决prettier对于装饰器语法的警告
        "experimentalDecorators": true,
        // 解决.jsx文件无法快速跳转的问题
        "jsx": "preserve"
    },
    //提高 IDE 性能
    "exclude": ["node_modules", "dist", "build"]
}

```
在这里特别说明一下 exclude 为什么 提高 编译器 性能 ？
如果开发的项目根目录下没有 jsconfig.json，在默认情况下，像 VS Code， 默认只会把 node_modules文件夹排除掉。
**官方给出建议是这样的**：

> 只要有可能，您应该使用不属于项目源代码的JavaScript文件排除文件夹

意思就是 与开发无关的文件可以让 IDE 全部在编译时排除掉，像上面的配置中就排除了，构建过程依赖文件（node_modules）和生成的文件(dist 目录) 排除这些文件，可以提高 vscode 的性能

> 2. 配置 webpack 别名
作为新手的你，是否遇到够这种情况：无数次的 …/ …/ …/ 早已让你眼花缭乱。

现在它来了，你需要配置paths ：
```json
"paths": {
      "@/*": ["src/*"]
    }
```
用 @ 代替 项目中 src目录，我们在 src 目录下 找 components 就简单多了

> 3. compilerOptions配置

|  属性    |  描述    |      
| ----     | ---- |
|   nolib   |   不要包含默认的库文件(lib.d.ts)   |      
|   target|   指定要使用的默认库(lib.d.ts)。值为 “es3”，"es5""es6""es2015”"es2016”，"es2017”，"es2018”，"es2019"，"es2020”，"esnext"   |      
|   module   | 在生成模块代码时指定模块系统。值为 ”amd”、”commonJS"，”es2015"，"es6"，”esnext"，”none"，"system"，"umd"     |      
|   moduleResolution   |   指定如何解析导入模块。值为“node”和“classic'   |      
|   checkJs   |   启用 JavaScript 文件的类型检查   |      
|   experimentalDecorators   |   为提议的 ES 装饰器提供实验支持   |      
|   allowSyntheticDefaultlmports   |  允许从没有默认导出的模块进行默认导入。这不影响代码，只是进行类型检查    |      
|   baseUr   |  指定模块基础目录    |      
|   paths   |  指定相对于模块路径别名映射    |      