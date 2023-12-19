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
    sidebar: {
      ["/"]: [
        { text: "QuickStart", link: "/index.md" },
        { text: "Markdown Examples", link: "/en_us/markdown-examples.md" },
        { text: "其他菜单不着急，等中文写完", link: "/en_us/demo.md" },
      ],
      ["/zh_cn/"]: [
        {
          text: "教程",
          items: [
            {
              text: "快速开始",
              link: "/zh_cn/index.md",
              collapsed: true,
              items: [
                { text: "这是什么", link: "/zh_cn/index.md" },
                { text: "安装面板", link: "/zh_cn/install.md" },
              ],
            },
            {
              text: "搭建 Minecraft 服务器",
              collapsed: true,
              items: [
                {
                  text: "使用预制整合包搭建",
                  link: "/zh_cn/demo1.md",
                },
                {
                  text: "手动上传搭建",
                  link: "/zh_cn/demo2.md",
                },
              ],
            },
            { text: "搭建 Steam 游戏服务器", link: "/zh_cn/demo.md" },
            { text: "部署任意控制台程序", link: "/zh_cn/demo.md" },
          ],
        },
        {
          text: "高级",
          items: [
            { text: "更新面板", link: "/zh_cn/demo.md" },
            { text: "分布式", link: "/zh_cn/demo.md" },
            { text: "容器化", link: "/zh_cn/demo.md" },
          ],
        },
        {
          text: "运维",
          items: [
            { text: "配置文件", link: "/zh_cn/demo.md" },
            { text: "数据储存", link: "/zh_cn/demo.md" },
            { text: "反向代理", link: "/zh_cn/demo.md" },
            { text: "HTTPS", link: "/zh_cn/demo.md" },
          ],
        },
      ],
    },
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
