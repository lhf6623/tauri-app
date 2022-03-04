<template>
  <div class="record-list">
    <header>棋谱序列</header>
    <NScrollbar ref="scrollbarRef">
      <div ref="recordListRef">
        <span class="record-text" v-for="(item, index) in record" :key="index">
          {{ item }}
        </span>
      </div>
    </NScrollbar>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { NScrollbar, ScrollbarInst } from "naive-ui";
import { useGlobalState } from "@/components/Xiangqi/vueuse/store";
import { useElementSize } from "@vueuse/core";

const recordListRef = ref<HTMLDivElement | null>(null);
const scrollbarRef = ref<ScrollbarInst | null>(null);

const store = useGlobalState();
const record = computed(() => store.value.record);

const { height } = useElementSize(recordListRef);
watch(
  () => height,
  () => {
    scrollbarRef.value?.scrollBy({
      top: height.value,
      behavior: "smooth",
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.record-list {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  background-color: white;

  header,
  footer {
    background-color: #9df;
    padding: 0 6px;
    height: 18px;
    flex-shrink: 0;
  }

  .record-text {
    display: block;
    text-align: center;
  }
}
</style>
