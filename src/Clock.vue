<template>
  <footer
    class="bg-#99ddff transition-all overflow-hidden"
    :class="{
      'h-60px': isExpand,
      'h-18px': !isExpand,
    }"
  >
    <div v-if="!isExpand" class="flex-end h-18px">
      <NButton text size="tiny" @click="isExpand = !isExpand">
        {{ `${time.h}:${time.i}:${time.s}` }}
      </NButton>
    </div>
    <div
      v-else
      class="bg-#2e2e44 h-60px flex-center flex-col cursor-pointer"
      @click="isExpand = !isExpand"
    >
      <div class="flex-center h-40px gap-4px">
        <span class="hours font-500 text-40px">{{ time.h }}</span>
        <span class="h-30px text-center leading-30px text-30px text-#929292"
          >:</span
        >
        <span class="minutes font-500 text-40px">{{ time.i }}</span>
        <div class="flex flex-col text-14px">
          <span class="period">
            {{ +time.h >= 12 ? 'PM' : 'AM' }}
          </span>
          <span class="seconds">{{ time.s }}</span>
        </div>
      </div>
      <div class="calender h-20px text-14px">
        <span> {{ time.m }}, </span>
        <span>{{ time.w }}</span>
        <span>&nbsp;{{ time.d }}</span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  import { NButton } from 'naive-ui';

  import { onBeforeUnmount, onMounted, ref } from 'vue';

  const isExpand = ref(false);
  const time = ref({
    y: '',
    m: '',
    w: '',
    d: '',
    h: '',
    i: '',
    s: '',
  });
  const interval = ref<NodeJS.Timeout | null>(null);
  function updateTime() {
    const now = new Date();
    const dayNum = now.getDate();
    const year = now.getFullYear();
    const dayName = now.toLocaleString('default', { weekday: 'long' });
    const monthName = now.toLocaleString('default', { month: 'short' });
    const hours = now.getHours().toString().padStart(2, '0'); // 补零
    const minutes = now.getMinutes().toString().padStart(2, '0'); // 补零
    const seconds = now.getSeconds().toString().padStart(2, '0'); // 补零
    time.value = {
      y: year.toString(),
      m: monthName,
      w: dayName,
      d: dayNum.toString(),
      h: hours,
      i: minutes,
      s: seconds,
    };
  }
  onMounted(() => {
    updateTime(); // 初始时更新一次时间
    interval.value = setInterval(updateTime, 1000); // 每秒更新一次时间
  });

  onBeforeUnmount(() => {
    interval.value && clearInterval(interval.value);
  });
</script>

<style lang="css" scoped>
  * {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .hours {
    background: -webkit-linear-gradient(90deg, #634dff, #5fd4ff);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .minutes {
    background: -webkit-linear-gradient(90deg, #ff5e9e, #ffb960);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }

  .period {
    background: -webkit-linear-gradient(90deg, #f7b63f, #faf879);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .seconds {
    background: -webkit-linear-gradient(90deg, #24ff6d, #2f93f1);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }

  .calender {
    background: -webkit-linear-gradient(90deg, #ae4af6, #ff98d1);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
</style>
