import request from '@/utils/fetch'

/**
 * 注册
 * @param {JSON} data
 * @param {String} data.username
 * @param {String} data.password
 * @param {String} data.realName
 * @param {String} data.email
 * @param {String} data.sex
 */
export function register(data) {
  return request({
    url: '/user',
    method: 'POST',
    data
  })
}

/**
 * 用户修改密码
 * @param {String} password
 */
export function updatePassword(password) {
  return request({
    url: '/user',
    method: 'PUT',
    data: {
      password
    }
  })
}
