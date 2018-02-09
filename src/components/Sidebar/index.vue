<template>
  <el-menu :default-active="$route.path" :collapse="isCollapse" background-color="#222f3c" text-color="#fff" active-text-color="#20a0ff" mode="vertical">
    <sidebar-item :routes="routes"></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    },
    routes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    SidebarItem
  }
}
</script>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 180px;
  min-height: 100%;
}
</style>
