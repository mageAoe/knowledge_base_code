import guild from './guild'
import blog from './blog'
import func from './func'
import interview from './interview'
import framework from './framework'
import algorithm from './algorithm'
export default {
  title: 'knowledge base',
  titleTemplate: '知识库',
  description: 'Just playing around.',
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  markdown: {
    lineNumbers: true, //显示代码行数
  },
  themeConfig: {
    outlineTitle: 'In hac pagina',
    siteTitle: "knowledge base",
    nav: [
      { text: "指南", link: "/guild/installation" },
      { text: "框架", link: "/framework/index" },
      { text: "博客", link: "/blog/index" },
      { text: "方法", link: "/func/index" },
      { text: "面试", link: "/interview/index" },
      { text: "算法", link: "/algorithm/index" },
      { text: "flutter", link: "/flutter/index" },
      { text: "reactNative", link: "/reactNative/index" },
      { text: "java", link: "/java/index" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/mageAoe/knowledge_base_code" },
    ],
    sidebar: {
        "/guild/": guild,
        "/blog":blog,
        "/framework": framework,
        "/func": func,
        "/interview": interview,
        "/algorithm":  algorithm
    },
    footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2019-present Evan You'
      },
    docFooter: { //上下篇文本
        prev: '上一篇',
        next: '下一篇'
      }
  },
};