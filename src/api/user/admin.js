import request from '@/utils/fetch'
import md5 from 'md5'
/**
 * 分页 管理员获取所有用户账号信息
 * @param {Number} page
 * @param {Number} [size = 10]
 * @return {Promise}
 */
export function fetchBaseInfoByPage(page, size = 10) {
  return request.get('/baseinfo/admin', {
    params: {
      page,
      size
    }
  })
}
/**
 * 管理员修改基础信息
 * @param {JSON} data
 * @param {Number} data.userId
 * @param {String} data.realName
 * @param {String} data.email
 * @param {String} data.sex
 */
export function updateBaseInfo(data) {
  return request({
    url: '/baseinfo/admin',
    method: 'PUT',
    data
  })
}

/**
 * 管理员修改密码
 * @param {JSON} data
 * @param {String} data.userId
 * @param {String} data.password
 */
export function updatePassword({
  userId,
  password
}) {
  const md5Password = md5(password).toUpperCase()
  return request({
    url: '/user/admin',
    method: 'PUT',
    data: {
      userId,
      password: md5Password
    }
  })
}
