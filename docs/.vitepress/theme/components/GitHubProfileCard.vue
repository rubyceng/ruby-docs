<script setup>
import { inject, onMounted, ref } from "vue";
import GitHubContributionChart from "./GitHubContributionChart.vue";
import GitHubProfileReadme from "./GitHubProfileReadme.vue";

const profileLoader = inject("github-profile");
const profile = ref({});

onMounted(async () => {
  if (profileLoader && typeof profileLoader.load === "function") {
    profile.value = await profileLoader.load();
  }
});

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 格式化数字
const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num;
};

// 语言颜色映射
const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Vue: "#41b883",
  React: "#61dafb",
  HTML: "#e34c26",
  CSS: "#1572b6",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#777bb4",
  Ruby: "#701516",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};
</script>

<template>
  <div v-if="profile.login" class="github-profile-card">
    <!-- 头像和基本信息 -->
    <div class="profile-header">
      <div class="avatar-container">
        <a :href="profile.html_url" target="_blank" rel="noopener noreferrer">
          <img :src="profile.avatar_url" alt="GitHub Avatar" class="avatar" />
        </a>
      </div>

      <div class="basic-info">
        <a
          :href="profile.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="name-link"
        >
          <h2 class="name">{{ profile.name || profile.login }}</h2>
          <p class="username">@{{ profile.login }}</p>
        </a>

        <p v-if="profile.bio" class="bio">{{ profile.bio }}</p>

        <!-- 位置和公司信息 -->
        <div class="details">
          <span v-if="profile.company" class="detail-item">
            <svg class="icon" viewBox="0 0 16 16">
              <path
                d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-8.5Z"
              />
              <path
                d="M3.75 2.5a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-6.5Z"
              />
            </svg>
            {{ profile.company }}
          </span>

          <span v-if="profile.location" class="detail-item">
            <svg class="icon" viewBox="0 0 16 16">
              <path
                d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"
              />
            </svg>
            {{ profile.location }}
          </span>

          <span v-if="profile.blog" class="detail-item">
            <svg class="icon" viewBox="0 0 16 16">
              <path
                d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25Zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0Z"
              />
            </svg>
            <a :href="profile.blog" target="_blank" rel="noopener noreferrer">{{
              profile.blog
            }}</a>
          </span>

          <span class="detail-item">
            <svg class="icon" viewBox="0 0 16 16">
              <path
                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"
              />
            </svg>
            加入于 {{ formatDate(profile.created_at) }}
          </span>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="stats-section">
      <div class="stat-item">
        <div class="stat-number">{{ formatNumber(profile.followers) }}</div>
        <div class="stat-label">Followers</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ formatNumber(profile.following) }}</div>
        <div class="stat-label">Following</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ formatNumber(profile.public_repos) }}</div>
        <div class="stat-label">Repositories</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ formatNumber(profile.public_gists) }}</div>
        <div class="stat-label">Gists</div>
      </div>
    </div>

    <!-- 最常用语言 -->
    <div
      v-if="profile.topLanguages && profile.topLanguages.length > 0"
      class="languages-section"
    >
      <h3 class="section-title">最常用语言</h3>
      <div class="languages">
        <span
          v-for="lang in profile.topLanguages"
          :key="lang"
          class="language-tag"
          :style="{ '--lang-color': languageColors[lang] || '#586069' }"
        >
          {{ lang }}
        </span>
      </div>
    </div>

    <!-- Profile Readme -->
    <GitHubProfileReadme />


    <!-- 最近仓库 -->
    <div v-if="profile.repos && profile.repos.length > 0" class="repos-section">
      <h3 class="section-title">最近更新的仓库</h3>
      <div class="repos">
        <a
          v-for="repo in profile.repos"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="repo-item"
        >
          <div class="repo-header">
            <svg class="repo-icon" viewBox="0 0 16 16">
              <path
                d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8zM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25z"
              />
            </svg>
            <span class="repo-name">{{ repo.name }}</span>
          </div>
          <p v-if="repo.description" class="repo-description">
            {{ repo.description }}
          </p>
          <div class="repo-meta">
            <span v-if="repo.language" class="repo-language">
              <span
                class="language-dot"
                :style="{
                  backgroundColor: languageColors[repo.language] || '#586069',
                }"
              ></span>
              {{ repo.language }}
            </span>
            <span v-if="repo.stargazers_count > 0" class="repo-stars">
              <svg class="star-icon" viewBox="0 0 16 16">
                <path
                  d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"
                />
              </svg>
              {{ repo.stargazers_count }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-profile-card {
  background: linear-gradient(
    135deg,
    var(--vp-c-bg-soft) 0%,
    var(--vp-c-bg-mute) 100%
  );
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.github-profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.profile-header {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.avatar-container {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid var(--vp-c-brand);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-bg);
  background-color: var(--vp-c-text-3);
}

.status-indicator.online {
  background-color: #28a745;
}

.basic-info {
  flex: 1;
}

.name-link {
  text-decoration: none;
  color: inherit;
}

.name {
  margin: 0 0 4px 0;
  font-size: 1.8em;
  font-weight: 700;
  color: var(--vp-c-text-1);
  transition: color 0.3s ease;
}

.name-link:hover .name {
  color: var(--vp-c-brand);
}

.username {
  margin: 0 0 12px 0;
  font-size: 1.2em;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.bio {
  margin: 0 0 16px 0;
  font-size: 1.1em;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95em;
  color: var(--vp-c-text-2);
}

.icon {
  width: 16px;
  height: 16px;
  fill: var(--vp-c-text-3);
}

.detail-item a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.detail-item a:hover {
  text-decoration: underline;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 24px;
  background: var(--vp-c-bg);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.8em;
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 1.2em;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.languages-section {
  margin-bottom: 24px;
}

.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.language-tag {
  padding: 6px 12px;
  background: var(--lang-color);
  color: white;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.repos-section {
  margin-bottom: 16px;
}

.repos {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.repo-item {
  display: block;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
}

.repo-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateX(4px);
}

.repo-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.repo-icon {
  width: 16px;
  height: 16px;
  fill: var(--vp-c-text-3);
}

.repo-name {
  font-weight: 600;
  color: var(--vp-c-brand);
  font-size: 1.1em;
}

.repo-description {
  margin: 0 0 12px 0;
  color: var(--vp-c-text-2);
  font-size: 0.95em;
  line-height: 1.5;
}

.repo-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.85em;
  color: var(--vp-c-text-3);
}

.repo-language {
  display: flex;
  align-items: center;
  gap: 6px;
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.repo-stars {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  width: 14px;
  height: 14px;
  fill: var(--vp-c-text-3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .stats-section {
    flex-wrap: wrap;
  }

  .stat-item {
    flex: 1;
    min-width: 80px;
  }
}
</style>
