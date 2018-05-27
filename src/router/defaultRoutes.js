import Layout from '@/views/layout'
const _import = require('./_import_' + process.env.NODE_ENV)

/*eslint-disable*/

export const getAdminRouter = (adminType, pathName) => {
  return {
    path: `/student/${adminType}`,
    hidden: true,
    component: Layout,
    children: [{
      path: ':stuId',
      name: pathName,
      meta: {
        hideInTab: true // 不显示在Tab栏
      },
      component: _import(`student/${adminType}/detail`)
    }]
  }
}

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
  },
  {
    path: '/inform/detail/:id',
    hidden: true,
    name: '通知详情',
    component: _import('inform/detail/index')
  },
  {
    path: '/club/apply/detail',
    hidden: true,
    component: Layout,
    children: [{
      path: ':applyId',
      name: '申请详情',
      meta: {
        hideInTab: true // 不显示在Tab栏
      },
      component: _import('club/apply/detail')
    }]
  }
]
