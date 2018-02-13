import md5 from 'md5'
import types from '../mutation-types'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  login,
  logout
} from '@/api/user'
const user = {
  state: {
    user: null,
    token: getToken()
  },
  mutations: {
    [types.SET_TOKEN](state, token) {
      state.token = token
    },
    [types.SET_USER](state, user) {
      state.user = user
    }
  },
  actions: {
    login({
      commit
    }, {
      username,
      password
    }) {
      return new Promise((resolve, reject) => {
        password = md5(password).toUpperCase()
        const timestamp = new Date().getTime()
        const nonce = Math.round(2147483647 * Math.random()) * timestamp % 1e10
        login({
          timestamp,
          nonce,
          username,
          password
        }).then((res) => {
          const token = res.data
          commit(types.SET_TOKEN, token)
          setToken(token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit(types.SET_TOKEN, '')
          removeToken()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo({
      commit
    }) {
      commit(types.SET_USER, {
        name: 'LikaiLee'
      })
    }
  }
}

export default user
