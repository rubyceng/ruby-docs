import DefaultTheme from "vitepress/theme";
import GitHubProfileCard from "./components/GitHubProfileCard.vue";
import GitHubProfileReadme from "./components/GitHubProfileReadme.vue";
import "./custom.css";
import profileLoader from "./integrations/githubProfile.js";
import readmeLoader from "./integrations/githubReadmeLoader.js";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("GitHubProfileCard", GitHubProfileCard);
    app.component("GitHubProfileReadme", GitHubProfileReadme);

    // 将加载的数据作为全局提供
    app.provide("github-profile", profileLoader);
    app.provide("github-readme-loader", readmeLoader);
  },
};
