<template>
  <div>
    <upload-excel :header="header" @on-selected-file='handleSelected'>
      <el-button @click="handleUpload" icon="el-icon-fa-cloud-upload" type="primary">上传</el-button>
      <el-button @click="handleDownload" icon="el-icon-fa-cloud-download" type="primary">下载模板</el-button>
      <a :href="downloadUrl" ref="anchor" style="display: none;"></a>
    </upload-excel>
    <div v-show="errStudents.length" class="error-student">
      <div @click="handleFilter(stuId)" v-for="stuId in errStudents" :key="stuId" class="stu-tag">
        <el-tag type="danger">{{ stuId }}</el-tag>
      </div>
    </div>
    <el-table :data="list" border highlight-current-row style="width: 100%;margin-top:20px;">
      <!-- <el-table-column v-for='item in tableHeader' :prop="item" :label="item" :key="item" /> -->
      <!-- <el-table-column type="index" :index="1" align="center" /> -->
      <el-table-column prop="activityName" label="活动名称" align="center" />
      <el-table-column prop="activityDate" label="活动时间" align="center" />
      <el-table-column prop="stuId" label="学号" align="center" />
      <el-table-column prop="stuName" label="姓名" align="center" />
      <el-table-column prop="common" label="备注" align="center" />
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" prev-text="上一页" next-text="下一页" />
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
import { uploadActivityFile } from '@/api/db'
import { stuActivityTplFields } from '@/config'
export default {
  data() {
    return {
      downloadUrl: `${process.env.BASE_URL}/stu/db/activity/file`,
      header: ['activityName', 'activityDate', 'stuId', 'stuName', 'common'],
      file: null,
      list: [],
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      tableHeader: [],
      dialogVisible: false,
      dialogMsg: '',
      uploadFailData: [],
      errStudents: []
    }
  },
  methods: {
    handleFilter(stuId) {
      // this.list = this.tableData.filter((item) => stuId === `${item.stuId}`)
    },
    handleSizeChange(pageSize) {
      this.list = this.tableData.slice(0, pageSize)
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.list = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
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
          message: '文件格式不正确，请选择正确的文件模板',
          type: 'warning'
        })
        return
      }

      this.validateTableData()
      if (this.errStudents.length) {
        this.$message({
          message: '学生数据错误，请核对后上传',
          type: 'warning'
        })
        return
      }

      this.$confirm('即将上传文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        uploadActivityFile(this.file).then(({ data, message }) => {
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
      this.list = data.results.slice(0, this.pageSize)
      this.tableHeader = data.header
      this.errStudents = []
      // console.log(this.file)
      console.log(this.tableHeader)
      console.log(this.tableData)
    },
    validateTableData() {
      const errStudents = this.errStudents
      const tableData = this.tableData
      tableData.forEach((student, index) => {
        Object.keys(student).forEach((key) => {
          const value = student[key]
          if (key !== 'common') {
            if (this.isEmpty(value)) {
              const stuId = `${student.stuId}`
              if (errStudents.indexOf(stuId) === -1) {
                errStudents.push(stuId)
              }
            }
          }
        })
      })
    },
    validateTableHeader() {
      let flag = true
      const tableHeader = this.tableHeader
      for (let i = 0; i < tableHeader.length; i++) {
        if (tableHeader[i] !== stuActivityTplFields[i]) {
          flag = false
          return flag
        }
      }
      return flag
    },
    isEmpty: (val) => `${val}`.trim() === ''
  },
  coumpted: {
  },
  components: {
    uploadExcel
  }
}
</script>

<style lang="scss" scoped>
.error-student {
  margin: 20px 0;
  .stu-tag {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>
