import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  getToken
} from '@/utils/auth'

const whiteList = ['/login', '/404', '/noredirect', '/test'] // 不重定向地址
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 未登录 全部重定向至登录界面
  if (!getToken()) {
    // 避免死循环
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
    // 已登录
  } else {
    if (to.path.match(/^\/login(?:\/(?=$))?$/i)) {
      next('/')
    } else {
      if (!store.getters.user) {
        store.dispatch('getUserInfo', 'token').then(res => {
          const _routes = [{
            path: '/test',
            name: '测试',
            icon: 'table'
          }]
          store.dispatch('generateRoutes', _routes).then(res => {
            router.addRoutes(store.getters.permissionRoutes)
            next({ ...to })
          })
        })
      }
      next()
    }
    const title = to.name ? to.name + ' - ' : ''
    document.title = title + '学生课外活动管理系统'
  }

  NProgress.done()
})
