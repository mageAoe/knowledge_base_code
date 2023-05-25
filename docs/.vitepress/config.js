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
  themeConfig: {
    siteTitle: "knowledge base",
    nav: [
      { text: "指南", link: "/guild/installation" },
      { text: "框架", link: "/framework/index" },
      { text: "博客", link: "/blog/index" },
      { text: "方法", link: "/func/index" },
      { text: "面试", link: "/interview/index" },
      { text: "算法", link: "/algorithm/index" },
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
  },
};