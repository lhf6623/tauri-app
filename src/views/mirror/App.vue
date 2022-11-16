<template>
  <NConfigProvider abstract preflight-style-disabled>
    <div class="mirror-layou">
      <!-- video 标签不能设置圆形 外面包一层控制圆形 -->
      <div class="mirror-circle">
        <video v-show="!closes.is_close" ref="mirrorRef" class="mirror"></video>
        <Transition>
          <NIcon
            v-if="closes.is_close"
            size="100"
            class="absolute mix-blend-difference"
          >
            <PersonOutline />
          </NIcon>
        </Transition>
      </div>
      <div class="mirror-control">
        <!-- 开始 暂停 -->
        <NButton
          text-color="#FFF"
          circle
          :loading="plays.loading"
          @click="playOrPause"
        >
          <template #icon>
            <NIcon
              :component="
                plays.is_play ? PauseCircleOutline : CaretForwardCircleOutline
              "
            />
          </template>
        </NButton>
        <!-- 翻转 -->
        <NButton
          text-color="#FFF"
          circle
          v-if="!closes.is_close"
          @click="turn = !turn"
        >
          <template #icon>
            <NIcon>
              <RepeatOutline />
            </NIcon>
          </template>
        </NButton>
        <!-- 关闭摄像头 -->
        <NButton
          circle
          text-color="#FFF"
          :loading="closes.loading"
          @click="close"
          v-if="!closes.is_close"
        >
          <template #icon>
            <NIcon>
              <LockClosedOutline />
            </NIcon>
          </template>
        </NButton>
      </div>
    </div>
    <NGlobalStyle />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NButton, NIcon } from "naive-ui";
import { ref } from "vue";
import {
  PauseCircleOutline,
  PersonOutline,
  CaretForwardCircleOutline,
  RepeatOutline,
  LockClosedOutline,
} from "@vicons/ionicons5";
import { useVideo } from "/@/views/mirror/MirrorHook";

const mirrorRef = ref<HTMLVideoElement | null>(null);
const { turnStyle, closes, turn, plays, playOrPause, close } = useVideo(
  mirrorRef,
  false
);
</script>

<style lang="scss">
.mirror-layou {
  position: relative;
  width: 200px;
  height: 200px;

  .mirror-circle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;

    .mirror {
      transform: v-bind(turnStyle);
      transition: transform 0.2s;
      position: absolute;
      height: 100%;
    }
  }

  .mirror-control {
    position: absolute;
    width: 100%;
    height: 90%;
    z-index: 20;
    display: none;
    justify-content: space-around;
    align-items: end;
    mix-blend-mode: difference;
  }

  &:hover .mirror-control {
    display: flex;
  }
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
