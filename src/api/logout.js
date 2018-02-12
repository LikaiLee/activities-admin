// import fetch from '@/utils/fetch'

export function logout(data) {
  return Promise.resolve({
    code: 200,
    data: {
      data
    }
  })
  /* return fetch({
    url: '/logout',
    method: 'get',
    data
  }) */
}
