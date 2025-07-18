<template>
  <div v-if="readmeHtml" v-html="readmeHtml" class="github-profile-readme"></div>
  <div v-else>Loading GitHub Profile README...</div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import MarkdownIt from 'markdown-it';

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
/* Add some basic styling to match VitePress */
.github-profile-readme {
  font-family: var(--vp-font-family-base);
}
.github-profile-readme h1,
.github-profile-readme h2,
.github-profile-readme h3 {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.3em;
}
</style>
