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
/**
 * 用户获取荣誉
 * @param {JSON} params
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchHonor(params) {
  return request.get('/stu/honor', {
    params
  })
}
/**
 * 用户获取职位
 * @param {JSON} params
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchOffice(params) {
  return request.get('/stu/office', {
    params
  })
}
/**
 * 用户获取实践
 * @param {JSON} params
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchPractice(params) {
  return request.get('/stu/practice', {
    params
  })
}
/**
 * 用户获取加分
 * @param {JSON} params
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchReserve(params) {
  return request.get('/stu/reserve', {
    params
  })
}
/**
 * 用户获取技能
 * @param {JSON} params
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchSkill(params) {
  return request.get('/stu/skill', {
    params
  })
}
/**
 * 用户获取志愿
 * @param {JSON} params
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchVolunteer(params) {
  return request.get('/stu/volunteer', {
    params
  })
}
