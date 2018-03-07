import axios from 'axios'
import uploadFile from '@/utils/uploadFile'

/**
 * 上传Excel
 * @param {File} file
 */
export function uploadStuFile(file) {
  return uploadFile('/stu/db/base/file', {
    file
  })
}
/**
 * 活动
 * @param {File} file
 */
export function uploadActivityFile(file) {
  return uploadFile('/stu/db/activity/file', {
    file
  })
}
/**
 * 荣誉
 * @param {File} file
 */
export function uploadHonorFile(file) {
  return uploadFile('/stu/db/honor/file', {
    file
  })
}
/**
 * 任职
 * @param {File} file
 */
export function uploadOfficeFile(file) {
  return uploadFile('/stu/db/office/file', {
    file
  })
}
/**
 * 实践
 * @param {File} file
 */
export function uploadPracticeFile(file) {
  return uploadFile('/stu/db/practice/file', {
    file
  })
}
/**
 * 其他
 * @param {File} file
 */
export function uploadReserveFile(file) {
  return uploadFile('/stu/db/reserve/file', {
    file
  })
}
/**
 * 技能
 * @param {File} file
 */
export function uploadSkillFile(file) {
  return uploadFile('/stu/db/skill/file', {
    file
  })
}
/**
 * 志愿
 * @param {File} file
 */
export function uploadVolunteerFile(file) {
  return uploadFile('/stu/db/volunteer/file', {
    file
  })
}

/**
 * 下载模板文件
 */
export function downloadStuTemplate() {
  return axios({
    method: 'GET',
    url: '/stu/db/base/file',
    baseURL: process.env.BASE_URL,
    responseType: 'blob',
    timeout: 5000
  })
}
