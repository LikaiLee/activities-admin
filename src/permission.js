import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  getToken
} from '@/utils/auth'

const whiteList = ['/login', '/404'] // 不重定向地址
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
          console.log(res)
        })
      }
      next()
    }
  }

  NProgress.done()
})
