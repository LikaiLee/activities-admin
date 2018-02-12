import fetch from '@/utils/fetch'

export function login(data) {
  /* return Promise.resolve({
    code: 200,
    data
  }) */
  return fetch({
    url: '/token',
    method: 'POST',
    data
  })
}
