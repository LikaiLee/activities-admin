const KEY = 'rl'
export const getRole = () => {
  return localStorage.getItem(KEY)
}
export const setRole = (role) => {
  return localStorage.setItem(KEY, role)
}
export const removeRole = () => {
  return localStorage.removeItem(KEY)
}
