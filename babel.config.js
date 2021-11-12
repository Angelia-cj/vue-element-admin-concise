/*
 * @description: 
 * @version: 
 * @Author: changjia
 * @Date: 2021-11-12 15:19:42
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-12 16:02:35
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  }
}
