import axios from 'axios'
import qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }
  if (config.method === 'post' ||
    config.method === 'delete' ||
    config.method === 'put') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const debug = process.env.NODE_ENV !== 'production'
    if (debug) {
      const url = response.request.responseURL.split('//')[1]
      console.log(url.substr(url.indexOf('/')), response.data)
    }

    const {
      status,
      message
    } = response.data
    if (status !== 200) {
      Message({
        message: message || '操作失败!',
        type: 'error',
        duration: 3 * 1000
      })
      // token 失效
      if (status === 401) {
        MessageBox.confirm('登录凭据到期，已退出登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('fedLogout').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject('操作失败')
    } else {
      return response.data
    }
  },
  error => {
    console.error('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
