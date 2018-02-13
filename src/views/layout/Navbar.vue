<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb />
    <tabs-view></tabs-view>
    <screenfull class='screenfull'></screenfull>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="username">
          {{ user.name }}
        </div>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <div @click.prevent="logOut">
          <el-dropdown-item divided>
            退出登录
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TabsView from '@/components/TabsView'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Breadcrumb,
    TabsView,
    Hamburger,
    Screenfull
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user'
    ])
  },
  methods: {
    logOut() {
      this.logout().then(() => {
        setTimeout(() => { window.location.reload() }, 100)// 为了重新实例化vue-router对象 避免bug
      })
    },
    ...mapActions([
      'toggleSideBar',
      'logout'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: #eef1f6;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    outline: 0;
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .screenfull {
    position: absolute;
    right: 120px;
    top: 16px;
    outline: 0;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .username {
        width: 70px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: 0;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>



