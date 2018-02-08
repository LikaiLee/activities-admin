<template>
  <div class="app-wrapper" :class="{hideSidebar: sidebarOpened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebarOpened() {
      return this.sidebar.opened
    },
    ...mapGetters([
      'sidebar'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-container {
      // width: 40px;
      overflow: hidden;
    }
    .main-container {
      margin-left: 65px;
    }
  }
  .sidebar-container {
    transition: width 0.28s ease-out; // width: 180px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none
    }
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 180px;
  }
}
</style>
