<template>
  <div>
    <el-row :gutter="20" class="container">
      <el-col v-if="applyData" :span="8" class="aside">
        <el-collapse :accordion="false">
          <el-collapse-item v-for="(record, index) in checkData" :key="index">
            <template slot="title">
              <i :class="checkTitle(checkResults[record.level])" class="header-icon"></i>
              {{ record.title }}
            </template>
            <div v-if="checkResults[record.level]" class="check-result">
              <p class="indent">{{ checkResults[record.level].comment }} </p>
              <div class="result-box" :class="checkTagType(checkResults[record.level])">
                <div class="result">
                  <b>{{ checkResults[record.level].result }}</b>
                </div>
                <div class="person">
                  审核人：
                  <b class="black">{{ checkResults[record.level].auditor }}</b>
                </div>
              </div>
            </div>
            <div v-else>
              <el-alert title="暂无审批记录" type="warning" :closable="false" />
            </div>
          </el-collapse-item>
        </el-collapse>
        <div v-if="approvalLV.authorized" class="approval-container">
          <div class="title">
            <i class="el-icon-fa-flag" />&nbsp;&nbsp;{{ approvalLV.title }}</div>
          <div>
            <el-form>
              <el-form-item label="是否同意" style="margin-bottom: 0px;">
                <el-radio v-model="isAgreed" label="1">同意</el-radio>
                <el-radio v-model="isAgreed" label="0">不同意</el-radio>
              </el-form-item>
              <el-form-item label="评语">
                <el-input type="textarea" v-model="comment" :autosize="{ minRows: 4}"></el-input>
              </el-form-item>
              <el-button type="primary" :loading="btnSubmitLoading" ref="btnSubmit" @click="handleSubmit">提交审核</el-button>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col v-if="applyData" v-loading="!applyData" :span="16" class="main-content">
        <div class="detail-table">
          <el-row>
            <el-col class="cell header category">基本信息</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header" :span="12">申请时间</el-col>
            <el-col class="cell header" :span="12">活动名称</el-col>
          </el-row>
          <el-row>
            <el-col class="cell" :span="12">{{ applyData.applyDate.split(' ')[0] }}</el-col>
            <el-col class="cell" :span="12">{{ applyData.activityName }}</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header" :span="12">社团</el-col>
            <el-col class="cell header" :span="12">社长</el-col>
          </el-row>
          <el-row>
            <el-col class="cell" :span="12">{{ applyData.clubName }}</el-col>
            <el-col class="cell" :span="12">{{ applyData.chiefName }}</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header category">活动信息</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header" :span="8">时间</el-col>
            <el-col class="cell header" :span="8">地点</el-col>
            <el-col class="cell header" :span="8">人数</el-col>
          </el-row>
          <el-row>
            <el-col class="cell" :span="8">{{ applyData.activityStart | parseDate }} ~ {{ applyData.activityEnd | parseDate }}</el-col>
            <el-col class="cell" :span="8">{{ applyData.activityPlace }}</el-col>
            <el-col class="cell" :span="8">{{ applyData.activitypeople }}</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header category">经费</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header" :span="12">自留经费</el-col>
            <el-col class="cell header" :span="12">社联预留经费</el-col>
          </el-row>
          <el-row>
            <el-col class="cell" :span="12">¥{{ applyData.selfMoney }}</el-col>
            <el-col class="cell" :span="12">¥{{ applyData.reserveMoney }}</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header category">其他</el-col>
          </el-row>
          <el-row>
            <el-col class="cell header" :span="12">是否为优秀社团</el-col>
            <el-col class="cell header" :span="12">是否有附件</el-col>
          </el-row>
          <el-row>
            <el-col class="cell" :span="12">{{applyData.isFine === 0 ? '是' : '否'}}</el-col>
            <el-col class="cell" :span="12">
              <div v-if="applyData.hasFile === 1">
                <a :href="downloadLink + applyData.applicationId" ref="downloadAnchor" style="display: none;"></a>
                <span class="link-type" @click="downloadFile">
                  下载
                </span>
              </div>
              <span v-else>否</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="cell header category">活动简介</el-col>
          </el-row>
          <el-row>
            <el-col class="cell introduce indent">{{ applyData.introduce }}</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchApprovalById } from '@/api/club/app'
