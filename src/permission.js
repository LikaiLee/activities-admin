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
    if (whiteList.indexOf(to.path) !== -1 || to.path.indexOf('/inform/detail') !== -1) {
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
        // 构建可访问的路由表
        store.dispatch('generateRoutes').then(() => {
          router.addRoutes(store.getters.newRoutes) // 动态添加新增路由
          // 获取用户信息
          store.dispatch('getUserInfo').then(() => {
            next({ ...to
            })
          })
        }).catch((err) => {
          console.error(err)
          store.dispatch('logout').then(() => {
            next('/login')
          })
        })
      } else {
        next()
      }
    }
    const title = to.name ? to.name + ' - ' : ''
    document.title = title + '学生课外活动管理系统'
  }

  NProgress.done()
})
