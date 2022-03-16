<template>
  <NEl class="h-full w-full relative flex justify-center items-center">
    <div
      class="xiangqi-box shadow relative flex items-center justify-center flex-col"
    >
      <section class="section flex flex-row justify-between">
        <div class="map-box shadow rounded overflow-hidden">
          <Numbers :list="numbers" />
          <Maps />
          <Numbers :list="numbers_cn" />
        </div>
        <Records class="records-box shadow rounded overflow-hidden w-106px" />
      </section>
      <Control class="footer" />
    </div>
  </NEl>
</template>

<script setup lang="ts">
import { NEl } from "naive-ui";
import { Numbers, Records, Maps, Control } from "./components";
import { numbers, numbers_cn } from "./config-data";
import { useGlobalState } from "./vueuse/store";
const store = useGlobalState();
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
.xiangqi-box {
  width: $w * 9 + 4px + 106px + 10px;
  height: $h * 10 + $h_n * 2 + 4px + 22px + 10px;
  background-color: #9cf;
  font-size: 12px;
  font-family: 宋体, 新宋体, "MS Song", SimSun, NSimSun;
}
.footer {
  width: calc(100% - 10px);
}
.section {
  width: $w * 9 + 4px + 106px;
}

.map-box {
  width: $w * 9;
  height: ($h * 10) + ($h_n * 2);
  transform: v-bind("store.transformStyle");
}
.records-box {
  height: ($h * 10) + ($h_n * 2);
}
</style>
