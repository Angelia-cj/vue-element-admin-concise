/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 21:40:09
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-16 22:21:32
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}

export default getters