import DefaultTheme from "vitepress/theme";
import GitHubProfileCard from "./components/GitHubProfileCard.vue";
import "./custom.css";
import profileLoader from "./integrations/githubProfile.js";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("GitHubProfileCard", GitHubProfileCard);
    // 将加载的数据作为全局提供
    app.provide("github-profile", profileLoader);
  },
};
