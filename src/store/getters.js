export default {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  user: state => state.user.user,
  newRoutes: state => state.permission.newRoutes,
  permissionRoutes: state => state.permission.routes
}
