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
} from '@/api/token'
import {
  fetchBaseInfo
} from '@/api/user/baseInfo'
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
        const md5password = md5(password).toUpperCase()
        const timestamp = new Date().getTime()
        const nonce = Math.round(2147483647 * Math.random()) * timestamp % 1e10
        login({
          timestamp,
          nonce,
          username,
          password: md5password
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
    // 前端登出
    fedLogout({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit(types.SET_TOKEN, '')
        removeToken()
        resolve()
      })
    },
    // 前后台同时登出
    logout({
      commit
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
      return new Promise((resolve, reject) => {
        fetchBaseInfo().then((res) => {
          commit(types.SET_USER, res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
