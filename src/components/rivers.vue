<template>
  <div class="limit">
    <span>楚</span>
    <span>河</span>
    <span>汉</span>
    <span>界</span>
  </div>
</template>

<style scoped lang="scss">
  @import '@/config.scss';
  /* 楚河汉界 */
  .limit {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    height: $h;
    top: calc(50% - $h * 0.5);
    z-index: 10;
    transform: rotate(0deg) translateZ(0);

    span {
      display: inline-block;
      height: $h;
      line-height: $h;
    }
  }
</style>
