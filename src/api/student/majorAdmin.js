import request from '@/utils/fetch'
/**
 * 分页 专业管理员获取学生信息列表
 * @param {Number} page
 * @param {Number} [size = 10]
 * @return {Promise}
 */
export function fetchStudentByPage(page, size = 10) {
  return request.get('/stu/base/major', {
    params: {
      page,
      size
    }
  })
}
/**
 * 专业管理员获取学生信息
 * @param {Number} stuId
 * @param {Number} [page = 0]
 * @param {Number} [size = 10]
 * @return {Promise}
 */
/* export function fetchStudentByStuId(stuId, page = 0, size = 10) {
  return request.get('/stu/base/major/class', {
    params: {
      stuId,
      page,
      size
    }
  })
} */
/**
 * 专业管理员获取学生信息
 * @param {Number} stuId
 * @return {Promise}
 */
export function fetchStudentByStuId(stuId) {
  return request.get('/stu/base/major/stuid', {
    params: {
      stuId
    }
  })
}
/**
 * 专业管理员修改学生信息
 * @param {JSON} data
 * @param {Number} data.stuId
 * @param {Number} data.dormitoryId
 * @param {String} data.political
 * @return {Promise}
 */
export function updateStudent(data) {
  return request({
    url: '/stu/base/major/stuid',
    method: 'PUT',
    data
  })
}
