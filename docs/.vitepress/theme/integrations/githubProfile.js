export default {
  async load() {
    const GITHUB_USERNAME = "rubyceng";
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const headers = {};
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}`,
        { headers }
      );

      console.log(response);

      if (!response.ok) {
        console.error(
          `Failed to fetch GitHub profile for ${GITHUB_USERNAME}. Status: ${response.status}`
        );
        return {};
      }

      // 将返回的 JSON 数据作为结果
      return response.json();
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      return {};
    }
  },
};
