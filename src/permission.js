/*
 * @description:通过token判断，路由跳转的页面
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 19:23:00
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-15 14:22:03
 */
import router from './router'
import store from './store'

import { Message } from 'element-ui'

import NProgress from 'nprogress' // 页面跳转出现在浏览器顶部的进度条
import 'nprogress/nprogress.css' // 进度条样式

import { getToken } from '@/utils/auth' // 从cookie中获取token

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login'] //没有重定向白名单

//全局前置守卫
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()

  // 判断用户是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // 移除令牌，到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '获取用户信息错误！')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有令牌
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单用户免登录，直接跳转
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`);
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度
  NProgress.done()
})