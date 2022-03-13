<template>
  <NEl class="xiangqi-box">
    <section>
      <div class="map-box">
        <Numbers :list="numbers" />
        <Maps />
        <Numbers :list="numbers_cn" />
      </div>
      <Records class="records-box" />
    </section>
    <Control />
  </NEl>
</template>

<script setup lang="ts">
import { NEl } from "naive-ui";
import { onMounted, onUnmounted } from "vue";
import { Numbers, Records, Maps, Control } from "./components";
import { numbers, numbers_cn } from "./config-data";
import { useGlobalState } from "./vueuse/store";
const store = useGlobalState();
const bgColor = "#9cf";
onMounted(() => {
  document.body.style.backgroundColor = bgColor;
});

onUnmounted(() => {
  document.body.style.backgroundColor = "";
});
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
.xiangqi-box {
  position: relative;
  width: $w * 9 + 4px + 106px + 10px;
  height: $h * 10 + $h_n * 2 + 4px + 22px + 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: v-bind("bgColor");
  font-size: $w * 0.5;
  font-family: 宋体, 新宋体, "MS Song", SimSun, NSimSun;
  overflow: hidden;
}
footer {
  width: calc(100% - 10px);
  height: 22px;
  margin-top: 4px;
}
section {
  display: flex;
  flex-direction: row;
  width: $w * 9 + 4px + 106px;
  justify-content: space-between;
}

.map-box {
  width: $w * 9;
  height: ($h * 10) + ($h_n * 2);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  overflow: hidden;

  transform: v-bind("store.transformStyle");
  z-index: 100;
}
.records-box {
  width: 106px;
  height: ($h * 10) + ($h_n * 2);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  overflow: hidden;
}
</style>
