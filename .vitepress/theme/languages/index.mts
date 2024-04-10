import zh_cn from "./zh_cn.json";
import en_us from "./en_us.json";

export function useSsgTranslation(currentLang: string) {
  const t = (key: string): string => {
    if (currentLang === "zh_cn") {
      return zh_cn[key] || "";
    }
    if (currentLang === "en_us") {
      return en_us[key] || "";
    }
    return "";
  };
  return {
    t,
  };
}
