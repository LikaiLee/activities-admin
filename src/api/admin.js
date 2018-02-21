import request from '@/utils/fetch'

/**
 * 通过userId获取通知
 * @param {Number} userId
 * @return {Promise}
 */
export function fetchInformByUserId(userId) {
  return request.get(`/inform/user/${userId}`)
}
/**
 * 分页获取通知
 * @param {Number} page
 * @param {Number} size
 * @return {Promise}
 */
export function fetchInformByPage(page, size = 6) {
  return request({
    url: `/inform/page/${page}`,
    method: 'GET',
    params: {
      size
    }
  })
  // return request.get(`http://localhost:3000/actMock/inform/page/${page}`)
}
/**
 * 管理员删除通知
 * @param {Number} informId
 */
export function deleteInformById(informId) {
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
export function updateInform(data) {
  return request({
    url: '/inform/admin',
    method: 'PUT',
    data
  })
}
