<!--
 * @description: 横向导航栏
 * @Author: changjia
 * @Date: 2021-11-19 19:51:27
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-19 20:43:42
-->
<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :is-active="sidebar.opened" @toggleClick="toggleSidebar"></hamburger>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toggleSidebar(){}
  },
}
</script>

<style lang="scss" scoped>

</style>

