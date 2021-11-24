/*
 * @description: 二次封装axios
 * @Author: changjia
 * @Date: 2021-11-16 20:59:55
 * @LastEditors: changjia
 * @LastEditTime: 2021-11-24 15:44:25
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // 以'dev-api' 作为开发环境公共路径(在.env.development文件中设置)
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['X-Token']是一个自定义头键,真实的是['token']
      // 请根据实际情况进行修改
      // config.headers['token'] = getToken()
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
/**
 * 如果你想获得http信息，如头部信息或状态
 * 请返回 response => response
 *
 * 通过自定义代码确定请求状态
 * 这里只是一个例子，您也可以通过HTTP状态码判断状态
 */
service.interceptors.response.use(
  response => {
    const res = response.data

    // 如果自定义状态码不是20000，则判定为错误 成功时，返回的不是20000
    if (res.code !== 20000 && res.code !== 200) {
      Message({
        message: res.message || '错误！',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法token; 50012:其他客户端登录; 50014:令牌过期
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm(
          '您已注销，您可以取消停留在此页面，或重新登录!',
          '登录退出提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return Promise.reject(new Error(res.message || '错误！'))
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service