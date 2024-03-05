import { defineConfig } from "vitepress";
import type { Config as ThemeConfig } from "@vue/theme";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MCSManager",

  description: "MCSManager Document",
  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/",
    },
    zh_cn: {
      label: "简体中文",
      lang: "zh",
      link: "/zh_cn/",
    },
  },
  themeConfig: {
    logo: "/images/logo.png",
    sidebar: {
      ["/"]: [
        {
          text: "Installation",
          link: "/zh_cn/index.md",
          collapsed: true,
          items: [
            { text: "Quick start", link: "/index.md" },
            {
              text: "Setup Minecraft Server",
              collapsed: false,
              items: [
                { text: "Package (Java) ", link: '/setup_package' },
                { text: "Java Edition", link: '/setup_java_edition' },
                { text: "Bedrock Edition", link: '/setup_bedrock_edition' },
              ]
            }
          ],
        },
        {
          text: "Advanced",
          collapsed: false,
          items: [
            {
              text: "Upgrade & Reset Panel",
              link: "/advanced/update_panel.md",
            },
            {
              text: "Distributed",
              link: "/advanced/distributed.md",
            },
            {
              text: "Enviromental isolation",
              link: "/advanced/docker.md",
            },
            {
              text: "Systemd service (Linux)",
              link: "/advanced/linux_systemctl.md",
            },
          ]
        },
        {
          text: "API Reference",
          collapsed: true,
          items: [
            {
              text: "Users",
              link: "/apis/users.md",
            },
            {
              text: "Instances",
              link: "/apis/instance.md",
            },
          ],
        },
      ],
      ["/zh_cn/"]: [
        {
          text: "教程",
          items: [
            {
              text: "快速开始",
              link: "/zh_cn/index.md",
            },
            {
              text: "搭建 Minecraft 游戏服务器",
              collapsed: true,
              items: [
                {
                  text: "一键搭建 Java 版",
                  link: "/zh_cn/setup_package.md",
                },
                {
                  text: "搭建 Java 版",
                  link: "/zh_cn/setup_java_edition.md",
                },
                {
                  text: "搭建基岩版",
                  link: "/zh_cn/setup_bedrock_edition.md",
                },
              ],
            },
            {
              text: "使用 Docker 部署游戏服务器",
              link: "/zh_cn/setup_docker_image.md",
            },
            {
              text: "搭建 Steam 游戏服务器",
              link: "/zh_cn/setup_steam.md",
            },
            {
              text: "其他使用场景",
              link: "/zh_cn/setup_any_software.md",
            },
          ],
        },
        {
          text: "高级",
          items: [
            { 
              text: "更新与重置", 
              link: "/zh_cn/advanced/update_panel.md" },
            { 
              text: "分布式", 
              link: "/zh_cn/advanced/distributed.md" },
            { 
              text: "环境隔离", 
              link: "/zh_cn/advanced/docker.md" },
            {
              text: "系统服务",
              link: "/zh_cn/advanced/linux_systemctl.md",
            },
          ],
        },
        {
          text: "运维",
          items: [
            { 
              text: "数据与配置", 
              link: "/zh_cn/config_files.md" },
            { 
              text: "面板通信原理", 
              link: "/zh_cn/mcsm_network.md" },
            { 
              text: "使用 HTTPS", 
              link: "/zh_cn/proxy_https.md" },
          ],
        },
        {
          text: "开发",
          items: [
            { text: "制作卡片组件", link: "/zh_cn/html_card.md" },
            { text: "获取 APIKEY", link: "/zh_cn/get_apikey.md" },
            { text: "API 接口参考", link: "/apis/users.html" },
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
