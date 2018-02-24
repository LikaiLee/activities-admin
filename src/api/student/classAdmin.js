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
