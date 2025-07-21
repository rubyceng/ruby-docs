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
  - title: "About Me"
    icon: "😈"
    details: 夜晚的水母不会游泳.
    link: /about/关于我.md

  - title: "Tech Stack"
    icon: "💻"
    details: 相关的技术堆栈学习记录.
    link: /guide/技术堆栈/Flutter/Flutter学习记录

  - title: "Beyond Code"
    icon: "🌍"
    details: 在代码之外，在世界之内.
    link: /beyond_code/MacOS个人配置
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
