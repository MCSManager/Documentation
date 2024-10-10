import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import tip from "./components/tip.vue";
import "./custom.css";

function languageSwitch() {
  if (
    window.navigator.language.includes("zh") &&
    window.location.pathname === "/"
  ) {
    window.location.href = "/zh_cn/";
  }
}

export default {
  extends: DefaultTheme,
  setup() {
    languageSwitch();
  },
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component("tip", tip);
  },
} satisfies Theme;
