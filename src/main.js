/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 15:19:42
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-24 19:54:38
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // 格式化css

import ElementUI from 'element-ui' // 引入组件库
import 'element-ui/lib/theme-chalk/index.css' // 引入样式

import '@/styles/index.scss' // 全局css

import App from './App.vue'
import router from './router'
import store from './store'

import '@/icons' // svg图标
import '@/permission' // 路由跳转权限控制

/**
 * 如果你不想使用mock-server
 * 你想使用MockJs进行模拟api
 * 可以执行mockXHR()
 * 目前MockJs将在生产环境中使用，
 * 请在上线前删除!！！
 */
// if (process.env.NODE_ENV === 'development') {
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 浏览器控制台不显示非生成环境打包的提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
