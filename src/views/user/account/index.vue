<template>
  <div class="user-account">
    <el-table :data="list" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 70%">
      <el-table-column type="index" :index="fromIndex" align="center" />
      <!-- <el-table-column prop="id" label="ID" align="center" width="100px" /> -->
      <el-table-column label="姓名" align="center" width="100px">
        <template slot-scope="scope">
          <span class="link-type" @click="showUpdateDialog(scope.row)">{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="60px" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showUpdateDialog(scope.row)" size="mini">修改密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" class="pagination" />
    <update-password-dialog @confirm="handleUpdate" @cancel="toggleDialog" @visibleChange="handleVisibleChange" :visible="visible" />

  </div>
</template>
<script>
import StudentTable from '@/components/Student/StudentTable'
import UpdatePasswordDialog from '@/components/Dialog/UpdatePasswordDialog'
import SimplePagination from '@/components/SimplePagination'
import { fetchBaseInfoByPage, updatePassword } from '@/api/user/admin'
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
        id: -1
      }
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
    handleUpdate(password) {
      this.toggleDialog()
      updatePassword({ userId: this.temp.id, password }).then((res) => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      }).catch(_ => _)
    },
    showUpdateDialog(data) {
      this.temp = data
      this.toggleDialog()
    },
    handleVisibleChange(visible) {
      this.visible = visible
    },
    toggleDialog() {
      this.visible = !this.visible
    },
    _fetchData() {
      this.loading = true
      fetchBaseInfoByPage(this.curPage, this.pageSize).then((res) => {
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

