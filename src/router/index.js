import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

import Layout from '@/views/layout'

const routerMap = [
  {
    path: '/login',
    hidden: true,
    component: _import('login/index')
  },
  {
    path: '/',
    component: Layout,
    // name: '首页',
    redirect: '/dashboard',
    icon: 'table',
    noDropdown: true,
    hidden: false,
    children: [{
      path: 'dashboard',
      name: '首页',
      icon: 'chevron-circle-right',
      component: _import('dashboard/index'),
      meta: {
        role: ['admin']
      }
    }]
  },
  {
    path: '/test',
    component: Layout,
    name: '下拉',
    icon: 'code',
    noDropdown: false,
    children: [{
      path: '/',
      name: 'test',
      icon: 'bug',
      component: _import('test/index')
    }]
  },
  {
    path: '/404',
    hidden: true,
    component: _import('errorPage/404')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routerMap
})

export default router
