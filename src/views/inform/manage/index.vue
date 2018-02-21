<template>
  <div class="inform-manage-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="informId" align="center" label="ID" width="65" />
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
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">修改
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button-group v-show="!listLoading" class="pagination">
      <el-button @click="prevPage" :disabled="prevBtnDisabled" type="primary" plain icon="el-icon-arrow-left" size="small">上一页</el-button>
      <el-button @click="nextPage" :disabled="nextBtnDisabled" type="primary" plain icon="el-icon-arrow-right" size="small">下一页</el-button>
    </el-button-group>

    <el-dialog title="修改通知" :visible.sync="dialogFormVisible" width="60%">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <div id="editor"></div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleDialog">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import { fetchInformByPage, deleteInformById, updateInform } from '@/api/admin'
export default {
  data() {
    return {
      editor: null,
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      temp: {
        title: '',
        content: ''
      },
      listPage: 0,
      perPageNum: 6,
      prevBtnDisabled: true,
      nextBtnDisabled: false
    }
  },
  mounted() {
    this._fetchData()
  },
  methods: {
    prevPage() { this.listPage = Math.max(0, --this.listPage) },
    nextPage() { this.listPage++ },
    update() {
      const { informId, title } = this.temp
      const content = this.editor.txt.html()
      updateInform({ informId, title, content }).then(res => {
        this.toggleDialog()
        this.$notify({
          title: '修改成功',
          message: res.message,
          type: 'success',
          duration: 3000
        })
        this._fetchData()
      }).catch(() => { })
    },
    handleUpdate(row) {
      this.toggleDialog()
      this.temp = row
      if (!this.editor) {
        this.$nextTick(() => {
          this._initEditor()
          this.editor.txt.html(this.temp.content)
        })
      } else {
        this.editor.txt.html(this.temp.content)
      }
    },
    handleDelete({ informId }) {
      deleteInformById(informId).then(res => {
        this.$message({
          message: res.message,
          type: 'success'
        })
        this._fetchData()
      }).catch(() => { })
    },
    toggleDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    _fetchData() {
      this.listLoading = true
      fetchInformByPage(this.listPage, this.perPageNum).then(res => {
        this.list = res.data.sort((a, b) => {
          return a.informId - b.informId
        })
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    _initEditor() {
      this.editor = new Editor('#editor')
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.create()
    }
  },
  watch: {
    listPage(newPage) {
      this._fetchData()
      this.prevBtnDisabled = newPage === 0
    },
    list({ length }) {
      this.nextBtnDisabled = (!length || length < this.perPageNum)
    }
  },
  filters: {
    dateFormatter(date) {
      return date
        .replace(/年|月/g, '-')
        .replace(/时|分/g, ':')
        .replace(/日|秒\s*\w*\s*/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.inform-manage-container {
  padding: 20px;
  .pagination {
    margin: 20px 0 20px 46%;
  }
}
</style>

