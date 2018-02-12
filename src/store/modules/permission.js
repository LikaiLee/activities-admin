import types from '../mutation-types'
import Layout from '@/views/layout'
import {
  defaultRoutes
} from '@/router/routes'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
const permission = {
  state: {
    routes: []
  },
  mutations: {
    [types.SET_ROUTES](state, routes) {
      state.routes = defaultRoutes.concat(routes)
    }
  },
  actions: {
    generateRoutes({
      commit
    }, routes) {
      const newRoutes = []
      routes.forEach((router) => {
        newRoutes.push({
          path: router.path,
          component: Layout,
          noDropdown: true,
          icon: router.icon,
          children: [{
            path: '',
            name: router.name,
            component: _import(router.path.substr(1) + '/index')
          }]
        })
      })
      commit(types.SET_ROUTES, newRoutes)
    }
  }
}

export default permission
