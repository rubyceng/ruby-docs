export default {
  async load() {
    const GITHUB_USERNAME = "rubyceng";
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const headers = {};
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    try {
      // 获取用户基本信息
      const userResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
        { headers }
      );

      if (!userResponse.ok) {
        console.error(
          `Failed to fetch GitHub profile for ${GITHUB_USERNAME}. Status: ${userResponse.status}`
        );
        return {};
      }

      const userData = await userResponse.json();

      // 获取用户的仓库信息
      const reposResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
        { headers }
      );

      let repos = [];
      if (reposResponse.ok) {
        repos = await reposResponse.json();
      }

      // 获取贡献数据（使用 GitHub Events API 作为替代）
      const eventsResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`,
        { headers }
      );

      let contributions = [];
      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        contributions = processEventsToContributions(events);
      }

      // 计算最常用的语言
      const languages = {};
      repos.forEach((repo) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      const topLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([lang]) => lang);

      return {
        ...userData,
        topLanguages,
        repos: repos.slice(0, 3),
        contributions,
      };
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      return {};
    }
  },
};

// 处理事件数据为贡献数据
function processEventsToContributions(events) {
  const contributions = {};
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );

  events.forEach((event) => {
    const eventDate = new Date(event.created_at);
    if (eventDate >= oneYearAgo) {
      const dateKey = eventDate.toISOString().split("T")[0];
      contributions[dateKey] = (contributions[dateKey] || 0) + 1;
    }
  });

  return contributions;
}
