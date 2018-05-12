import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  AUTH_NAME,
  STATUS_OK,
  STATUS_INVALID_TOKEN
} from '@/config'
import {
  getToken
} from '@/utils/auth'
export default (url, opts) => {
  const formData = new FormData()
  for (const key in opts) {
    if (opts.hasOwnProperty(key)) {
      formData.append(key, opts[key])
    }
  }

  axios.interceptors.response.use(
    response => {
      const {
        status,
        message
      } = response.data
      const debug = process.env.NODE_ENV !== 'production'
      if (debug) {
        console.log(response.data)
        /* const url = response.request.responseURL.split('//')[1]
        const urlFix = url.substr(url.indexOf('/'))
        const method = response.config.method
        console.log(`${method} ${urlFix}`, response.data) */
      }
      if (status !== STATUS_OK) {
        Message({
          message: message || '操作失败!',
          type: 'error',
          duration: 3 * 1000
        })
        if (status === STATUS_INVALID_TOKEN) {
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
    }
  )

  return axios({
    headers: {
      [AUTH_NAME]: getToken(),
      'Content-Type': 'multipart/form-data'
    },
    url,
    baseURL: process.env.BASE_URL,
    timeout: 5000,
    method: 'POST',
    data: formData
  })
}
