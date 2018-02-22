<template>
  <div class="inform-manage-container">

    <inform-table :data="list" :loading="loading" @update="handleUpdate" @delete="handleDelete" />
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" class="pagination" />

    <div class="inform-dialog">
      <el-dialog title="修改通知" :visible.sync="visible" width="60%">
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
  </div>
</template>

<script>
import Editor from 'wangeditor'
import InformTable from '@/components/Inform/InformTable'
import SimplePagination from '@/components/SimplePagination'
import { fetchUserInformByPage, deleteInformById, updateInform } from '@/api/inform'
export default {
  data() {
    return {
      list: [],
      loading: true,
      curPage: 0,
      pageSize: 6,
      visible: false,
      temp: {
        title: '',
        content: ''
      }
    }
  },
  mounted() {
    this._fetchData()
  },
  methods: {
    handlePageChanged(page) {
      this.curPage = page
      this._fetchData()
    },
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
      this._fillEditor()
    },
    handleDelete(id) {
      deleteInformById(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this._fetchData()
      }).catch(() => { })
    },
    toggleDialog() {
      this.visible = !this.visible
    },
    _fetchData() {
      this.loading = true
      fetchUserInformByPage(this.curPage, this.pageSize).then(({ data }) => {
        if (data.length) {
          this.list = data.sort((a, b) => a.informId - b.informId)
        } else {
          this.list = data
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    _fillEditor() {
      if (!this.editor) {
        this.$nextTick(() => {
          this._initEditor()
          this.editor.txt.html(this.temp.content)
        })
      } else {
        this.editor.txt.html(this.temp.content)
      }
    },
    _initEditor() {
      this.editor = new Editor('#editor')
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.create()
    }
  },
  components: {
    InformTable,
    SimplePagination
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

