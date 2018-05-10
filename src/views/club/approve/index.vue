<template>
  <div>
    <el-tabs @tab-click="handleClick" :value="curTabType" v-loading="loading" type="card">
      <el-tab-pane name="all" label="全部">
        <apply-table :curList="curList" :loading="loading" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane name="needCheck" label="需要审批">
        <apply-table :curList="curList" :loading="loading" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane name="checking" label="审批中">
        <apply-table :curList="curList" :loading="loading" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane name="rejected" label="未通过">
        <apply-table :curList="curList" :loading="loading" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane name="passed" label="已通过">
        <apply-table :curList="curList" :loading="loading" :fromIndex="fromIndex" />
      </el-tab-pane>
    </el-tabs>
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :fromPage="curPage" :data="curList" :pageSize="pageSize" class="pagination" />
  </div>
</template>

<script>
// 管理员审核申请
import ApplyTable from '@/components/ApplyTable'
import SimplePagination from '@/components/SimplePagination'
import { fetchAllStatus, fetchStatusByType, fetchNeedApprove } from '@/api/club/appStatus'

export default {
  data() {
    return {
      curTabType: 'needCheck',
      loading: false,
      curPage: 0,
      pageSize: 6,
      curList: [],
      fromIndex: 1
    }
  },
  created() {
    this.getNeedCheck()
  },
  methods: {
    // 申请状态标签页
    handleClick(tab) {
      this.curTabType = tab.name
      this.curPage = 0
      this.fromIndex = 1
      this.switchGetData()
    },
    // 分页切换
    handlePageChanged({ page, fromIndex }) {
      this.fromIndex = fromIndex
      this.curPage = page
      this.switchGetData()
    },
    switchGetData() {
      if (this.curTabType === 'all') {
        this.getAll()
      } else if (this.curTabType === 'needCheck') {
        this.getNeedCheck()
      } else {
        this.getStatusByType()
      }
    },
    // 获取需要审核
    getNeedCheck() {
      this.loading = true
      fetchNeedApprove(this.curPage, this.pageSize).then(({ data }) => {
        this.curList = data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取所有
    getAll() {
      this.loading = true
      fetchAllStatus(this.curPage, this.pageSize).then(({ data }) => {
        this.curList = data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 根据类型获取
    getStatusByType() {
      this.loading = true
      let _status = 1
      switch (this.curTabType) {
        case 'checking':
          _status = 1
          break
        case 'rejected':
          _status = -1
          break
        case 'passed':
          _status = 0
          break
      }
      fetchStatusByType(_status, this.curPage, this.pageSize).then(({ data }) => {
        this.curList = data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  filters: {
    dateFormatter(date) {
      return date
        .replace(/年|月/g, '-')
        .replace(/时|分/g, ':')
        .replace(/日|秒\s*\w*\s*/g, '')
    }
  },
  components: {
    SimplePagination,
    ApplyTable
  }
}
</script>
