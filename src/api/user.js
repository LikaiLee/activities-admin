import fetch from '@/utils/fetch'

export function getUserInfo(data) {
  return fetch({
    url: '/getUserInfo',
    method: 'get',
    data
  })
}
