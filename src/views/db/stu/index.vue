<template>
  <div>
    <upload-excel @on-selected-file='handleSelected'>
      <el-button @click="handleUpload" icon="el-icon-fa-cloud-upload" type="primary">上传</el-button>
      <el-button @click="handleDownload" icon="el-icon-fa-cloud-download" type="primary">下载模板</el-button>
      <a href="http://120.25.240.194:8080/stu/db/base/file" ref="anchor" style="display: none;"></a>
    </upload-excel>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <!-- <el-table-column v-for='item in tableHeader' :prop="item" :label="item" :key="item" /> -->
      <el-table-column type="index" :index="1" align="center" />
      <el-table-column prop="stuId" label="学号" align="center" />
      <el-table-column prop="stuName" label="姓名" align="center" />
      <el-table-column prop="gender" label="性别" align="center" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="political" label="政治面貌" align="center" />
      <el-table-column prop="entranceTime" label="入学时间" align="center" />
      <el-table-column prop="classId" label="班级id" align="center" />
      <el-table-column prop="dormitoryId" label="寝室id" align="center" />
    </el-table>
    <el-dialog :title="dialogMsg" :visible.sync="dialogVisible" width="35%">
      <div v-show="uploadFailData.length">上传失败数据</div>
      <el-row v-for="item in uploadFailData" :key="item" :gutter="30" style="margin: 8px 0;">
        <el-col :span="8">
          学号：{{ item.split(':')[0] }}
        </el-col>
        <el-col :span="8">
          姓名：{{ item.split(':')[1] }}
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadExcel from '@/components/UploadStuFile'
import { uploadStuFile } from '@/api/db'
import { stuExcelTplFields } from '@/config'
export default {
  data() {
    return {
      file: null,
      tableData: [],
      tableHeader: [],
      dialogVisible: false,
      dialogMsg: '',
      uploadFailData: []
    }
  },
  methods: {
    handleDownload() {
      this.$refs.anchor.click()
    },
    handleUpload() {
      if (!this.file) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        })
        return
      }
      if (!this.validateTableHeader()) {
        this.$message({
          message: '模板文件不正确，请选择正确的文件模板',
          type: 'warning'
        })
        return
      }

      if (!this.validateTableData()) {
        this.$message({
          message: 'content fail',
          type: 'warning'
        })
        return
      }

      this.$confirm('即将上传文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        uploadStuFile(this.file).then(({ data, message }) => {
          if (data.length) {
            this.dialogVisible = true
            this.dialogMsg = message
            this.uploadFailData = data
          } else {
            this.$message({
              message,
              type: 'success'
            })
          }
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
      // console.log(this.file)
      // console.log(this.tableHeader)
      // console.log(this.tableData)
    },
    validateTableData() {
      let validated = true
      const tableData = this.tableData
      console.log(tableData)
      tableData.forEach((student, index) => {
        if (student.stuId === '') {
          validated = false
        }
      })
      return validated
    },
    validateTableHeader() {
      let flag = true
      const tableHeader = this.tableHeader
      for (let i = 0; i < tableHeader.length; i++) {
        if (tableHeader[i] !== stuExcelTplFields[i]) {
          flag = false
          return flag
        }
      }
      return flag
    }
  },
  coumpted: {
  },
  components: {
    uploadExcel
  }
}
</script>
