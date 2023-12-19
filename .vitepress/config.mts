import { defineConfig } from "vitepress";
import type { Config as ThemeConfig } from "@vue/theme";

const sidebar = {
  ["/zh_cn/"]: [
    { text: "主页", link: "/zh_cn/index.md" },
    { text: "MD 展示", link: "/zh_cn/markdown-examples.md" },
    { text: "API 示例", link: "/zh_cn/api-examples.md" },
  ],
  ["/"]: [
    { text: "Index", link: "/index.md" },
    { text: "Markdown Examples", link: "/markdown-examples.md" },
    { text: "Runtime API Examples", link: "/api-examples.md" },
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
    },
    zh_cn: {
      label: "中文",
      lang: "zh",
      link: "/zh_cn/",
    },
  },
  themeConfig: {
    sidebar,
  },
});
