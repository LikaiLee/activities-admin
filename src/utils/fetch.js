import axios from 'axios'
import qs from 'qs'
import {
  // MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import {
  AUTH_NAME,
  STATUS_OK,
  STATUS_INVALID_TOKEN
} from '@/config'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers[AUTH_NAME] = getToken()
  }
  if (config.method === 'post' ||
    config.method === 'delete' ||
    config.method === 'put') {
    config.data = qs.stringify(config.data)
  }
  // console.log(config)
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
      const urlFix = url.substr(url.indexOf('/'))
      const method = response.config.method
      console.log(`${method} ${urlFix}`, response.data)
    }

    const {
      status,
      message
    } = response.data
    if (status !== STATUS_OK) {
      Message({
        message: message || '操作失败!',
        type: 'error',
        duration: 3 * 1000
      })
      if (status === STATUS_INVALID_TOKEN) {
        /* MessageBox.confirm('登录凭据到期，已退出登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {}) */
        store.dispatch('fedLogout').then(() => {
          location.reload()
        })
      }
      return Promise.reject('操作失败')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
