/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 20:56:57
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-16 22:00:23
 */
import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
}

const mutations = {
    CHANGE_SETTINGS: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSettings({ commit }, data) {
        commit('CHANGE_SETTINGS', data)
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}