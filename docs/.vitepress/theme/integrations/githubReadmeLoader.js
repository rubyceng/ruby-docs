export default {
  async load() {
    const GITHUB_USERNAME = "rubyceng";
    const REPO_NAME = "rubyceng";
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const headers = {
      // Requesting the raw content
      Accept: "application/vnd.github.v3.raw",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/readme`,
        { headers }
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch GitHub README for ${GITHUB_USERNAME}/${REPO_NAME}. Status: ${response.status}`
        );
        return { content: "" };
      }

      const content = await response.text();
      console.log("GitHub README content fetched successfully:", content);

      return { content };
    } catch (error) {
      console.error("Error fetching GitHub README:", error);
      return { content: "" };
    }
  },
};
