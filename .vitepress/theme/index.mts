import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Tip from "./components/tip.vue";
import IndexPage from "./index-page.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("tip", Tip);
    app.component("index-page", IndexPage);
  },
} satisfies Theme;
