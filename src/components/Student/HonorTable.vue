<template>
  <div class="honor-table">
    <el-table :data="data" v-loading="!data" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="fromIndex" align="center" />
      <el-table-column prop="honorName" label="名称" align="center" />
      <el-table-column prop="honorScore" label="分数" align="center" />
      <el-table-column prop="honorLv" label="级别" align="center" />
      <el-table-column prop="term" label="学期" align="center" />
      <el-table-column prop="common" label="说明" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HonorTable',
  props: {
    data: {
      type: Array,
      default() { return [] }
    },
    fromIndex: {
      type: Number,
      default: 1
    }
  },
  data() { return {} },
  methods: {}
}
</script>

