<template>
  <div class="record-list">
    <header>棋谱序列</header>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
  background-color: white;
  font-size: 12px;

  header,
  footer {
    background-color: #9df;
    padding: 0 6px;
    height: 18px;
  }

  ul {
    overflow-y: auto;
    height: calc(100% - 36px);
    width: calc(100%);

    li {
      text-align: center;
    }
  }
}
</style>
