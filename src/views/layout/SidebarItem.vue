<template>
  <div class='menu-wrapper'>
    <template v-for="(item, index) in routes">

      <router-link :key="index" v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+item.children[0].path">
        <el-menu-item :index="item.path+item.children[0].path" class='submenu-title-noDropdown'>
          <i v-if='item.icon' :class="'el-icon-fa-' + item.icon"></i>
          <span slot="title" class="menu-title">{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :key="index" :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <i v-if='item.icon' :class="'el-icon-fa-' + item.icon"></i>
          <span slot="title" class="menu-title">{{item.name}}</span>
        </template>
        <template v-for="(child, index) in item.children" v-if='!child.hidden'>

          <sidebar-item :key="index" class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>

          <router-link :key="index" v-else :to="item.path+child.path">
            <el-menu-item :index="item.path+child.path">
              <i v-if='child.icon' :class="'el-icon-fa-' + child.icon"></i>
              <span slot="title" class="menu-title">{{child.name}}</span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-title {
  margin-left: 10px;
}

</style>


