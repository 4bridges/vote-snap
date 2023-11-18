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
          { text: "Motivation", link: "/1-Intro/Motivation"},
          { text: "Team Members", link: "/1-Intro/Teammembers"},
          
        ],
      },
      {
        text: "Main",
        items: [
          { text: "Summary", link: "/2-Main/Summary"},
          { text: "What", link: "/2-Main/What"},
          { text: "How Snap", link: "/2-Main/HowSnap"},
          { text: "How CCIP", link: "/2-Main/HowCCIP"},
          { text: "Why", link: "/2-Main/Why"},
        ],
      },    
      {
        text: "Outro",
        items: [
          { text: "Lessons Learned", link: "/3-Outro/LessonLearned"},
          { text: "Thanks", link: "/3-Outro/Thanks"},
        ],
      },
      {
        text: "Diverse",
        items: [
          { text: "Markdown Examples", link: "/4-Diverse/markdown-examples" },
          { text: "Runtime API Examples", link: "/4-Diverse/api-examples" },
          { text: "Random", link: "/4-Diverse/random" },
          { text: "Git Commands", link: "/4-Diverse/GitCommands" },
          { text: "Commands", link: "/4-Diverse/Commands" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/4bridges/vote-snap" },
    ],
  },
});
