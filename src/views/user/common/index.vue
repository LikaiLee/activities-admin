<template>
  <div class="user-common">
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
          <el-button type="primary" @click="showUpdateDialog(scope.row)" size="mini">
            修改信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" class="pagination" />
    <update-base-user-dialog :user="temp" :visible="visible" @confirm="handleUpdate" @cancel="toggleDialog" @visibleChange="handleVisibleChange" />
  </div>
</template>
<script>
import StudentTable from '@/components/Student/StudentTable'
import UpdateBaseUserDialog from '@/components/Dialog/UpdateBaseUserDialog'
import SimplePagination from '@/components/SimplePagination'
import { fetchBaseInfoByPage, updateBaseInfo } from '@/api/user/admin'
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
        id: -1,
        realName: '',
        sex: '',
        email: ''
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
    handleUpdate({ id, ...user }) {
      this.toggleDialog()
      updateBaseInfo({ userId: id, ...user }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this._fetchData()
      }).catch()
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
    UpdateBaseUserDialog,
    SimplePagination
  }
}
</script>

<style lang="scss" scoped>

</style>

