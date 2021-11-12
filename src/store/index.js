/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 21:37:59
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-12 21:42:45
 */
import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters
})

export default store

