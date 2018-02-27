import types from '../mutation-types'
import generateRoutes from '@/utils/generateRoutes'
import Layout from '@/views/layout'
import defaultRoutes from '@/router/defaultRoutes'
import router from '@/router'
import {
  fetchRoutes
} from '@/api/menu'
const _import = require('../../router/_import_' + process.env.NODE_ENV)

const permission = {
  state: {
    routes: defaultRoutes, // 所有可访问的路由，用于构建侧边栏菜单
    newRoutes: [] // 新增路由，用于动态构建路由表
  },
  mutations: {
    [types.SET_ROUTES](state, routes) {
      state.newRoutes = routes
      state.routes = [...defaultRoutes, ...routes]
    },
    [types.ADD_ADMIN_ROLE_ROUTE](state, route) {
      state.routes.push(route)
    }
  },
  actions: {
    generateRoutes({
      commit
    }) {
      return new Promise((resolve, reject) => {
        fetchRoutes().then(res => {
          const newRoutes = generateRoutes(res.data)
          commit(types.SET_ROUTES, newRoutes)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 动态添加校级，专业，班级管理员访问学生信息详情页
    addAdminRoleRoutes({
      commit
    }, adminType) {
      let pathName = '管理员'
      switch (adminType) {
        case 'school':
          pathName = '校级管理员'
          break
        case 'major':
          pathName = '专业管理员'
          break
        case 'class':
          pathName = '班级管理员'
          break
      }
      const route = {
        path: `/student/${adminType}`,
        hidden: true,
        component: Layout,
        children: [{
          path: ':stuId',
          name: pathName,
          component: _import(`student/${adminType}/detail`)
        }]
      }
      router.addRoutes([route])
      commit(types.ADD_ADMIN_ROLE_ROUTE, route)
    }
  }
}

export default permission
