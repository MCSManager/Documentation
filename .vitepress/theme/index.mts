import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";

// function languageSwitch() {
//   if (
//     window.navigator.language.includes("zh") &&
//     window.location.pathname === "/"
//   ) {
//     window.location.href = "/zh_cn/";
//   }
// }

export default {
  extends: DefaultTheme,
  setup() {},
  enhanceApp({ app }) {},
} satisfies Theme;
