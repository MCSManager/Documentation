import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import ExtLayout from "./ext-layout.vue";

function languageSwitch() {
  if (
    window.navigator.language.includes("zh") &&
    window.location.pathname === "/"
  ) {
    setTimeout(() => {
      window.location.href = "/zh_cn/";
    }, 2100);
  }
}

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: ExtLayout,
  setup() {
    languageSwitch();
  },
  enhanceApp({ app }) {},
} satisfies Theme;
