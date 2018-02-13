import types from '../mutation-types'
import generateRoutes from '@/utils/generateRoutes'
import defaultRoutes from '@/router/defaultRoutes'
import {
  getRoutes
} from '@/api/user'

const permission = {
  state: {
    routes: defaultRoutes, // 所有可访问的路由，用于构建侧边栏菜单
    newRoutes: [] // 新增路由，用于动态构建路由表
  },
  mutations: {
    [types.SET_ROUTES](state, routes) {
      state.newRoutes = routes
      state.routes = [...defaultRoutes, ...routes]
    }
  },
  actions: {
    generateRoutes({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getRoutes().then(res => {
          const newRoutes = generateRoutes(res.data)
          commit(types.SET_ROUTES, newRoutes)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default permission
