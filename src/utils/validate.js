/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 17:31:01
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-16 17:37:11
 */

/**
 * @param {string} path
 * @return {boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @return {boolean}
 */
export function validUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
