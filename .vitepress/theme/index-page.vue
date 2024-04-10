<template>
  <div>
    <div>AAA::{{ envs }}</div>
    <h1 v-for="item in list" :key="item">
      {{ item }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSsgTranslation } from "./languages/index.mts";

const props = defineProps<{
  language: string;
}>();

const { t } = useSsgTranslation(props.language);

const envs = ref(t("title"));
const list = ref([1, 2, 3, 4, 55, 6, 78, 9, 0, 1, 11, 12, 13, 14]);

onMounted(() => {
  setTimeout(() => {
    envs.value = "24214";
  }, 3000);
});
</script>
