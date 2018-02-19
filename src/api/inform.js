import request from '@/utils/fetch'

/**
 * 发通知
 * @param {JSON} data
 * @param {String} data.title
 * @param {String} data.content
 * @return {Promise}
 */
export function postInform(data) {
  return request.post('/inform', data)
}

/**
 * 通过id获取通知
 * @param {Number} id
 * @return {Promise}
 */
export function fetchInformById(id) {
  return request.get(`/inform/id/${id}`)
}
/**
 * 分页获取通知
 * @param {Number} page
 * @return {Promise}
 */
export function fetchInformByPage(page) {
  return request.get(`https://www.easy-mock.com/mock/5a7bfd3ea7b3ff4311b6778f/dev/inform/page`)
}
/**
 * 获取用户已发通知
 * @return {Promise}
 */
export function fetchUserInform() {
  return request.get('/inform/user')
}
/**
 * 通过userId获取通知
 * @param {Number} userId
 * @return {Promise}
 */
export function fetchInformByUserId(userId) {
  return request.get(`/inform/user/${userId}`)
}
