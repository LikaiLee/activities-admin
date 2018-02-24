import request from '@/utils/fetch'

/**
 * 管理员删除通知
 * @param {Number} informId
 */
export function deleteInformById(informId) {
  return request({
    url: `/inform/admin`,
    method: 'DELETE',
    params: {
      informId
    }
  })
}
/**
 * 管理员通过userId获取通知
 * @param {Number} userId
 * @param {Number} page
 * @param {Number} [size = 10]
 * @return {Promise}
 */
export function fetchInformByUserId(userId, page, size = 10) {
  return request({
    url: '/inform/admin',
    method: 'GET',
    params: {
      userId,
      page,
      size
    }
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
/**
 * 分页获取通知
 * @param {Number} page
 * @param {Number} [size = 6]
 * @return {Promise}
 */
export function fetchInformByPage(page, size = 6) {
  return request({
    url: `/inform/page`,
    method: 'GET',
    params: {
      page,
      size
    }
  })
}
