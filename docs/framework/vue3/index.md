## VUE3

### V-memo



### vue.config.js 中publicPath

1. 首先在根目录下建立一个.env的文件

   ```
   VUE_APP_PATH = './'
   ```

2. 修改vue.config.js 文件的publicPath属性

```js
publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_PATH : "/",
```

3. 这样就能实现   生产环境与开发环境下的 运行