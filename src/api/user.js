import fetch from '@/utils/fetch'

export function login(data) {
  return fetch({
    url: 'http://120.25.240.194:8080/token',
    method: 'POST',
    data
  })
}

export function logout() {
  return fetch({
    url: 'http://120.25.240.194:8080/token',
    method: 'DELETE'
  })
}
/**
 * 获取路由菜单
 * @return {Promise}
 */
export function getRoutes() {
  return fetch({
    url: 'https://www.easy-mock.com/mock/5a7bfd3ea7b3ff4311b6778f/dev/menu',
    // url: 'http://120.25.240.194:8080/menu',
    method: 'POST'
  })
}
