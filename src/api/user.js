import request from '@/utils/fetch'

/**
 * 登录
 * @param {JSON} data
 * @param {String} data.username
 * @param {String} data.password
 * @return {Promise}
 */
export function login(data) {
  return request.post('/token', data)
}
/**
 * 登出
 * @return {Promise}
 */
export function logout() {
  return request.delete('/token')
}
/**
 * 验证Token
 * @return {Promise}
 */
export function validteToken() {
  return request.get('/token')
}

/**
 * 获取路由菜单
 * @return {Promise}
 */
export function fetchRoutes() {
  return request.post('https://www.easy-mock.com/mock/5a7bfd3ea7b3ff4311b6778f/dev/menu')
  // return request.get('/menu')
}

/**
 * 获取用户信息
 * @return {Promise}
 */
export function fetchUserInfo() {
  return request.get('/baseinfo')
}
/**
 * 用户修改基础信息
 * @param {JSON} data
 * @param {String} data.email
 * @return {Promise}
 */
export function updateBaseInfo(data) {
  return request({
    url: '/baseinfo',
    method: 'PUT',
    data
  })
}
