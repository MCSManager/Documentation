<script setup>
import VPLayout from "vitepress/theme";
import DefaultTheme from "vitepress/theme";
import Ad from "./components/ad.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <div>
    <Layout>
      <template #aside-outline-after>
        <Ad />
      </template>
    </Layout>
  </div>
</template>
