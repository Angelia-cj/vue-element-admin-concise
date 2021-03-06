/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 18:27:50
 * @LastEditors: changjia
 * @LastEditTime: 2021-12-10 18:31:30
 */
import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

// 所有路由
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () =>
      import ('@/views/login/index'), // 路由懒加载模式
    hidden: true
  },
  // 404 页面
  {
    path: '/404',
    component: () =>
      import ('@/views/404'),
    hidden: true
  },

  // 首页
  {
    path: '/', // '/'：代表首页
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () =>
        import ('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 表格和树形
  {
    path: '/tableTree',
    component: Layout,
    redirect: '/tableTree/table',
    name: 'tableTree',
    meta: { title: '表格和树形', icon: 'el-icon-s-help' },
    children: [{
        path: 'table',
        name: 'Table',
        component: () =>
          import ('@/views/tableTree/table/index'),
        meta: { title: '表格', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () =>
          import ('@/views/tableTree/tree/index'),
        meta: { title: '树形', icon: 'tree' }
      }
    ]
  },

  // 404 页面必须放到最后
  {
    path: '*',
    redirect: '/404',
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

// 向外暴露路由器对象
export default router
