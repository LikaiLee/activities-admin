<template>
  <div>
    <el-tabs v-loading="loading"  type="card">
      <el-tab-pane label="全部">
        全部
      </el-tab-pane>
      <el-tab-pane label="审批中">审批中
      </el-tab-pane>
      <el-tab-pane label="未通过">未通过
      </el-tab-pane>
      <el-tab-pane label="已通过">已通过
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 申请查看
import { fetchAllStatus } from '@/api/club/appStatus'
export default {
  data() { return {} },
  created() {
    fetchAllStatus(0)
  }
}
</script>
