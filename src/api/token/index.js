import request from '@/utils/fetch'

/**
 * 登录
 * @param {JSON} data
 * @param {String} data.username
 * @param {String} data.password
 * @return {Promise}
 */
export function login(data) {
  return request.post('/token', data)
}
/**
 * 登出
 * @return {Promise}
 */
export function logout() {
  return request.delete('/token')
}
/**
 * 验证Token
 * @return {Promise}
 */
export function validteToken() {
  return request.get('/token')
}
