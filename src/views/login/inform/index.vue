<template>
  <div class="inform">
    <el-card class="inform-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-fa-info-circle"></i>
        通知公告
      </div>
      <el-table :data="data" border fit highlight-current-row height="300">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="author" align="center" label="发布者" width="100" />
        <el-table-column prop="date" align="center" label="日期" width="200" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'inform',
  props: {
    data: Array
  }
}
</script>
<style lang="scss" scoped>
.inform {
  width: 650px;
  height: 300px;

  &-card {
    width: 100%;
    height: 100%;
  }
}
</style>
