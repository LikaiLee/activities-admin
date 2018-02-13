import Layout from '@/views/layout'
const _import = require('./_import_' + process.env.NODE_ENV)

/*eslint-disable*/

export default [{
    path: '/login',
    hidden: true,
    component: _import('login/index')
  },
  {
    path: '/404',
    hidden: true,
    component: _import('errorPage/404')
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    icon: 'table',
    hidden: true,
    children: [{
      path: 'home',
      name: '首页',
      component: _import('home/index')
    }]
  }
]
