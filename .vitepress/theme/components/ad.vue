<!-- This component is only used to display ads, which will automatically change based on the user's browser language -->
<!-- 这个组件只用于展示广告，广告会根据用户的浏览器语言自动变化 -->
<template>
  <div class="header-top-nav" v-if="displayAd">
    <div v-for="item in tipItems" :key="item.adText" class="right-my-container">
      <a :href="item.adAddr" target="_blank">
        <div class="inner-text">
          {{ item.adText }}
        </div>
      </a>
    </div>

    <div>
      <a
        href="https://afdian.com/item/9efafa52f8ca11ef99925254001e7c00"
        target="_blank"
      >
        <div class="join-us">
          <p>购买此处推广位</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const adConfig = [
  {
    language: "zh",
    adText:
      "【裕米云计算】为爱探索的你培育好每一颗“数字玉米”，全新云服务等你发现！",
    adAddr: "https://comcorn.cn/",
    endTime: "2025/10/21 23:59:59",
    qq: 3073559291,
    price: 199,
  },
];

const currentLanguage = navigator.language;

const displayAd = currentLanguage.includes("zh");

const now = Date.now();

const tipItems = reactive(
  adConfig.filter((item) => {
    const endTime = new Date(item.endTime).getTime();
    return currentLanguage.includes(item.language) && now < endTime;
  })
);
</script>

<style lang="less" scoped>
// 公共混入
.transition-hover() {
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
}

.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-base() {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgba(48, 48, 48, 0.061);
}

.header-top-nav {
  width: 100%;
  padding: 10px;
  line-height: 20px;

  .right-my-container {
    .transition-hover();
    .flex-center();
    .card-base();
    margin-bottom: 10px;
    padding: 8px 10px;
    background-color: rgb(92, 168, 121);
    min-height: 68px;

    &:hover {
      background-color: rgba(97, 169, 125, 0.926);
    }

    .inner-text {
      font-size: 13px;
      color: #fff;
    }
  }

  .join-us {
    .transition-hover();
    .flex-center();
    .card-base();
    background-color: rgba(249, 249, 249);
    color: rgb(163, 163, 163);
    font-size: 13px;

    &:hover {
      cursor: pointer;
      background-color: rgba(249, 249, 249, 0.926);
    }
  }
}
</style>
