<template>
  <div>AAA::{{ envs }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSsgTranslation } from "./languages/index.mts";

const props = defineProps<{
  language: string;
}>();

const { t } = useSsgTranslation(props.language);

const envs = ref(t("title"));
onMounted(() => {
  setTimeout(() => {
    envs.value = "24214";
  }, 3000);
});
</script>
