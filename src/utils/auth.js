// import Cookies from 'js-cookie'

const TOKEN_KEY = 'TOKEN_ACTIVITIES'
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}
export const setToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token)
}
export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY)
}
