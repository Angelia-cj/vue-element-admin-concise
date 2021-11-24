/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 20:56:46
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-24 22:02:13
 */
import Cookies from 'js-cookie'

/**
 * component ——（dispatch：派遣）——> actions
 * actions ——（commit：提交）——> mutations
 * mutations ——（mutate：状态改变）——> state
 * state ——（render：渲染）——> component
 */

// 状态数据源，渲染到组件
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

/**
 * mutation 必须同步执行
 */
// 更改状态的唯一方法是提交 mutation 并返给 state
const mutations = {
  // 切换侧边导航栏的开关
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      // 如果打开，设置status=1
      Cookies.set('sidebarStatus', 1)
    } else {
      // 如果关闭，设置status=0
      Cookies.set('sidebarStatus', 0)
    }
    // 刷新后通过cookies保留sidebar.opened状态
  },
  // 关闭侧边导航栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备类型
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

/**
 * Action 提交的是 mutation，而不是直接变更状态
 * Action 可以包含任意异步操作
 */
// 提交改变的数据 到 mutations
const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSidebar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }) {
    commit('TOGGLE_DEVICES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
