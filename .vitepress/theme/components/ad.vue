<!-- This component is only used to display ads, which will automatically change based on the user's browser language -->
<!-- 这个组件只用于展示广告，广告会根据用户的浏览器语言自动变化 -->
<template>
  <div class="header-top-nav" v-if="displayAd">
    <div v-for="item in ad" :key="item.adText" class="ad-item">
      <a :href="item.adAddr" target="_blank">
        <div class="ad-text">
          {{ item.adText }}
        </div>
      </a>
    </div>

    <div>
      <a
        href="https://afdian.com/item/9efafa52f8ca11ef99925254001e7c00"
        target="_blank"
      >
        <div class="join-ad">
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
    adText: "【创梦网络】四川一手高防10年老商家-物理机低至170元-招代理",
    adAddr: "https://www.580dns.com/cart?fid=1&gid=3",
    endTime: "2025/3/25 23:59:59",
    qq: 490898739,
    price: 239,
  },
  {
    language: "zh",
    adText: "【道之云网络】MCSM 用户专享特惠/企业运营资质齐全/招收合作伙伴",
    adAddr: "https://idc.daozhiyun.cn/aff/DGNMLNKW",
    endTime: "2025/4/24 23:59:59",
    qq: 2416892749,
    price: 200,
  },
];

const currentLanguage = navigator.language;

const displayAd = currentLanguage.includes("zh");

const ad = reactive(
  adConfig.filter((item) => currentLanguage.includes(item.language))
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

  .ad-item {
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

    .ad-text {
      font-size: 13px;
      color: #fff;
    }
  }

  .join-ad {
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
