<template>
  <footer>
    <input type="button" value="开始" />
    <input type="button" value="后退" />
    <input type="button" value="前进" />
    <input type="button" value="终局" />
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../style/config.scss";

footer {
  display: flex;
}
input {
  height: 100%;
  box-sizing: border-box;
  border: 1px solid $lineColor;
  background-color: white;
  padding: 0 6px;
  border-radius: 2px;
  font-size: 12px;
  margin-right: 1px;
}
</style>
