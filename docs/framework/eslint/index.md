## 配置 eslint 去掉 no-unused-vars 报错 方法汇总

1. vue.config.js 中增加 lintOnSave: false
2. package.json -> eslintConfig ->rules ->

```json
{
	  "no-": "off",
      "no-debugger":"off",
      "no-console": "off",
      "no-empty":"off",
      "no-unused-vars":"off"
}
```

3:新建 .eslintrc.json

```json
{
    "rules": {
        "no-unused-vars": 0
    }
}
```