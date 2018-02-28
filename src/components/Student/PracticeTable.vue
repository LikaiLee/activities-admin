<template>
  <div class="practice-table">
    <el-table :data="data" v-loading="!data" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="fromIndex" align="center" />
      <el-table-column prop="practiceName" label="名称" align="center" />
      <el-table-column prop="score" label="分数" align="center" />
      <el-table-column prop="result" label="结果" align="center" />
      <el-table-column prop="practiceDate" label="日期" align="center" />
      <el-table-column prop="term" label="学期" align="center" />
      <el-table-column prop="common" label="说明" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PracticeTable',
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

