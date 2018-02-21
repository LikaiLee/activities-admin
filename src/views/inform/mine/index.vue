<template>
  <div v-if="list">
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="informId" align="center" label="序号" width="65" />
      <el-table-column width="180px" align="center" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.date | dateFormatter}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="标题">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="author" align="center" label="发布者" width="100" />
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改通知" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="temp.content" :rows="6" type="textarea" placeholder="请输入内容">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchInformByUserId, userDeleteInformById, userUpdateInformById } from '@/api/inform'
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      temp: {
        title: '',
        content: ''
      }
    }
  },
  mounted() {
    this.listLoading = true
    fetchInformByUserId(this.user.id).then(res => {
      this.list = res.data
      this.listLoading = false
    }).catch(() => {
      this.listLoading = false
    })
  },
  methods: {
    update() {
      const { informId, title, content } = this.temp
      userUpdateInformById({ informId, title, content }).then(res => {
        this.dialogFormVisible = false
        this.$notify({
          title: '修改成功',
          message: res.message,
          type: 'success',
          duration: 3000
        })
      }).catch(() => { })
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.temp = row
    },
    handleDelete({ informId }) {
      userDeleteInformById(informId).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        })
      }).catch(() => { })
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
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>
