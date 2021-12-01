<!--
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 20:44:50
 * @LastEditors: changjia
 * @LastEditTime: 2021-12-01 19:21:29
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      登录用户：{{ name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 24px;
    line-height: 50px;
  }
}
</style>
