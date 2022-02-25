<template>
  <NConfigProvider :theme="theme">
    <div class="xiangqi-box">
      <section>
        <div class="map-box">
          <Numbers :list="numbers" />
          <Maps />
          <Numbers :list="numbers_cn" />
        </div>
        <Records class="records-box" v-if="true" />
      </section>
      <Control />
    </div>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NConfigProvider, darkTheme, GlobalTheme } from "naive-ui";
import { Numbers, Records, Maps, Control } from "./components";
import { numbers, numbers_cn } from "./config-data";
import { isDark } from "./vueuse/dark";

const theme = computed<GlobalTheme | null>(() => {
  return isDark.value ? darkTheme : null;
});
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
.xiangqi-box {
  position: relative;
  width: calc($w * 9 + 4px + 106px + 10px);
  height: calc($h * 11 + 4px + 22px + 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $mainColor;
  font-size: calc($w * 0.5);
  font-family: 宋体, 新宋体, "MS Song", SimSun, NSimSun;
}
footer {
  width: calc(100% - 10px);
  height: 22px;
  margin-top: 4px;
}
section {
  display: flex;
  flex-direction: row;
  width: calc($w * 9 + 4px + 106px);
  justify-content: space-between;
}

.map-box {
  width: calc($w * 9);
  height: calc($h * 11);
  box-shadow: 0px 0px 2px #000000;
  border-radius: 2px;
  overflow: hidden;
}
.records-box {
  width: 106px;
  height: calc($h * 11);
  box-shadow: 0px 0px 2px #000000;
  border-radius: 2px;
  overflow: hidden;
}
</style>
