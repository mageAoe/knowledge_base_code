## quickstart

### 全局注册

``` js
import succinctUi from "succinct-ui";

const app = createApp(App);

app.use(succinctUi).mount("#app");
```

### 按需引入

```js
<template>
  <div>
    <s-button type="primary">主要按钮</s-button>
  </div>
</template>

<script lang="ts" setup>
import { SButton } from "succinct-ui";
</script>
```


## Button 按钮

<s-button>默认按钮</s-button>

<s-button type="primary">主要按钮</s-button>

::: details 显示代码

```html
<ea-button>默认按钮</ea-button>

<ea-button type="primary">默认按钮</ea-button>
```

:::