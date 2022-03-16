<template>
  <div class="record-list flex flex-col bg-white font-s">
    <header class="px-6px h-18px flex-shrink-0">棋谱序列</header>
    <NScrollbar ref="scrollbarRef">
      <ul ref="recordListRef" class="text-center">
        <li>
          <span>===棋局开始===</span>
        </li>
        <li
          class="flex text-center justify-center"
          v-for="(item, index) in record"
          :key="index"
        >
          <p class="inline-block">
            {{ index % 2 ? "&nbsp;&nbsp;&nbsp;" : `${index / 2 + 1}.` }}
          </p>
          <p class="flex min-w-50px justify-between">
            <span v-for="wz in item">{{ wz }}</span>
          </p>
        </li>
      </ul>
    </NScrollbar>
    <footer class="px-6px h-18px flex-shrink-0"></footer>
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
const record = computed(() => {
  let _record = store.value.record.map((item) => {
    return item.split("");
  });
  return _record;
});

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

  header,
  footer {
    background-color: #9df;
  }
}
</style>
