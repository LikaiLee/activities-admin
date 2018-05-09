<template>
  <div>
    <el-tabs type="card">
      <el-tab-pane label="已提交申请">
        <el-tabs :value="curTabType" @tab-click="handleTabClick" tab-position="left">
          <el-tab-pane name="checking" label="审批中">
            <el-table :data="curList" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
              <el-table-column type="index" :index="fromIndex" align="center" />
              <el-table-column prop="activityName" label="活动名" />
              <el-table-column width="180px" align="center" label="申请日期">
                <template slot-scope="scope">
                  <span>{{scope.row.applyDate | dateFormatter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="chiefName" label="社长" />
              <el-table-column prop="clubName" label="社团" />
              <el-table-column prop="status" label="状态" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="rejected" label="未通过">
            <el-table :data="curList" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
              <el-table-column type="index" :index="fromIndex" align="center" />
              <el-table-column prop="activityName" label="活动名" />
              <el-table-column width="180px" align="center" label="申请日期">
                <template slot-scope="scope">
                  <span>{{scope.row.applyDate | dateFormatter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="chiefName" label="社长" />
              <el-table-column prop="clubName" label="社团" />
              <el-table-column prop="status" label="状态" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="passed" label="已通过">
            <el-table :data="curList" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
              <el-table-column type="index" :index="fromIndex" align="center" />
              <el-table-column prop="activityName" label="活动名" />
              <el-table-column width="180px" align="center" label="申请日期">
                <template slot-scope="scope">
                  <span>{{scope.row.applyDate | dateFormatter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="chiefName" label="社长" />
              <el-table-column prop="clubName" label="社团" />
              <el-table-column prop="status" label="状态" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :fromPage="curPage" :data="curList" :pageSize="pageSize" class="pagination" />
      </el-tab-pane>
      <el-tab-pane label="提交新申请">
        <el-form style="width: 550px;" ref="form" :model="form" label-position="right" label-width="150px">
          <el-form-item label="活动名称" prop="name">
            <el-input placeholder="活动名称" v-model="form.name" />
          </el-form-item>
          <el-form-item label="活动地点" prop="place">
            <el-input placeholder="活动地点" v-model="form.place" />
          </el-form-item>
          <el-form-item label="活动时间" prop="dateRange">
            <el-date-picker v-model="dateRange" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="参与对象及人数" prop="people">
            <el-input placeholder="人数" v-model="form.people" />
          </el-form-item>
          <el-form-item label="剩余自留经费" prop="selfMoney">
            <el-input-number v-model="form.selfMoney" :min="0" controls-position="right" label="剩余自留经费" />
          </el-form-item>
          <el-form-item label="剩余社联预留经费">
            <el-input-number v-model="form.reserveMoney" :min="0" controls-position="right" label="剩余社联预留经费" />
          </el-form-item>
          <el-form-item label="是否是优秀社团活动" prop="isFine">
            <el-switch v-model="isFine"></el-switch>
          </el-form-item>
          <el-form-item label="活动简介" prop="introduce">
            <el-input type="textarea" placeholder="200字以内" v-model="form.introduce" :autosize="{ minRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="附加文件">
            <input type="file" class="file-input" @change="handleFileChange" ref="fileInput">
            <el-button @click="selectFile">选择文件</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即申请</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 社长提交申请
import SimplePagination from '@/components/SimplePagination'
import { postApproval } from '@/api/club/app'
import { fetchSelfStatus } from '@/api/club/appStatus'
export default {
  data() {
    return {
      dateRange: [],
      isFine: false,
      form: {
        name: '',
        place: '',
        people: '',
        selfMoney: 0,
        reserveMoney: 0,
        introduce: '',
        file: null
      },
      curTabType: 'checking',
      curList: [],
      loading: true,
      fromIndex: 1,
      curPage: 0,
      pageSize: 6
    }
  },
  created() {
    this.getApply()
  },
  methods: {
    // 申请状态标签页
    handleTabClick(tab) {
      this.curTabType = tab.name
      this.curPage = 0
      this.fromIndex = 1
      this.getApply()
      console.log(this.curPage)
    },
    // 分页切换
    handlePageChanged({ page, fromIndex }) {
      this.fromIndex = fromIndex
      this.curPage = page
      console.log(this.curPage)
      this.getApply()
    },
    // 根据状态获取已提交申请
    getApply() {
      this.loading = true
      let _status = 1
      switch (this.curTabType) {
        case 'checking':
          _status = 1
          break
        case 'rejected':
          _status = -1
          break
        case 'passed':
          _status = 0
          break
      }
      fetchSelfStatus(_status, this.curPage, this.pageSize).then(res => {
        this.curList = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 提交新申请
    handleSubmit() {
      this.form.isFine = this.isFine ? 0 : 1
      this.form.start = new Date(this.dateRange[0]).getTime() + ''
      this.form.end = new Date(this.dateRange[1]).getTime() + ''
      postApproval(this.form).then(({ status, message }) => {
        this.$message({
          message,
          type: status === 200 ? 'success' : 'error'
        })
      })
    },
    handleFileChange(e) {
      this.form.file = e.target.files[0]
    },
    selectFile() {
      this.$refs.fileInput.click()
    },
    resetForm() {
      this.$refs.form.resetFields()
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
  components: {
    SimplePagination
  }
}
</script>

<style lang="scss" scoped>
.file-input {
  display: none;
}
</style>
