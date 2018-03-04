import axios from 'axios'
import uploadFile from '@/utils/uploadFile'
import request from '@/utils/fetch'

/**
 * 上传Excel
 * @param {File} file
 */
export function uploadStuFile(file) {
  return uploadFile('/stu/db/base/file', {
    file
  })
}

/**
 * 下载模板文件
 */
export function downloadStuTemplate() {
  return axios({
    method: 'GET',
    url: '/stu/db/base/file',
    baseURL: process.env.BASE_URL,
    responseType: 'blob',
    timeout: 5000
  })
}
