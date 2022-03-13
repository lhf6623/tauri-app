<template>
  <div class="record-list">
    <header>棋谱序列</header>
    <NScrollbar ref="scrollbarRef">
      <ul ref="recordListRef">
        <li class="record-text">
          <span>===棋局开始===</span>
        </li>
        <li class="record-text" v-for="(item, index) in record" :key="index">
          <p class="inline-block">
            {{ index % 2 ? "&nbsp;&nbsp;&nbsp;" : `${index / 2 + 1}.` }}
          </p>
          <p class="text">
            <span v-for="wz in item">{{ wz }}</span>
          </p>
        </li>
      </ul>
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
    display: flex;
    text-align: center;
    justify-content: center;

    .text {
      display: flex;
      min-width: 50px;
      justify-content: space-between;
    }
  }
}
</style>
