<template>
  <footer>
    <input type="button" value="开始" />
    <input type="button" value="后退" />
    <input type="button" value="前进" />
    <input type="button" value="终局" />
    <div class="tips-box">
      <label for="tips-box">提示</label>
      <input
        id="tips-box"
        :checked="tips"
        type="checkbox"
        @click="changeTips"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { inject } from "vue";
const tips = inject<boolean>("tips");
const changeTips = inject<((payload: MouseEvent) => void) | undefined>(
  "changeTips"
);
</script>

<style lang="scss" scoped>
@import "../style/config.scss";

@mixin inputBox {
  border: none;
  outline: none;
  box-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0.2);
  height: 100%;
  line-height: 18px;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
footer {
  position: relative;
  display: flex;

  .tips-box {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100%;
    right: 0;

    input[type="checkbox"] {
      @include inputBox;
    }

    label {
      height: 100%;
      line-height: 16px;
      margin-right: 2px;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }
  }
}

input[type="button"] {
  @include inputBox;
  padding: 0 8px;
  margin-right: 2px;
  background-color: white;
}
input:focus {
  --tw-ring-color: none;
  box-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0);
}
</style>
