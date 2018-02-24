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
