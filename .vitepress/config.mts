import { defineConfig } from "vitepress";
import type { Config as ThemeConfig } from "@vue/theme";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MCSManager",
  description: "MCSManager Document",
  lastUpdated: true,

  // head section
  head: [
    // favicon
    ['link', { rel: 'icon', href: '/images/logo.png' }]
  ],

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
          text: "Basic Usage",
          link: "/",
          collapsed: false,
          items: [
            { text: "Quick start", link: "/index.md" },
            {
              text: "Install via Docker image",
              link: "/docker-install.md",
            },
            {
              text: "Minecraft Servers",
              collapsed: false,
              items: [
                { text: "Dependencies", link: "/setup_package" },
                { text: "Java Edition", link: "/setup_java_edition" },
                { text: "Bedrock Edition", link: "/setup_bedrock_edition" },
              ],
            },
            {
              text: "Run Docker Image",
              link: "/setup_docker_image.md",
            },
            {
              text: "Steam Game Server",
              link: "/setup_steam.md",
            },
            {
              text: "Other Use Cases",
              link: "/setup_any_software.md",
            },
          ],
        },
        {
          text: "Advanced",
          collapsed: false,
          items: [
            {
              text: "Upgrade & Reset",
              link: "/advanced/update_panel.md",
            },
            {
              text: "Distributed Deployment",
              link: "/advanced/distributed.md",
            },
            {
              text: "Isolated Environment",
              link: "/advanced/docker.md",
            },
            {
              text: "Systemd Service",
              link: "/advanced/linux_systemctl.md",
            },
            {
              text: "Add service for other OSes",
              collapsed: true,
              items: [
                {
                  text: "OpenRC Service",
                  link: "/advanced/linux_openrc.md",
                },
                {
                  text: "FreeBSD Service",
                  link: "/advanced/freebsd_rc.md",
                },
                {
                  text: "OpenBSD Service",
                  link: "/advanced/openbsd_rc.md",
                },
              ],
            },
            {
              text: "Custom Layout",
              link: "/advanced/custom_page.md",
            },
            {
              text: "Upgrade from 9.x",
              link: "/ops/from_v9.md",
            },
          ],
        },
        {
          text: "Operations",
          items: [
            {
              text: "Data & Configuration",
              link: "/ops/config_files.md",
            },
            {
              text: "Network Architecture",
              link: "/ops/mcsm_network.md",
            },
            {
              text: "HTTPS Reverse Proxy with NGINX",
              link: "/ops/proxy_https.md",
            },
            {
              text: "HTTPS Reverse Proxy with IIS",
              link: "/ops/proxy_https_iis.md",
            },
            {
              text: "HTTPS Reverse Proxy with Caddy",
              link: "/ops/proxy_https_caddy.md",
            },
            {
              text: "Share ports with other services",
              link: "/ops/path_prefix.md",
            },
            {
              text: "Cloudflare CDN",
              link: "/ops/cloudflare.md",
            },
          ],
        },
        {
          text: "Development",
          collapsed: false,
          items: [
            {
              text: "Customize HTML Card",
              link: "/apis/html_card.md",
            },
          ],
        },
        {
          text: "API Usage",
          collapsed: true,
          items: [
            {
              text: "Tutorial",
              link: "/apis/get_apikey.md",
            },
            {
              text: "Dashboard",
              link: "/apis/api_dashboard.md",
            },
            {
              text: "User",
              link: "/apis/api_users.md",
            },
            {
              text: "Instance",
              link: "/apis/api_instance.md",
            },
            {
              text: "Nodes",
              link: "/apis/api_daemon.md",
            },
            {
              text: "File",
              link: "/apis/api_fileManager.md",
            },
            {
              text: "Image",
              link: "/apis/api_imageManager.md",
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
              text: "使用 Docker 安装面板",
              link: "/zh_cn/docker-install.md",
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
              text: "连接其他机器",
              link: "/zh_cn/advanced/distributed.md",
            },
            {
              text: "更新与重置",
              link: "/zh_cn/advanced/update_panel.md",
            },
            {
              text: "环境隔离",
              link: "/zh_cn/advanced/docker.md",
            },
            {
              text: "systemd 系统服务",
              link: "/zh_cn/advanced/linux_systemctl.md",
            },
            {
              text: "在其他系统添加服务",
              collapsed: true,
              items: [
                {
                  text: "OpenRC 系统服务",
                  link: "/zh_cn/advanced/linux_openrc.md",
                },
                {
                  text: "FreeBSD 系统服务",
                  link: "/zh_cn/advanced/freebsd_rc.md",
                },
                {
                  text: "OpenBSD 系统服务",
                  link: "/zh_cn/advanced/openbsd_rc.md",
                },
              ],
            },
            {
              text: "自定义页面",
              link: "/zh_cn/advanced/custom_page.md",
            },
            {
              text: "从 9.X 版本升级",
              link: "/zh_cn/ops/from_v9.md",
            },
          ],
        },
        {
          text: "运维",
          items: [
            {
              text: "数据与配置",
              link: "/zh_cn/ops/config_files.md",
            },
            {
              text: "网络架构",
              link: "/zh_cn/ops/mcsm_network.md",
            },
            {
              text: "使用 HTTPS",
              link: "/zh_cn/ops/https.md",
            },
            {
              text: "通过 NGINX 使用 HTTPS",
              link: "/zh_cn/ops/proxy_https.md",
            },
            {
              text: "通过 IIS 使用 HTTPS",
              link: "/zh_cn/ops/proxy_https_iis.md",
            },
            {
              text: "通过 Caddy 使用 HTTPS",
              link: "/zh_cn/ops/proxy_https_caddy.md",
            },
            {
              text: "与其他服务共用端口",
              link: "/zh_cn/ops/path_prefix.md",
            },
            {
              text: "使用 CloudFlare CDN",
              link: "/zh_cn/ops/cloudflare.md",
            },
          ],
        },
        {
          text: "开发",
          items: [{ text: "制作卡片小组件", link: "/zh_cn/apis/html_card.md" }],
        },
        {
          text: "API 接口",
          collapsed: true,
          items: [
            {
              text: "使用教程",
              link: "/zh_cn/apis/get_apikey.md",
            },
            {
              text: "仪表盘数据",
              link: "/zh_cn/apis/api_dashboard.md",
            },
            {
              text: "用户管理",
              link: "/zh_cn/apis/api_users.md",
            },
            {
              text: "实例管理",
              link: "/zh_cn/apis/api_instance.md",
            },
            {
              text: "节点管理",
              link: "/zh_cn/apis/api_daemon.md",
            },
            {
              text: "文件管理",
              link: "/zh_cn/apis/api_fileManager.md",
            },
            {
              text: "镜像管理",
              link: "/zh_cn/apis/api_imageManager.md",
            },
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
