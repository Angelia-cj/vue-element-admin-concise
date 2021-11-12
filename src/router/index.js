/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 18:27:50
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-12 22:31:17
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 创建路由对象
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 页面必须放到最后
  {
    path: '*',
    // redirect: '/404',
    redirect: '/login',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', //路由模式，默认为hash
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 创建路由实例
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
