import Layout from '@/views/layout'
const _import = require('./_import_' + process.env.NODE_ENV)

/*eslint-disable*/

export const defaultRoutes = [{
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
    // name: '首页',
    icon: 'table',
    hidden: true,
    children: [{
      path: 'home',
      component: _import('home/index')
    }]
  },
  {
    path: '*',
    hidden: true,
    redirect: '/404'
  }
]
export const fullRoutes = [{
    path: '/test',
    component: Layout,
    noDropdown: true,
    icon: 'table',
    children: [{
      path: '',
      name: 'test',
      component: _import('test/index')
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'bug',
    children: [{
        path: '/example/table',
        component: _import('test/index'),
        redirect: '/example/table/table',
        name: 'Table',
        icon: 'table',
        children: [{
            path: 'dynamictable',
            component: _import('test/index'),
            name: '动态table'
          },
          {
            path: 'dragtable',
            component: _import('test/index'),
            name: '拖拽table'
          },
          {
            path: 'inline_edit_table',
            component: _import('test/index'),
            name: 'table内编辑'
          },
          {
            path: 'table',
            component: _import('test/index'),
            name: '综合table'
          }
        ]
      },
      {
        path: 'form/edit',
        icon: 'apple',
        component: _import('test/index'),
        name: '编辑Form',
        meta: {
          isEdit: true
        }
      },
      {
        path: 'form/create',
        icon: 'apple',
        component: _import('test/index'),
        name: '创建Form'
      },
      {
        path: 'tab/index',
        icon: 'apple',
        component: _import('test/index'),
        name: 'Tab'
      }
    ]
  }
]
