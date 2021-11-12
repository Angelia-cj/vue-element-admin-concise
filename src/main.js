/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 15:19:42
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-12 22:11:56
 */
import Vue from 'vue'

import ElementUI from 'element-ui'


import App from './App.vue'
import router from './router'
import store from './store'


import '@/permission' // 权限控制

/**
 * 如果你不想使用mock-server
 * 你想使用MockJs进行模拟api
 * 可以执行mockXHR()
 * 目前MockJs将在生产环境中使用，
 * 请在上线前删除!！！
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mocks')
  mockXHR()
}

Vue.use(Router)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
