/*
 * @description:获取token
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 21:50:17
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-24 17:18:00
 */
import Cookies from 'js-cookie' // js-cookie是一个第三方库，可以简化cookies操作

const TokenKey = 'vue_element_admin_concise_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}