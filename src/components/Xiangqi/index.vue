<template>
  <NConfigProvider :theme="theme" abstract :theme-overrides="getTheme">
    <NGlobalStyle />
    <NEl class="xiangqi-box">
      <section>
        <div class="map-box">
          <Numbers :list="numbers" />
          <Maps />
          <Numbers :list="numbers_cn" />
        </div>
        <Records class="records-box" v-if="true" />
      </section>
      <Control />
    </NEl>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NConfigProvider, darkTheme, NEl, NGlobalStyle } from "naive-ui";
import type { GlobalTheme, CustomThemeCommonVars } from "naive-ui";
import { Numbers, Records, Maps, Control } from "./components";
import { numbers, numbers_cn } from "./config-data";
import {
  lightThemeOverrides,
  darkThemeOverrides,
} from "./components/control-bar/settings/style";
import { isDark } from "./vueuse/dark";

const theme = computed<GlobalTheme | null>(() => {
  return isDark.value ? darkTheme : null;
});

const getTheme = computed<CustomThemeCommonVars>(() => {
  return isDark.value ? darkThemeOverrides : lightThemeOverrides;
});
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
.xiangqi-box {
  position: relative;
  width: calc(var(--x-width) * 9 + 4px + 106px + 10px);
  height: calc(var(--x-height) * 11 + 4px + 22px + 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--x-bg-color);
  font-size: calc(var(--x-width) * 0.5);
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
  width: calc(var(--x-width) * 9 + 4px + 106px);
  justify-content: space-between;
}

.map-box {
  width: calc(var(--x-width) * 9);
  height: calc(var(--x-height) * 11);
  box-shadow: 0px 0px 2px var(--x-map-shadow-color);
  border-radius: 2px;
  overflow: hidden;
}
.records-box {
  width: 106px;
  height: calc(var(--x-height) * 11);
  box-shadow: 0px 0px 2px var(--x-map-shadow-color);
  border-radius: 2px;
  overflow: hidden;
}
</style>
