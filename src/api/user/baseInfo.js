import request from '@/utils/fetch'

/**
 * 获取用户信息
 * @return {Promise}
 */
export function fetchBaseInfo() {
  return request.get('/baseinfo')
}
/**
 * 用户修改基础信息
 * @param {JSON} data
 * @param {String} data.email
 * @return {Promise}
 */
export function updateBaseInfo(data) {
  return request({
    url: '/baseinfo',
    method: 'PUT',
    data
  })
}
