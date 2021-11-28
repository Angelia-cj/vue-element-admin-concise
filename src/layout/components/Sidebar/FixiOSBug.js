/*
 * @description:
 * @Author: changjia
 * @Date: 2021-11-19 19:48:53
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-19 99:48:53
 */
export default {
  name: 'FixiOsBug',
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    // 为了修复ios设备上的点击菜单会触发鼠标离开的bug
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS() {
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = e => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}