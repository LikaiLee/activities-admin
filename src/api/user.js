import fetch from '@/utils/fetch'

export function getUserInfo(data) {
  /* return Promise.resolve({
    code: 200,
    data: {
      data
    }
  }) */
  return fetch({
    url: '/getUserInfo',
    method: 'get',
    data
  })
}
