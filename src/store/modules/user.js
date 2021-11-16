/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-16 20:57:03
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-16 22:54:12
 */
import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject("验证失败，请重新登录!");
        }

        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 必须先移除令牌
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
