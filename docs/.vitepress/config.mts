import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ruby's Site",
  description: "A personal collection of notes, guides, and thoughts.",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "preload",
        href: "/assets/inter-roman-latin.Di8DUHzh.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "🏠 Home", link: "/" },
      { text: "👤 About", link: "/about/关于我" },
      {
        text: "💻 Beyond Code",
        items: [{ text: "MacOS个人配置", link: "/Beyond Code/MacOS个人配置" }],
      },
      {
        text: "🤖 AI",
        items: [{ text: "Prompt记录", link: "/AI/Prompt记录" }],
      },
      {
        text: "📖 Knowledge Base",
        items: [
          {
            text: "计算机网络",
            link: "/guide/计算机网络/深入浅出：从 TCP 到 HTTP，再到 HTTPS 的演进之路",
          },
          {
            text: "技术堆栈",
            link: "/guide/技术堆栈/Flutter/Flutter学习记录",
          },
          {
            text: "架构设计",
            link: "/guide/架构设计/ORM设计模式：Active Record 和 Data Mapper",
          },
          {
            text: "数据库",
            link: "/guide/数据库/高并发下的竞态插入问题",
          },
          { text: "运维", link: "/guide/运维/NGINX与SSL证书的相关配置" },
        ],
      },
    ],

    sidebar: {
      "/AI/": [
        {
          text: "AI",
          base: "/AI/",
          items: [{ text: "Prompt记录", link: "Prompt记录" }],
        },
      ],
      "/Beyond Code/": [
        {
          text: "Beyond Code",
          base: "/Beyond Code/",
          items: [{ text: "MacOS个人配置", link: "MacOS个人配置" }],
        },
      ],
      "/guide/计算机网络/": [
        {
          text: "计算机网络",
          base: "/guide/计算机网络/",
          items: [
            {
              text: "TCP/HTTP/HTTPS 演进之路",
              link: "深入浅���：从 TCP 到 HTTP，再到 HTTPS 的演进之路",
            },
          ],
        },
      ],
      "/guide/技术堆栈/": [
        {
          text: "技术堆栈",
          items: [
            {
              text: "Flutter",
              base: "/guide/技术堆栈/Flutter/",
              collapsed: false,
              items: [{ text: "Flutter学习记录", link: "Flutter学习记录" }],
            },
            {
              text: "TypeScript",
              base: "/guide/技术堆栈/TypeScript/",
              collapsed: false,
              items: [
                {
                  text: "Prisma 实战指南(一)：从零到一",
                  link: "🚀 一、 Prisma 实战指南：从零到一，优雅地构建与演进 NestJS 应用",
                },
                {
                  text: "Prisma 实战指南(二)：迁移文件",
                  link: "🚀 二、Prisma 实战指南：为什么历史迁移文件是神圣不可侵犯的？",
                },
                {
                  text: "Prisma 实战指南(三)：声明式迁移",
                  link: "🚀 三、Prisma 实战指南：现代声明式迁移 vs. 传统ORM开发流程",
                },
                {
                  text: "Prisma 实战指南(四)：DDD项目模版",
                  link: "🚀 四、Prisma 实战指南：构建基于NestJS+Prisma的DDD项目模版",
                },
              ],
            },
          ],
        },
      ],
      "/guide/架构设计/": [
        {
          text: "架构设计",
          base: "/guide/架构设计/",
          items: [
            {
              text: "DDD领域驱动设计架构",
              link: "🐳 构建一个健壮的DDD领域驱动设计架构",
            },
            {
              text: "ORM设计模式",
              link: "ORM设计模式：Active Record 和 Data Mapper",
            },
          ],
        },
      ],

      "/guide/数据库/": [
        {
          text: "数据���",
          base: "/guide/数据库/",
          items: [
            {
              text: "高并发下的竞态插入问题",
              link: "高并发下的竞态插入问题",
            },
            {
              text: "事务的四种隔离级别",
              link: "数据库中事务的四种隔离级别",
            },
          ],
        },
      ],
      "/guide/运维/": [
        {
          text: "运维",
          base: "/guide/运维/",
          items: [
            {
              text: "NGINX与SSL证书配置",
              link: "NGINX与SSL证书的相关配置",
            },
            {
              text: "数据安全加密",
              link: "如何使用完善的加密算法对数据安全进行保障",
            },
          ],
        },
      ],
    },

    // --- NEW CONFIGURATIONS ---
    // Search
    search: {
      provider: "local",
    },

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    // --- END OF NEW CONFIGURATIONS ---

    socialLinks: [{ icon: "github", link: "https://github.com/rubyceng" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present Ruby",
    },
  },

  vite: {
    plugins: [
      // {
      //   name: "vite-plugin-obsidian",
      //   apply: "build",
      //   config: () => ({
      //     build: {
      //       rollupOptions: {
      //         input: {},
      //       },
      //     },
      //   }),
      // },
    ],
  },
});
