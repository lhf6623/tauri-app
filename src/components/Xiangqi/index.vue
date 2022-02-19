<template>
  <div class="xiangqi-box">
    <div class="main-box">
      <Numbers :list="numbers" :type="'isBlack'" />
      <Maps />
      <Numbers :list="numbers_cn" :type="'isRed'" />
    </div>
    <Records v-if="false" />
  </div>
</template>

<script setup lang="ts">
import { Numbers, Records, Maps } from "./components";
import { numbers, numbers_cn } from "./data";
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
@import "./style/index.scss";
</style>
