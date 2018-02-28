import request from '@/utils/fetch'
/**
 * 分页 校级管理员获取学生信息列表
 * @param {Number} page
 * @param {Number} [size = 10]
 * @return {Promise}
 */
export function fetchStudentByPage(page, size = 10) {
  return request.get('/stu/base/school', {
    params: {
      page,
      size
    }
  })
}
/**
 * 校级管理员获取学生信息
 * @param {String} stuId
 * @return {Promise}
 */
export function fetchStudentByStuId(stuId) {
  return request.get('/stu/base/school/stuid', {
    params: {
      stuId
    }
  })
}

/**
 * 校级管理员修改学生信息
 * @param {JSON} data
 * @param {String} data.stuId
 * @param {String} data.realName
 * @param {String} data.sex
 * @param {Number} data.classId
 * @param {String} data.photo
 * @param {String} data.entranceTime
 * @param {Number} data.dormitoryId
 * @param {String} data.political
 * @return {Promise}
 */
export function updateStudent(data) {
  return request({
    url: '/stu/base/school/stuid',
    method: 'PUT',
    data
  })
}

/**
 * 校级管理员获取活动
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchActivity(params) {
  return request({
    url: '/stu/activity/school',
    method: 'GET',
    params
  })
}
/**
 * 校级管理员获取荣誉
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchHonor(params) {
  return request.get('/stu/honor/school', {
    params
  })
}

/**
 * 校级管理员获取职位
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchOffice(params) {
  return request.get('/stu/office/school', {
    params
  })
}
/**
 * 校级管理员获取实践
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchPractice(params) {
  return request.get('/stu/practice/school', {
    params
  })
}
/**
 * 校级管理员获取加分
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchReserve(params) {
  return request.get('/stu/reserve/school', {
    params
  })
}
/**
 * 校级管理员获取技能
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchSkill(params) {
  return request.get('/stu/skill/school', {
    params
  })
}
/**
 * 校级管理员获取志愿
 * @param {JSON} params
 * @param {String} params.stuId
 * @param {String} params.term
 * @param {Number} params.page
 * @param {Number} [params.size]
 */
export function fetchVolunteer(params) {
  return request.get('/stu/volunteer/school', {
    params
  })
}
