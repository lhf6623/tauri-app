<template>
  <div v-if="showTitle" data-tauri-drag-region class="titlebar">
    <div v-if="isMac" class="titlebar-mac">
      <i class="titlebar-mac-button bg--red" @click="() => appWindow.close()">
        <NIcon
          class="show"
          color="rgba(0,0,0,0.7)"
          size="12px"
          :component="CloseOutline"
        />
      </i>
      <i
        class="titlebar-mac-button bg--yellow"
        @click="() => appWindow.minimize()"
      >
        <NIcon
          class="show"
          color="rgba(0,0,0,0.7)"
          size="12px"
          :component="Remove"
        />
      </i>
    </div>
    <p
      class="w-full absolute"
      :class="`text-${!isMac ? `left` : `center`}`"
      data-tauri-drag-region
    >
      {{ title }}
    </p>
    <div v-if="!isMac" class="absolute right-0 h-full">
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
import { type } from "@tauri-apps/api/os";
import { getName } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";
import { NIcon } from "naive-ui";
import { Remove, CloseOutline } from "@vicons/ionicons5";

const showTitle = ref(false);
const title = ref("");
// 默认 Mac 其他格式一样
const isMac = ref(false);

onMounted(async () => {
  // 判断是不是在浏览器中
  try {
    isMac.value = (await type()) === "Darwin";
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
.titlebar-mac {
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  width: 48px;
  display: flex;
  justify-content: space-evenly;
  z-index: 999;

  .show {
    display: none;
  }

  .bg--red,
  .bg--yellow {
    background-color: rgba($color: #e3e3e3, $alpha: 0.8);
  }
  &:hover {
    .show {
      display: inline-block;
    }
    .bg--red {
      background-color: #ff1500;

      &:active {
        background-color: rgba($color: #ff1500, $alpha: 0.7);
      }
    }
    .bg--yellow {
      background-color: #f4bf4f;

      &:active {
        background-color: rgba($color: #f4bf4f, $alpha: 0.7);
      }
    }
  }
}
.titlebar-mac-button {
  position: relative;
  height: 13px;
  width: 13px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    position: absolute;
    content: "";
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
}
</style>
