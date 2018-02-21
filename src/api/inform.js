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
 * 获取当前用户已发通知
 * @return {Promise}
 */
export function fetchUserInform() {
  return request.get('/inform/user')
}

/**
 * 用户删除通知
 * @param {Number} informId
 */
export function deleteInformById(informId) {
  return request({
    url: `/inform?informId=${informId}`,
    method: 'DELETE'
  })
}
/**
 * 用户修改通知
 * @param {JSON} data
 * @param {Number} data.informId
 * @param {String} data.title
 * @param {String} data.content
 */
export function updateInform(data) {
  return request({
    url: '/inform',
    method: 'PUT',
    data
  })
}
