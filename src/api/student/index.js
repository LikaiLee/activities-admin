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
 * @param {JSON} data
 * @param {String} term
 * @param {Number} page
 * @param {Number} [size]
 */
export function fetchActivity(data) {
  return request({
    url: '/stu/activity',
    method: 'GET',
    data
  })
}
