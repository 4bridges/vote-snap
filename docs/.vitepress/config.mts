import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cross Chain DAO",
  description: "A cross chain of Decentralised autonomous organisation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Intro", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Intro",
        items: [
          { text: "Intro", link: "intro" },
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Random", link: "/random.md" },
          { text: "Git Commands", link: "/GitCommands.md" },
        ],
      },
      {
        text: "Overview",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Random", link: "/random.md" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
