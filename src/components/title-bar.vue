<template>
  <div v-if="showTitle" data-tauri-drag-region class="titlebar">
    <p class="w-full absolute text-center" data-tauri-drag-region>
      {{ title }}
    </p>
    <div class="absolute right-0 h-full">
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
        :component="CloseOutline"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getName } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";
import { NIcon } from "naive-ui";
import { Remove, CloseOutline } from "@vicons/ionicons5";

const showTitle = ref(false);
const title = ref("");
// 默认 Mac 其他格式一样

onMounted(async () => {
  // 判断是不是在浏览器中
  try {
    title.value = await getName();
    showTitle.value = true;
  } catch (_) {
    showTitle.value = false;
  }

  document.addEventListener("keydown", (e) => {
    const { metaKey, key } = e;
    if (metaKey) {
      if (key === "q") {
        appWindow.close();
      }
      if (key === "w") {
        appWindow.minimize();
      }
    }
    return false;
  });
});
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.titlebar {
  height: $titlebarHeight;
  background: rgba(0, 0, 0, var(--bgOpacity));
  user-select: none;
  -webkit-user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-shrink: 0;
  z-index: 999;

  p {
    height: $titlebarHeight;
    padding: 0 6px;
    line-height: $titlebarHeight;
    filter: invert(90%);
    mix-blend-mode: difference;
  }
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: $titlebarHeight;
  height: $titlebarHeight;

  &:hover {
    background: rgb(255, 255, 255, 0.5);
  }
}
</style>
