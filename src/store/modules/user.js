/*
 * @description: this.$store.commit()触发--->mutations
                this.$store.dispatch()触发--->actions
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 20:57:03
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-24 21:55:19
 */
import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  // 返回的是state对象
  return {
    token: getToken(), // 登录后的token存储，登录只返回token。先从cookies当中获取，获取不到再登录一次设置
    name: '', // 获取用户信息后存储用户的名称
    avatar: '' // 获取用户信息后存储用户的头像
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 登录后设置用户token，存储到state
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 获取用户信息后，设置用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 获取用户信息后，设置用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录 user/login
  login({ commit }, userInfo) {
    const { username, password } = userInfo // 解构赋值
    return new Promise((resolve, reject) => {
      // api中的login接口
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token) // 提交第一次设置token
        setToken(data.token) // 存储token到Cookies当中
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 使用 async，await方式
  /* async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const response = await login({ username: username.trim(), password: password })
    if (response.code === 20000) {
      const { data } = response
      commit('SET_TOKEN', data.token) // 提交第一次设置token
      setToken(data.token) // 存储token到Cookies当中
      return 'ok!'
    } else {
      return Promise.reject(new Error('失败了！'))
    }
  }, */

  // 获取用户信息 get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // api中的getInfo接口
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('验证失败，请重新登录!')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // api接口中的logout
      logout(state.token).then(() => {
        removeToken() // 必须先移除令牌
        resetRouter() // 重新设置路由，与权限有关
        commit('RESET_STATE')
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true, // 正确写法
  state,
  mutations,
  actions
}
