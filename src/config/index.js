export const APP_NAME = '学生课外活动管理系统'
export const WHITE_LIST = ['/login', '/404', '/noredirect', '/test', '/inform/detail/'] // 不重定向地址

export const TOKEN_KEY = 'TOKEN_ACTIVITIES'
export const AUTH_NAME = 'Authorization'
export const STATUS_OK = 200
export const STATUS_INVALID_TOKEN = 401 // TOKEN 过期
export const STATUS_UNAUTHORIZED = 402 // 未授权
export const scoreTypes = {
  ACTIVITY: 'activity',
  HONOR: 'honor',
  OFFICE: 'office',
  PRACTICE: 'practice',
  RESERVE: 'reserve',
  SKILL: 'skill',
  VOLUNTEER: 'volunteer'
}
export const stuExcelTplFields = ['学号', '姓名', '性别', '邮箱', '政治面貌', '入学时间', '班级id', '寝室id']
export const stuActivityTplFields = ['活动名称', '活动时间', '学号', '姓名', '备注']
export const stuHonorTplFields = ['学号', '姓名', '荣誉名称', '等级', '加分', '备注']
export const stuOfficeTplFields = ['学号', '姓名', '岗级', '岗位', '开始时间', '结束时间', '备注']
export const stuPracticeTplFields = ['学号', '姓名', '实践名称', '实践时间', '实践结果', '备注']
export const stuReserveTplFields = ['学号', '姓名', '加分原因', '加分', '备注']
export const stuSkillTplFields = ['学号', '姓名', '技能名称', '等级', '技能加分', '备注']
export const stuVolunteerTplFields = ['学号', '姓名', '志愿名称', '志愿时间', '志愿时长', '备注']
