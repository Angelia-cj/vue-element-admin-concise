/*
 * @description: 修改浏览器标签页的根title
 * @Author: changjia
 * @Date: 2021-12-01 21:41:48
 * @LastEditors: changjia
 * @LastEditTime: 2021-12-01 21:44:05
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Concise'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
