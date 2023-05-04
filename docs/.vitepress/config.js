export default {
  title: 'knowledge base',
  titleTemplate: '知识库',
  description: 'Just playing around.',
  base: process.env.NODE_ENV === 'production' ? '/knowledge_base_ui/' : '/',
  themeConfig: {
    siteTitle: "knowledge base",
    nav: [
      { text: "指南", link: "/guild/installation" },
      { text: "框架", link: "/framework/index" },
      { text: "博客", link: "/blog/index" },
      { text: "方法", link: "/func/index" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/mageAoe/knowledge_base_ui" },
    ],
    sidebar: {
        "/guild/": [
            {
                text: "基础",
                items: [
                    {
                        text: "安装",
                        link: "/guild/installation",
                    },
                    {
                        text: "快速开始",
                        link: "/guild/quickstart",
                    },
                ],
            },
            {
                text: "进阶",
                items: [
                    {
                        text: "xx",
                        link: "/xx",
                    },
                ],
            },
        ],
        "/components/": [
            {
                text: "基础组件",
                items: [
                    {
                        text: "Button",
                        link: "/components/button",
                    }
                ],
            }
        ],
        "/blog":[
            {
                text: "文章",
                items: [
                    {
                        text: "VUE2",
                        link: "/blog/Vue2",
                    }
                ],
            }
        ],
        "/framework":[
            {
                text: "框架",
                items: [
                    {
                        text: "VUE2",
                        link: "/framework/vue2/index",
                    },
                    {
                        text: "VUE3",
                        link: "/framework/vue3/index",
                    },
                    {
                        text: "eslint",
                        link: "/framework/eslint/index",
                    },
                    {
                        text: "uni-app",
                        link: "/framework/uni-app/index",
                    }
                ],
            }
        ]
    },
    footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2019-present Evan You'
      },
  },
};