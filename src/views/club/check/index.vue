<template>
  <div>
    <el-tabs @tab-click="handleClick" :value="curTabType" v-loading="loading" type="card">
      <el-tab-pane name="all" label="全部">
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
      <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :fromPage="curPage" :data="curList" :pageSize="pageSize" class="pagination" />
    </el-tabs>
  </div>
</template>

<script>
// 申请查看
import ApplyTable from '@/components/ApplyTable'
import SimplePagination from '@/components/SimplePagination'
import { fetchAllStatus, fetchStatusByType } from '@/api/club/appStatus'
export default {
  data() {
    return {
      loading: false,
      curList: [],
      curTabType: 'all',
      curPage: 0,
      pageSize: 8,
      fromIndex: 1
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    // 申请状态标签页
    handleClick(tab) {
      this.curTabType = tab.name
      this.curPage = 0
      this.fromIndex = 1
      this.curTabType === 'all' ? this.getAll() : this.getStatusByType()
    },
    // 分页切换
    handlePageChanged({ page, fromIndex }) {
      this.fromIndex = fromIndex
      this.curPage = page
      this.curTabType === 'all' ? this.getAll() : this.getStatusByType()
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
  components: {
    SimplePagination,
    ApplyTable
  }
}
</script>
