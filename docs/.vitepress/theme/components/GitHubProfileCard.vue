<script setup>
import { inject, ref, onMounted } from "vue";

const profileLoader = inject("github-profile");
const profile = ref({});

onMounted(async () => {
  if (profileLoader && typeof profileLoader.load === "function") {
    profile.value = await profileLoader.load();
  }
});
</script>

<template>
  <div v-if="profile.login" class="github-profile-card">
    <a :href="profile.html_url" target="_blank" rel="noopener noreferrer">
      <img :src="profile.avatar_url" alt="GitHub Avatar" class="avatar" />
    </a>
    <div class="info">
      <a :href="profile.html_url" target="_blank" rel="noopener noreferrer">
        <h2 class="name">{{ profile.name }} (@{{ profile.login }})</h2>
      </a>
      <p class="bio">{{ profile.bio }}</p>
      <div class="stats">
        <span>🏢 {{ profile.company || "N/A" }}</span>
        <span>📍 {{ profile.location || "N/A" }}</span>
        <span
          >🧑‍🤝‍🧑 <strong>{{ profile.followers }}</strong> followers ·
          <strong>{{ profile.following }}</strong> following</span
        >
        <span
          >📦 <strong>{{ profile.public_repos }}</strong> public repos</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  margin: 20px 0;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.info {
  display: flex;
  flex-direction: column;
}
.name {
  margin: 0;
  font-size: 1.5em;
  border: none;
  padding: 0;
}
.bio {
  margin: 5px 0 15px;
  color: var(--vp-c-text-2);
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 0.9em;
}
</style>
