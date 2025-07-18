---
layout: home

hero:
  name: "Ruby's Knowledge Base"
  tagline: A personal collection of notes, guides, and thoughts.
  image:
    src: /avatar.png
    alt: Ruby's Avatar
  actions:
    - theme: brand
      text: Get Started
      link: /about/关于我.md
    - theme: alt
      text: View on GitHub
      link: https://github.com/rubyceng

features:
  - title: "Tech Stack"
    icon: "💻"
    details: In-depth guides and notes on TypeScript, Flutter, Prisma, and more.
    link: /guide/技术堆栈/Flutter/Flutter学习记录
  - title: "Architecture"
    icon: "🏗️"
    details: Best practices on DDD, ORM design patterns, and building robust systems.
    link: /guide/架构设计/ORM设计模式：Active Record 和 Data Mapper
  - title: "Networking & Ops"
    icon: "🌐"
    details: From TCP/IP fundamentals to NGINX/SSL configurations.
    link: /guide/计算机网络/深入浅出：从 TCP 到 HTTP，再到 HTTPS 的演进之路
---

<style>
/* 头像圆形和背景高光效果 */
.VPHero .image {
  position: relative !important;
}

.VPHero .image .VPImage {
  border-radius: 50% !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 
              0 0 40px rgba(var(--vp-c-brand-rgb), 0.3) !important;
  border: 5px solid rgb(168, 177, 255) !important;
}

</style>
