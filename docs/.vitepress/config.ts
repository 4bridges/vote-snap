import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cross Chain DAO",
  description: "A cross chain of Decentralised autonomous organisation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Intro", link: "/1-Intro/Motivation" },
      { text: "Main", link: "/2-Main/Summary" },
      { text: "Outro", link: "/3-Outro/LessonLearned" },
    ],

    sidebar: [
      {
        text: "Intro",
        items: [
          { text: "Motivation", link: "/1-Intro/Motivation" },
          { text: "Team Members", link: "/1-Intro/Teammembers" },
        ],
      },
      {
        text: "Main",
        items: [
          { text: "What", link: "/2-Main/What" },
          { text: "Why", link: "/2-Main/Why" },
          { text: "How Snap", link: "/2-Main/HowSnap" },
          { text: "How CCIP", link: "/2-Main/HowCCIP" },
          { text: "Summary", link: "/2-Main/Summary" },
        ],
      },
      {
        text: "Outro",
        items: [
          { text: "Thanks", link: "/3-Outro/Thanks" },
        ],
      },
      {
        text: "Diverse",
        items: [
          { text: "Software Design", link: "/4-Diverse/SoftwareDesign" },
          { text: "Markdown Examples", link: "/4-Diverse/markdown-examples" },
          { text: "Runtime API Examples", link: "/4-Diverse/api-examples" },
          { text: "Random", link: "/4-Diverse/random" },
          { text: "Git Commands", link: "/4-Diverse/GitCommands" },
          { text: "Commands", link: "/4-Diverse/Commands" },
          { text: "Texto", link: "/4-Diverse/Testo" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/4bridges/vote-snap" },
    ],
  },
});
