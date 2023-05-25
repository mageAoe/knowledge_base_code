# vue3+vite+ts：使用@符号，找不到模块

## 报错问题

> 情况说明：在.vue后缀的文件中 导入.vue组件
> import Drawers from '@/components/Drawer/index.vue'
> 找不到模块“../../../../components/Drawer/index”或其相应的类型声明

## 解决办法

#### 第一步

- 配置vite.config.ts
```js
import { resolve } from 'path'

resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, './src')
      }
 }
```

#### 第二步

- 在文件的根目录下 新建一个 ```env.d.ts```的文件

```js
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

```

#### 第三步

- 修改 ```tsconfig.json``` 文件

```js
  "compilerOptions": {
    "paths": {
      "@": ["src"],
      "@/*": ["./src/*"]
    }
  }
```

- 最后就不报错了
![](https://img2023.cnblogs.com/blog/2450634/202303/2450634-20230322161358894-531250427.png)


## 补充

- vscode在引入文件时默认是不会加上 ```.vue ```后缀的
- 如果不想用上面的方法，就得这样写
```js  
import Drawer from '../../../../components/Drawer/index.vue'
```
