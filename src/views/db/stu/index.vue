<template>
  <div>
    <upload-excel @on-selected-file='handleSelected'>
      <el-button @click="handleUpload" icon="el-icon-fa-cloud-upload" type="primary">上传</el-button>
    </upload-excel>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for='item in tableHeader' :prop="item" :label="item" :key="item">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import uploadExcel from '@/components/UploadStuFile'
import { uploadStuFile } from '@/api/db'
export default {
  components: { uploadExcel },
  data() {
    return {
      file: null,
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    handleUpload() {
      if (!this.file) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        })
        return
      }
      this.$confirm('即将上传文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        uploadStuFile(this.file).then(res => {
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上传'
        })
      })
    },
    handleSelected(file, data) {
      this.file = file
      this.tableData = data.results
      this.tableHeader = data.header
    }
  }
}
</script>
