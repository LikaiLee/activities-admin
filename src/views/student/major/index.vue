<template>
  <div class="school">
    <div class="filter-container">
      <el-input v-model.trim="filterStuId" @change="handleFilter" placeholder="学号" suffix-icon="el-icon-edit" style="width: 200px;" class="filter-item">
      </el-input>
      <el-button @click="handleFilter" class="filter-item" type="primary" icon="el-icon-fa-search">搜索</el-button>
    </div>

    <student-table @update="showUpdateDialog" :data="list" :loading="loading" :fromIndex="fromIndex" />
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" />
    <update-stu-info-dialog type="major" :user="temp" @confirm="handleUpdate" @cancel="toggleDialog" @visibleChange="handleVisibleChange" :visible="visible" />
  </div>
</template>

<script>
import StudentTable from '@/components/Student/StudentTable'
import UpdateStuInfoDialog from '@/components/Dialog/UpdateStuInfoDialog'
import SimplePagination from '@/components/SimplePagination'
import { fetchStudentByPage, fetchStudentByStuId, updateStudent } from '@/api/student/majorAdmin'
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
        className: '',
        dormitory: '',
        entrance_time: '',
        photo: '',
        political: '',
        realName: '',
        sex: '',
        stuId: '',
        userId: -1
      },
      filterStuId: ''
    }
  },
  created() {
    this._fetchData()
  },
  methods: {
    handleFilter() {
      if (this.filterStuId) {
        this._filterData()
      } else {
        this._fetchData()
      }
    },
    handleUpdate({ stuId, political }) {
      this.toggleDialog()
      updateStudent({
        stuId, political,
        dormitoryId: -1
      }).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
        this._fetchData()
      }).catch(_ => _)
    },
    showUpdateDialog(data) {
      this.temp = data
      this.toggleDialog()
    },
    toggleDialog() {
      this.visible = !this.visible
    },
    handleVisibleChange(visible) {
      this.visible = visible
    },
    handlePageChanged({ page, fromIndex }) {
      this.fromIndex = fromIndex
      this.curPage = page
      this._fetchData()
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
    UpdateStuInfoDialog,
    SimplePagination
  }
}
</script>
<style lang="scss" scoped>
.school {
  .filter-container {
    margin-bottom: 20px;
  }
}
</style>

