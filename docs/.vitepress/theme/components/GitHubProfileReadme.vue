<template>
  <div
    v-if="readmeHtml"
    v-html="readmeHtml"
    class="github-profile-readme"
  ></div>
  <div v-else>Loading GitHub Profile README...</div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import { inject, onMounted, ref } from "vue";

const readmeLoader = inject("github-readme-loader");
const readmeHtml = ref("");
const md = new MarkdownIt();

onMounted(async () => {
  if (readmeLoader && typeof readmeLoader.load === "function") {
    const data = await readmeLoader.load();
    if (data.content) {
      readmeHtml.value = md.render(data.content);
    }
  }
});
</script>

<style>
/* 注意这里去掉了 scoped，因为 v-html 的内容需要全局样式 */
.github-profile-readme {
  font-family: var(--vp-font-family-base);
}

.github-profile-readme h1,
.github-profile-readme h2,
.github-profile-readme h3 {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.3em;
}

/* 徽章图片样式 - 这里是关键修复 */
.github-profile-readme img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 3px 8px 3px 0 !important; /* 增加 !important 确保生效 */
  display: inline-block;
  vertical-align: middle;
}

/* 段落中的图片间距 */
.github-profile-readme p img {
  margin-right: 8px !important;
  margin-top: 4px !important;
  margin-bottom: 4px !important;
}

/* 段落中最后一个图片 */
.github-profile-readme p img:last-child {
  margin-right: 0 !important;
}

/* 增加段落行高以适应徽章 */
.github-profile-readme p {
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.8;
}
</style>
