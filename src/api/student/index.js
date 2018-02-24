import request from '@/utils/fetch'
/**
 * 用户获取学生信息
 * @return {Promise}
 */
export function fetchStuBaseInfo() {
  return request.get('stu/base')
}
/*
GET /stu/base 用户获取学生信息
GET /stu/base/class 班级管理员获取学生信息列表
GET /stu/base/class/stuid 班级管理员获取学生信息(stuid)
PUT /stu/base/class/stuid 班级管理员修改学生信息(stuid)
GET /stu/base/major 专业管理员获取学生信息列表
GET /stu/base/major/class 专业管理员获取学生信息(class)
GET /stu/base/major/stuid 专业管理员获取学生信息(stuid)
PUT /stu/base/major/stuid 专业管理员修改学生信息(stuid)
GET /stu/base/school 校级管理员获取学生信息列表
GET /stu/base/school/class 校级管理员获取学生信息(class)
GET /stu/base/school/dormitory 校级管理员获取学生信息(dormitory)
GET /stu/base/school/major 校级管理员获取学生信息(major)
GET /stu/base/school/stuid 校级管理员获取学生信息(stuid)
PUT /stu/base/school/stuid 校级管理员修改学生信息(stuid),班级和寝室缺省传-1
*/
