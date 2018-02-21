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
  // return request.get(`http://localhost:3000/actMock/inform/id/${id}`)
}
/**
 * 分页获取通知
 * @param {Number} page
 * @return {Promise}
 */
export function fetchInformByPage(page) {
  return request.get(`/inform/page/${page}`)
  // return request.get(`http://localhost:3000/actMock/inform/page/${page}`)
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

/**
 * 管理员删除通知
 * @param {Number} informId
 */
export function adminDeleteInformById(informId) {
  return request({
    url: `/inform/admin?informId=${informId}`,
    method: 'DELETE'
  })
}
/**
 * 管理员修改通知
 * @param {JSON} data
 * @param {Number} data.informId
 * @param {String} data.title
 * @param {String} data.content
 */
export function adminUpdateInformById(data) {
  return request({
    url: '/inform/admin',
    method: 'PUT',
    data
  })
}
/**
 * 用户删除通知
 * @param {Number} informId
 */
export function userDeleteInformById(informId) {
  return request({
    url: `/inform?informId=${informId}`,
    method: 'DELETE'
  })
}
/**
 * 用户修改通知
 * @param {JSON} data
 */
export function userUpdateInformById(data) {
  return request({
    url: '/inform',
    method: 'PUT',
    data
  })
}
