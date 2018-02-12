import Vue from 'vue'
import Router from 'vue-router'
import {
  defaultRoutes
} from './routes'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: defaultRoutes
})

export default router
