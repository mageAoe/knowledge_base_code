# VUE 使用iconfont 动态加载不转义的问题

## 手牵手教学

- 我们正常使用图片是这种class的形式

```js
<i class="iconfont icon-xxx"></i>
```

- 但是万一我们的图标是后台返回的，而不是写死的，那么这种class写法不行了，得使用```unicode```

- 那么正常我们使用是这样

```js
<i class="iconfont">&#x33;</i>
```

- 而要动态的渲染，肯定是

```
<i class="iconfont">{{ xxx }}</i>
```

但是vue并不能识别，所以我们需要手动更改一下

> 将下载的 iconfont.css里面的图片前面加个 ```\u```

```js
// 示例
.icon-money:before {
  content: '\ue663';
}
```

然后使用时

```
    meta: {
      unicode: '\ue663',
      title: '管理',
    }
```
