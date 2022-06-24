<template>
  <div v-if="showTitle" data-tauri-drag-region class="titlebar">
    <p class="text-left w-full" data-tauri-drag-region>{{ title }}</p>
    <NIcon
      class="titlebar-button"
      @click="() => appWindow.minimize()"
      color="rgb(177, 177, 177)"
      size="20px"
      :component="Remove"
    />
    <NIcon
      class="titlebar-button"
      @click="() => appWindow.close()"
      color="rgb(177, 177, 177)"
      size="20px"
      :component="Close"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type } from "@tauri-apps/api/os";
import { getName } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";
import { NIcon } from "naive-ui";
import { Remove, Close } from "@vicons/ionicons5";

const showTitle = ref(true);
const title = ref("");

onMounted(async () => {
  // 判断是不是在浏览器中
  try {
    await type();
    showTitle.value = true;
  } catch (_) {
    showTitle.value = false;
  }

  title.value = await getName();
});
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.titlebar {
  height: $titlebarHeight;
  background: rgba(0, 0, 0, var(--bgOpacity));
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-shrink: 0;
  color: rgb(177, 177, 177);

  p {
    height: $titlebarHeight;
    padding-left: 6px;
    line-height: $titlebarHeight;
  }
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: $titlebarHeight;
  height: $titlebarHeight;
  flex-shrink: 0;
  cursor: pointer;
}
.titlebar-button:hover {
  background: rgb(255, 255, 255, 0.5);
}
</style>
