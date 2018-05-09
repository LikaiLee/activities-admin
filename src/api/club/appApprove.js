import request from '@/utils/fetch'

/**
 * 审核表单
 * @param {Number} data.appId
 * @param {Number} data.result
 * @param {String} data.comment
 */
export function postApproval(data) {
  return request({
    url: '/club/approval',
    method: 'POST',
    data
  })
}
