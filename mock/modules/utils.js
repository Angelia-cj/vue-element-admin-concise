/*
 * @description:
 * @Author: changjia
 * @Date: 2021-11-22 21:08:31
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-22 21:14:38
 */
/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const value = v.substring(index + 1, v.length)
      obj[name] = value
    }
  })
  return obj
}

module.exports = {
  param2Obj
}


