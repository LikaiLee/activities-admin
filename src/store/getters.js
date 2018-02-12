export default {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  user: state => state.user.user,
  permissionRoutes: state => state.permission.routes
}
