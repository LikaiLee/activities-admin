<template>
  <div class="user-account">
    <div class="filter-container">
      <el-input v-model.trim="filterStuId" @change="handleFilter" placeholder="学号" suffix-icon="el-icon-edit" style="width: 200px;" class="filter-item">
      </el-input>
      <el-button @click="handleFilter" class="filter-item" type="primary" icon="el-icon-fa-search">搜索</el-button>
    </div>
    <el-table :data="list" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="fromIndex" align="center" />
      <el-table-column prop="stuId" label="学号" align="center" width="100px" />
      <el-table-column label="姓名" align="center" width="100px">
        <template slot-scope="scope">
          <span class="link-type" @click="showUpdateDialog(scope.row)">{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="60px" />
      <el-table-column prop="entrance_time" label="入学时间" align="center" />
      <el-table-column prop="className" label="班级" align="center" />
      <el-table-column prop="political" label="政治面貌" align="center" />
      <el-table-column prop="dormitory" label="寝室" align="center" />
      <el-table-column prop="photo" label="照片" align="center" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showUpdateDialog(scope.row)" size="mini">修改密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <update-password @confirm="handleUpdate" @cancel="toggleDialog" @visibleChange="handleVisibleChange" :visible="visible" />
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" class="pagination" />

  </div>
</template>
<script>
import UpdatePassword from '@/components/Dialog/UpdatePassword'
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
  computed: {
  },
  components: {
    UpdatePassword,
    SimplePagination
  }
}
</script>

<style lang="scss" scoped>
.user-account {
  .filter-container {
    margin-bottom: 20px;
  }
  .pagination {
    margin: 20px 0 20px 46%;
  }
}
</style>

