import request from '@/utils/fetch'

/**
 * 获取路由菜单
 * @return {Promise}
 */
export function fetchRoutes() {
  // return request.post('https://www.easy-mock.com/mock/5a7bfd3ea7b3ff4311b6778f/dev/menu')
  return request.get('/menu')
}
