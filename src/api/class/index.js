import request from '@/utils/fetch'

/**
 * 获取当前所有年级
 */
export function fetchAllYear() {
  return request.get('/stu/year')
}

/**
 * 获取指定年级所有专业
 * @param {Number} year
 */
export function fetchMajorByYear(year) {
  return request({
    url: '/stu/major',
    method: 'GET',
    params: {
      year
    }
  })
}

/**
 * 获取指定专业所有班级
 * @param {Number} majorId
 */
export function fetchClassByMajor(majorId) {
  return request({
    url: '/stu/class',
    method: 'GET',
    params: {
      majorId
    }
  })
}
