/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 17:13:46
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-16 18:06:06
 */
import Vue from 'vue'

import SvgIcon from '@/components/SvgIcon'

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)