/*
 * @description:
 * @Author: changjia
 * @Date: 2021-11-16 22:31:53
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-24 17:00:43
 */
import request from '@/utils/request'

// 获取token
export function login(data) {
  return request({
    url: '/vue-admin-concise/user/login',
    method: 'post',
    data
  })
}

// 通过token获取用户信息
export function getInfo(token) {
  return request({
    url: '/vue-admin-concise/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-concise/user/logout',
    method: 'post'
  })
}