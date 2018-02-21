import Layout from '@/views/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
/**
 * 构造路由表
 * @param {Array} routes
 * @return {Array}
 */
export default function generateRoutes(routes = []) {
  const newRoutes = _generate(routes)
  newRoutes.push({
    path: '*',
    hidden: true,
    redirect: '/404'
  })
  return newRoutes
}

function _generate(routes) {
  const newRoutes = []
  routes.forEach((router) => {
    const {
      children,
      path,
      name,
      icon,
      component
    } = router
    // 无子菜单
    if (!children) {
      newRoutes.push({
        path,
        component: Layout,
        noDropdown: true,
        icon,
        children: [{
          path: '',
          name,
          component: _import(`${component}/index`)
        }]
      })
      // 有子菜单
    } else {
      const _children = []
      children.forEach(({
        component: _component,
        ...opts
      }) => {
        _children.push({
          component: _import(`${_component}/index`),
          ...opts
        })
      })
      newRoutes.push({
        path,
        component: Layout,
        redirect: 'noredirect',
        name,
        icon,
        children: _children
      })
    }
  })
  return newRoutes
}
