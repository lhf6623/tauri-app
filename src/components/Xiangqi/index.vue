<template>
  <NEl class="h-full w-full relative flex justify-center items-center">
    <div
      class="xiangqi-box p-5px shadow relative flex items-center justify-center flex-col overflow-hidden"
    >
      <section class="w-full flex flex-row justify-between overflow-hidden">
        <div class="map-box relative flex flex-col items-center">
          <Numbers :list="numbers" />
          <Maps />
          <Numbers :list="numbers_cn" />
        </div>
        <Records class="records-box shadow overflow-hidden w-106px z-50" />
      </section>
      <Control class="w-full" />
    </div>
  </NEl>
</template>

<script setup lang="ts">
import { NEl } from "naive-ui";
import { onMounted } from "vue";
import { Numbers, Records, Maps, Control } from "./components";
import { numbers, numbers_cn } from "./utils/data";
import { useGlobalState, initChessGame } from "./vueuse/store";

const store = useGlobalState();

// TODO: 后期接口化
onMounted(initChessGame);
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
.xiangqi-box {
  width: $w * 9 + 8px + 106px + 10px;
  height: $h * 10 + $h_n * 2 + 4px + 22px + 10px;
  background-color: #9cf;
  font-size: 16px;
}

.map-box {
  width: $w * 9 + 4px;
  height: ($h * 10) + ($h_n * 2);
  transform: v-bind("store.transformStyle");

  transition: transform 1s;
  background-color: #eed3b3;
}
.records-box {
  height: ($h * 10) + ($h_n * 2);
}
</style>
