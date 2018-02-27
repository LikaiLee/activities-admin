import request from '@/utils/fetch'
/**
 * 用户获取学生信息
 * @return {Promise}
 */
export function fetchStuBaseInfo() {
  return request.get('stu/base')
}

/**
 * 用户获取活动
 * @param {JSON} params
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchActivity(params) {
  return request({
    url: '/stu/activity',
    method: 'GET',
    params
  })
}
