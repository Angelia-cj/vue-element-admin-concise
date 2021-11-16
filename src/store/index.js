/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 21:37:59
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-16 22:56:34
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
