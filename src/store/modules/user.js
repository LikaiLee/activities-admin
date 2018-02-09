import types from '../mutation-types'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  login
} from '@/api/login'
import {
  getUserInfo
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
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const token = res.data.data.token
          commit(types.SET_TOKEN, token)
          setToken(token)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({
      commit
    }) {
      commit(types.SET_TOKEN, '')
      removeToken()
    },
    getUserInfo({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        getUserInfo(payload).then(res => {
          commit(types.SET_USER, res.data.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
