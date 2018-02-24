<template>
  <div class="user-account">
    <div class="filter-container">
      <el-input v-model.trim="filterStuId" @change="handleFilter" placeholder="学号" suffix-icon="el-icon-edit" style="width: 200px;" class="filter-item">
      </el-input>
      <el-button @click="handleFilter" class="filter-item" type="primary" icon="el-icon-fa-search">搜索</el-button>
    </div>

    <student-table @update="showUpdateDialog" :data="list" :loading="loading" :fromIndex="fromIndex" />
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" class="pagination" />
    <update-password-dialog @confirm="handleUpdate" @cancel="toggleDialog" @visibleChange="handleVisibleChange" :visible="visible" />

  </div>
</template>
<script>
import StudentTable from '@/components/Student/StudentTable'
import UpdatePasswordDialog from '@/components/Dialog/UpdatePasswordDialog'
import SimplePagination from '@/components/SimplePagination'
import { fetchStudentByPage, fetchStudentByStuId } from '@/api/student/schoolAdmin'
import { updatePassword } from '@/api/user/admin'
export default {
  data() {
    return {
      list: [],
      curPage: 0,
      pageSize: 10,
      fromIndex: 1,
      loading: true,
      visible: false,
      temp: {
        userId: -1
      },
      filterStuId: ''
    }
  },
  created() {
    this._fetchData()
  },
  methods: {
    handlePageChanged({ page, fromIndex }) {
      this.fromIndex = fromIndex
      this.curPage = page
      this._fetchData()
    },
    handleFilter() {
      if (this.filterStuId) {
        this._filterData()
      } else {
        this._fetchData()
      }
    },
    handleUpdate(password) {
      this.toggleDialog()
      updatePassword({ userId: this.temp.userId, password }).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      }).catch(_ => _)
    },
    showUpdateDialog(data) {
      this.toggleDialog()
      this.temp = data
    },
    handleVisibleChange(visible) {
      this.visible = visible
    },
    toggleDialog() {
      this.visible = !this.visible
    },
    _filterData() {
      this.loading = true
      fetchStudentByStuId(this.filterStuId).then((res) => {
        this.loading = false
        this.list = [res.data]
      }).catch(() => {
        this.loading = false
      })
    },
    _fetchData() {
      this.loading = true
      fetchStudentByPage(this.curPage, this.pageSize).then((res) => {
        this.list = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  components: {
    StudentTable,
    UpdatePasswordDialog,
    SimplePagination
  }
}
</script>

<style lang="scss" scoped>
.user-account {
  .filter-container {
    margin-bottom: 20px;
  }
}
</style>

