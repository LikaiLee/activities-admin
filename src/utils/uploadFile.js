import axios from 'axios'
import {
  AUTH_NAME
} from '@/config'
import {
  getToken
} from '@/utils/auth'
export default function(url, opts) {
  const formData = new FormData()
  for (const key in opts) {
    if (opts.hasOwnProperty(key)) {
      formData.append(key, opts[key])
    }
  }
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
