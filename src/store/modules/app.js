/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 20:56:46
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-16 22:21:37
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
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
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
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }) {
    commit('TOGGLE_DEVICES')
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
