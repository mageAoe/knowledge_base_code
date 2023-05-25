# 线上预览word、pdf

> 在预览线上之前还得补习一下别的知识
> 在使用url进行参数传递时，经常会传递一些中文名的参数或URL地址，在后台处理时会发生转换错误.在有些传递页面使用GB2312，而在接收页面使用UTF8，这样接收到的参数就可能会与原来发生不一致。使用服务器端的urlEncode函数编码的URL，与使用客户端javascript的encodeURI函数编码的URL，结果就不一样。

```JavaScript对文字进行编码涉及3个函数：escape,encodeURI,encodeURIComponent，相应3个解码函数：unescape,decodeURI,decodeURIComponent```

## 线上预览word

> 过调用微软的在线预览功能实现

```js
// 例子
https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fiot.tronsystem.com%2Fgroup1%2Fpublic-communication%2Fchat%2F2022%2F04%2F19%2F15%2F345.docx&wdOrigin=BROWSELINK
```

src后面拼接的就是你要预览的word地址，```建议用https```，我使用http一直未成功

## 在线预览pdf

pdf文件理论上可以在浏览器直接打开预览但是需要打开新页面。在仅仅是预览pdf文件且UI要求不高的情况下可以直接通过window.open 让浏览器帮你实现

```js
window.open('http://www.hgyx91.com/upload/editor/attached/file/20201007/20201007093754_53.pdf')
```

然后有一些文件就不支持，而是直接下载下来了

```js
window.open('https://iot.tronsystem.com/group1/default/20221104/16/37/7/1-%E8%B6%85%E5%A3%B0%E8%B4%A8%E6%8E%A7-%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA.pdf')
```

那么就只能使用 ```PDF.js```来实现预览了

PDF.js可以实现在html下直接浏览pdf文档，是一款开源的pdf文档读取解析插件，非常强大，能将PDF文件渲染成Canvas。PDF.js主要包含两个库文件，一个pdf.js和一个pdf.worker.js，一个负责API解析，一个负责核心解析。


#### 扩展

> pdf链接通过浏览器打开时，有时可以直接预览，有时却是下载，为什么？


在前端开发中，有时候需要对一些文件链接进行特殊处理，比如对于一些图片链接或者PDF链接，有时我们需要通过浏览器打开进行预览，有时又不希望通过浏览器进行打开，而是希望能够直接下载到本地。但现实效果却往往跟我们相反，我们希望浏览器打开时，他却直接下载，我们希望浏览器下载时，他反而又在新的标签页直接打开文件。

其实造成这种情况，和响应头里 content-disposition 的属性值有关， content-disposition 是 MIME 协议的扩展 ，其作用就是用来处理一些文件的显示问题， content-disposition的值为inline时，表示它可以显示在网页内，或作为网页，此时浏览器会自动进行预览， content-disposition的值为attachment时，表示它应该下载，大多数浏览器呈现“另存为”对话框，如果filename存在值，也会预填入文件名。

了解了相关原理，就很好实现自己想要的方式了。如果只是针对个人电脑，可以通过下载一些浏览器插件，通过更改响应头 content-disposition的值，进而实现自己想要的效果，但是如果是发布到生产，供其他用户使用，就需要要求后端开发按照自己的需求配置相关文件响应头中content-disposition的值，因为不可能要求每个用户都去安装相应的插件。

![](https://img2023.cnblogs.com/blog/2450634/202302/2450634-20230210132014269-513901823.png)

了解了相关原理，就很好实现自己想要的方式了。如果只是针对个人电脑，可以通过下载一些浏览器插件，通过更改响应头 content-disposition的值，进而实现自己想要的效果，但是如果是发布到生产，供其他用户使用，就需要要求```后端开发```按照自己的需求配置相关文件响应头中content-disposition的值，因为不可能要求每个用户都去安装相应的插件
