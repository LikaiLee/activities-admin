import request from '@/utils/fetch'
/**
 * 分页 班级管理员获取学生信息列表
 * @param {Number} page
 * @param {Number} [size = 10]
 * @return {Promise}
 */
export function fetchStudentByPage(page, size = 10) {
  return request.get('/stu/base/class', {
    params: {
      page,
      size
    }
  })
}
/**
 * 班级管理员通过学号获取学生信息
 * @param {Number} stuId
 * @return {Promise}
 */
export function fetchStudentByStuId(stuId) {
  return request.get('/stu/base/class/stuid', {
    params: {
      stuId
    }
  })
}
/**
 * 班级管理员修改学生信息
 * @param {JSON} data
 * @param {Number} data.stuId
 * @param {String} data.political
 * @return {Promise}
 */
export function updateStudent(data) {
  return request({
    url: '/stu/base/class/stuid',
    method: 'PUT',
    data
  })
}

/**
 * 班级管理员获取活动
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchActivity(params) {
  return request({
    url: '/stu/activity/class',
    method: 'GET',
    params
  })
}
/**
 * 班级管理员获取荣誉
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchHonor(params) {
  return request.get('/stu/honor/class', {
    params
  })
}
/**
 * 班级管理员获取职位
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchOffice(params) {
  return request.get('/stu/office/class', {
    params
  })
}
/**
 * 班级管理员获取实践
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchPractice(params) {
  return request.get('/stu/practice/class', {
    params
  })
}
/**
 * 班级管理员获取加分
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchReserve(params) {
  return request.get('/stu/reserve/class', {
    params
  })
}
/**
 * 班级管理员获取技能
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchSkill(params) {
  return request.get('/stu/skill/class', {
    params
  })
}
/**
 * 班级管理员获取志愿
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchVolunteer(params) {
  return request.get('/stu/volunteer/class', {
    params
  })
}
