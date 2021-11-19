/*
 * @description: 监听浏览器窗口变化
 *    WIDTH > 992是桌面端。反之是移动端
 *    this.device:设备类型（mobile：移动端，desktop：桌面端）
 *    this.sidebar.opened：判断侧边导航栏的关闭和打开
 *    withoutAnimation：判断是否显示动画的类名
 * @Author: changjia
 * @Date: 2021-11-16 20:55:33
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-19 21:07:13
 */
import store from '@/store'

const { body } = document
const WIDTH = 992 // 参考Bootstrap的响应式设计

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSidebar', { withoutAnimation: false })
      }
    }
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }
  },
  $_resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.$_isMobile()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        store.dispatch('app/close_sidebar', { withoutAnimation: true })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSidebar', { withoutAnimation: true })
    }
  }
}