import { fetchApprovalLv, postApproval } from '@/api/club/appApprove'
export default {
  data() {
    return {
      applyId: -1,
      applyData: null,
      passedColor: 'green',
      rejectedColor: 'red',
      checkingColor: 'orange',
      checkResults: {
        lv2: null,
        lv3: null,
        lv4: null
      },
      checkData: [
        {
          title: '财务审批',
          level: 'lv2'
        },
        {
          title: '场地审批',
          level: 'lv3'
        },
        {
          title: '社联审批',
          level: 'lv3'
        },
        {
          title: '团委审批',
          level: 'lv4'
        }
      ],
      downloadLink: `${process.env.BASE_URL}/club/app/file?id=`,
      approvalLV: {
        authorized: false,
        title: ''
      },
      isAgreed: false,
      comment: '',
      btnSubmitLoading: false
    }
  },
  mounted() {
    this.applyId = +this.$route.params.applyId
    fetchApprovalById(this.applyId).then(({ data }) => {
      this.applyData = data
    }).then(() => {
      this.checkResults.lv2 = this.applyData.results.find(_ => _.approvalLV === 2)
      this.checkResults.lv3 = this.applyData.results.find(_ => _.approvalLV === 3)
      this.checkResults.lv4 = this.applyData.results.find(_ => _.approvalLV === 4)
      // 2 审批财务
      // 3 场地和社联审批
      // 4 团委审批
      // this.applyData.lv === 100 失败 -> 不可审批
      fetchApprovalLv().then(({ data }) => {
        // 审核阶段
        const phaseLv = this.applyData.lv
        const authorizedRight = data.data
        if (data.status === 200 && phaseLv !== 100 && phaseLv === authorizedRight) {
          this.approvalLV.authorized = true
          switch (authorizedRight) {
            case 2:
              this.approvalLV.title = '财务审批'
              break
            case 3:
              this.approvalLV.title = '场地和社联审批'
              break
            case 4:
              this.approvalLV.title = '团委审批'
              break
          }
        }
      })
    })
  },
  methods: {
    // 提交审批
    handleSubmit() {
      if (!this.isAgreed) {
        this.$message({
          type: 'warning',
          message: '请选择是否同意该申请！'
        })
        return
      }
      this.btnSubmitLoading = true
      postApproval({
        appId: this.applyId,
        result: +this.isAgreed,
        comment: this.comment
      }).then(res => {
        this.$message({
          type: 'success',
          message: '审核成功！'
        })
        this.btnSubmitLoading = false
        window.location.reload()
      }).catch(() => {
        this.btnSubmitLoading = false
        this.$message({
          type: 'error',
          message: '审核失败！'
        })
      })
      this.btnSubmitLoading = false
    },
    downloadFile() {
      this.$refs.downloadAnchor.click()
    },
    // 标题效果
    checkTitle(level) {
      if (level) {
        if (level.result === '同意') {
          return ['el-icon-fa-check-circle', 'passed']
        } else {
          return ['el-icon-fa-times-circle', 'rejected']
        }
      } else {
        return ['el-icon-fa-question-circle', 'checking']
      }
    },
    // 审核意见效果
    checkTagType: ({ result }) => result === '同意' ? 'passed-result' : 'rejected-result'
  },
  filters: {
    parseDate: (timeStamp) => new Date(+timeStamp).toLocaleDateString()
  }
}
</script>

<style lang="scss" scoped>
$passedColor: #67c23a;
$rejectedColor: #f56c6c;
$checkingColor: #e6a23c;
$borderColor: #333;

.passed {
  color: $passedColor;
}

.rejected {
  color: $rejectedColor;
}

.checking {
  color: $checkingColor;
}

.indent {
  text-indent: 2em;
}

.approval-container {
  margin-top: 20px;
  .title {
    line-height: 30px;
    border-bottom: 1px solid #ebeef5;
  }
}

.detail-table {
  position: relative;
  margin-bottom: 20px;
  text-align: center;
  border-top: 1px solid $borderColor;
  border-left: 1px solid $borderColor;

  .el-row {
    box-sizing: border-box;
  }

  .cell {
    padding: 6px 0;
    word-break: break-all;
    line-height: 23px;
    border-right: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    &:hover.cell:not(.header) {
      background-color: #f5f7fa;
    }
  }
  .header {
    padding: 10px 0;
    color: #1f2d3d;
    font-weight: bold;
  }
  .category {
    color: #333;
    background: #e4e4e4;
  }
}

.check-result {
  .result-box {
    height: 40px;
    padding: 8px 16px;
    &.passed-result {
      background-color: #f0f9eb;
      color: $passedColor;
    }
    &.rejected-result {
      background-color: #fef0f0;
      color: $rejectedColor;
    }
    .result {
      float: left;
      line-height: 24px;
    }
    .person {
      float: right;
      line-height: 24px;
      .black {
        color: #1f2d3d;
      }
    }
  }
}

.container {
  width: 100%; // overflow: hidden;
  .aside {
    overflow: hidden;
  }
  .introduce {
    text-align: left;
  }
}
</style>
