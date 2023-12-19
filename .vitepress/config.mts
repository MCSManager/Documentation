import { defineConfig } from "vitepress";
import type { Config as ThemeConfig } from "@vue/theme";

const sidebar = {
  ["/zh_cn/"]: [
    { text: "快速开始", link: "/zh_cn/index.md" },
    { text: "MD 展示", link: "/zh_cn/markdown-examples.md" },
    { text: "API 示例", link: "/zh_cn/api-examples.md" },
  ],
  ["/"]: [
    { text: "QuickStart", link: "/index.md" },
    { text: "Markdown Examples", link: "/en_us/markdown-examples.md" },
    { text: "Runtime API Examples", link: "/en_us/api-examples.md" },
  ],
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MCSManager Document",
  description: "MCSManager Document",
  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/en_us/",
    },
    zh_cn: {
      label: "简体中文",
      lang: "zh",
      link: "/zh_cn/",
    },
  },
  themeConfig: {
    sidebar,
    nav: [
      {
        text: "Official website",
        link: "https://mcsmanager.com/",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/MCSManager/MCSManager" },
    ],
  },
});
