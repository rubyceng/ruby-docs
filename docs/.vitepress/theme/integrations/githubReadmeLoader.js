// docs/.vitepress/theme/integrations/githubReadmeLoader.js

// Helper function to decode Base64
function decodeBase64(str) {
  if (typeof window !== 'undefined') {
    // Browser environment
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } else {
    // Node.js environment
    return Buffer.from(str, 'base64').toString('utf-8');
  }
}

export default {
  async load() {
    const GITHUB_USERNAME = "rubyceng";
    const REPO_NAME = "rubyceng";
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const headers = {
      // Requesting the raw content
      'Accept': 'application/vnd.github.v3.raw',
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
      return { content };

    } catch (error) {
      console.error("Error fetching GitHub README:", error);
      return { content: "" };
    }
  },
};