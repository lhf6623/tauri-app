<template>
  <div class="record-list">
    <header>棋谱序列</header>
    <NScrollbar>
      <span class="record-text" v-for="(item, index) in list" :key="index">{{
        item
      }}</span>
    </NScrollbar>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NScrollbar } from "naive-ui";

const list = ref([
  "跑二平五",
  "跑三平六",
  "跑四平七",
  "跑五平八",
  "跑六平九",
  "跑七平十",
  "跑八平一",
  "跑九平二",
  "跑十平三",
  "跑二平五",
  "跑三平六",
  "跑四平七",
  "跑五平八",
  "跑六平九",
  "跑七平十",
  "跑八平一",
  "跑九平二",
  "跑十平三",
  "跑二平五",
  "跑三平六",
  "跑四平七",
  "跑五平八",
  "跑六平九",
  "跑七平十",
  "跑八平一",
  "跑九平二",
  "跑十平三",
  "跑二平五",
  "跑三平六",
  "跑四平七",
  "跑五平八",
  "跑六平九",
  "跑七平十",
  "跑八平一",
  "跑九平二",
  "跑十平三",
]);
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.record-list {
  background-color: var(--x-record-bg-color);
  font-size: 12px;
  display: flex;
  flex-direction: column;

  header,
  footer {
    background-color: var(--x-title-bg-color);
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
