import request from '@/utils/fetch'

/**
 * 获取审批员可见得所有申请表
 * @param {Number} page
 * @param {Number} [size = 6]
 * @return {Promise}
 */
export function fetchAllStatus(page, size = 6) {
  return request({
    url: '/club/status/all',
    method: 'GET',
    params: {
      page,
      size
    }
  })
}
/**
 * 获取审批员可见得所有申请表
 * @param {Number} status
 * @param {Number} page
 * @param {Number} [size = 6]
 * @return {Promise}
 */
export function fetchStatusByType(status, page, size = 6) {
  return request({
    url: '/club/status/all',
    method: 'GET',
    params: {
      status,
      page,
      size
    }
  })
}
/**
 * 获取需要用户审批申请
 * @param {Number} page
 * @param {Number} [size = 6]
 * @return {Promise}
 */
export function fetchNeedApprove(page, size = 6) {
  return request({
    url: '/club/status/needApprove',
    method: 'GET',
    params: {
      page,
      size
    }
  })
}
/**
 * 获取自己社团所有申请表情况(status -1 0 1)
 * @param {Number} status
 * @param {Number} page
 * @param {Number} [size = 6]
 * @return {Promise}
 */
export function fetchSelfStatus(status, page, size = 6) {
  return request({
    url: '/club/status/self',
    method: 'GET',
    params: {
      page,
      size,
      status
    }
  })
}
/**
 * 获取自己社团所有申请表情况(status -1 0 1)
 * @param {Number} page
 * @param {Number} [size = 6]
 * @return {Promise}
 */
export function fetchSelfAllStatus(page, size = 6) {
  return request({
    url: '/club/status/self',
    method: 'GET',
    params: {
      page,
      size
    }
  })
}
