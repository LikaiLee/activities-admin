<template>
  <div>
    <el-tabs v-loading="loading"  type="card">
      <el-tab-pane label="全部">
        全部
      </el-tab-pane>
      <el-tab-pane label="需要审批">需要审批
        默认
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
// 管理员审核申请
// import { fetchAllStatus, fetchNeedApprove } from '@/api/club/appStatus'
// import { postApproval } from '@/api/club/appApprove'
export default {
  data() {
    return {
      loading: false
    }
  },
  created() {
    // fetchNeedApprove(0)
    // postApproval({ appId, result, comment })
  },
  methods: {
    // 所有 fetchAllStatus
    getAllApply() {
      // fetchAllStatus(0)
    },
    // 审批中
    getCheckingApply() {},
    // 需要审批 fetchNeedApprove 审批操作 postApproval
    getNeedCheckApply() {
    },
    // 审批通过
    getPassedApply() {},
    // 审批未通过
    getRejectedApply() {}
  }
}
</script>
