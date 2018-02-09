<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view" v-for="tag in visitedViews" :to="tag.path" :key="tag.path">
      <el-tag :closable="true" :type="isActive(tag.path)?'success':''" @close='closeViewTabs(tag, $event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TabsView',
  computed: {
    visitedViews() {
      return this.visitedViews
    },
    ...mapGetters([
      'visitedViews'
    ])
  },
  methods: {
    closeViewTabs(view, $event) {
      this.delVisitedViews(view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    addViewTabs() {
      this.addVisitedViews(this._generateRoute())
    },
    isActive(path) {
      return path === this.$route.path
    },
    _generateRoute() {
      const matched = this.$route.matched
      if (matched[matched.length - 1].name) {
        return matched[matched.length - 1]
      }
      this.$route.matched[0].path = '/'
      return this.$route.matched[0]
    },
    ...mapActions([
      'addVisitedViews',
      'delVisitedViews'
    ])
  },
  watch: {
    $route() {
      this.addViewTabs()
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-view-container {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  .tabs-view {
    margin-left: 10px;
  }
}
</style>
