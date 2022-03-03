<template>
  <NConfigProvider abstract>
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
import { NConfigProvider, NEl, NGlobalStyle } from "naive-ui";
import { Numbers, Records, Maps, Control } from "./components";
import { numbers, numbers_cn } from "./config-data";
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
.xiangqi-box {
  position: relative;
  width: $w * 9 + 4px + 106px + 10px;
  height: $h * 11 + 15px + 4px + 22px + 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #9cf;
  font-size: $w * 0.5;
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
  width: $w * 9 + 4px + 106px;
  justify-content: space-between;
}

.map-box {
  width: $w * 9;
  height: $h * 11 + 15px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  overflow: hidden;
}
.records-box {
  width: 106px;
  height: $h * 11 + 15px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  overflow: hidden;
}
</style>
