/*
 * @description:获取token
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 21:50:17
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-12 21:56:17
 */
import Cookies from 'js-cookie'

const TokenKey = 'vue_element_admin_concise_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
