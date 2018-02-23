<template>
  <div class="base-list-view" v-loading="!data">
    <div v-if="data">
      <div v-for="item in labels" :key="item.key">
        <el-row :gutter="20">
          <el-col :span="6" :style="itemNameStyle" class="item-name">
            {{item.name}}：
          </el-col>
          <el-col :span="12">
            {{data[item.key]}}
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseListView',
  props: {
    labels: {
      type: Array,
      default() { return [] }
    },
    data: {
      type: Object,
      default: {}
    },
    labelPosition: {
      type: String,
      default: 'center'
    }
  },
  data() {
    return {
      itemNameStyle: {
        textAlign: this.labelPosition
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.base-list-view {
  width: 500px;
  .el-row {
    margin: 12px 0;
  }
  .el-col {
    height: 30px;
    line-height: 30px;
  }
  .item-name {
    color: #606266;
  }
}
</style>


