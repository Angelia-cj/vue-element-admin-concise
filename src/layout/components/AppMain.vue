<!--
 * @description: 主框架
 * @Author: changjia
 * @Date: 2021-11-19 19:51:13
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-26 21:28:59
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
    .app-main {
      /* 50 = navbar */
      min-height: calc(100vh-50px);
      width: 100%;
      position: relative;
      overflow: hidden;
    }
    .fixed-header+.app-main {
      padding-top: 50px;
    }
</style>
<style lang="scss" scoped>
  // 修复了打开el-dialog的CSS样式错误
  .el-popup-parent--hidden {
    .fixed-header{
      padding-right: 15px;
    }
  }
</style>
