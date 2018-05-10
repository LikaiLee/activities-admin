<template>
  <div>
    <el-row :gutter="20" class="container">
      <el-col :span="8" class="aside">
        <el-collapse :accordion="false">
          <el-collapse-item v-for="(record, index) in checkData" :key="index">
            <template slot="title">
              <i :class="checkTitle(checkResults[record.level])" class="header-icon"></i>
              {{ record.title }}
            </template>
            <div v-if="checkResults[record.level]" class="check-result">
              <p class="suggestion">{{ checkResults[record.level].comment }} </p>
              <div class="result-box">
                <el-tag class="result" :type="checkTagType(checkResults[record.level])">
                  {{ checkResults[record.level].result }}
                </el-tag>
                <span class="person">
                  审核人： {{ checkResults[record.level].auditor }}
                </span>
              </div>
            </div>
            <div v-else>
              <p class="indent">暂无审批记录</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col v-if="applyData" v-loading="!applyData" :span="16" class="main-content">
        <el-table :data="[applyData]" border fit highlight-current-row>
          <el-table-column align="center" prop="activityName" label="活动名称" />
          <el-table-column align="center" prop="activityPlace" label="活动地点" />
          <el-table-column align="center" prop="activitypeople" label="参与对象及人数" />
          <el-table-column align="center" label="活动时间">
            <template slot-scope="scope">
              <span>{{scope.row.activityStart | parseDate}} 至 {{scope.row.activityEnd | parseDate}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="[applyData]" border fit highlight-current-row>
          <el-table-column align="center" prop="clubName" label="申办社团" />
          <el-table-column align="center" prop="chiefName" label="社长姓名" />
          <el-table-column align="center" label="是否为优秀社团">
            <template slot-scope="scope">
              <span>{{scope.row.isFine === 0 ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请日期">
            <template slot-scope="scope">
              <span>{{ scope.row.applyDate.split(' ')[0] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="[applyData]" border fit highlight-current-row>
          <el-table-column align="center" prop="selfMoney" label="自留经费" />
          <el-table-column align="center" prop="reserveMoney" label="社联预留经费" />
          <el-table-column align="center" prop="status" label="审核状态" />
          <el-table-column align="center" label="是否有附件">
            <template slot-scope="scope">
              <div v-if="scope.row.hasFile === 1">
                <a :href="downloadLink + scope.row.applicationId" ref="downloadAnchor" style="display: none;"></a>
                <span class="link-type" @click="downloadFile">
                  下载
                </span>
              </div>
              <span v-else>否</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px;">
          <b>活动简介：</b>
          <p class="indent">{{ applyData.introduce }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchApprovalById } from '@/api/club/app'
// import { postApproval } from '@/api/club/appApprove'
// postApproval({ appId, result, comment })
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
      downloadLink: `${process.env.BASE_URL}/club/app/file?id=`
    }
  },
  mounted() {
    this.applyId = this.$route.params.applyId
    fetchApprovalById(this.applyId).then(({ data }) => {
      this.applyData = data
    }).then(() => {
      this.checkResults.lv2 = this.applyData.results.find(_ => _.approvalLV === 2)
      this.checkResults.lv3 = this.applyData.results.find(_ => _.approvalLV === 3)
      this.checkResults.lv4 = this.applyData.results.find(_ => _.approvalLV === 4)
    })
  },
  methods: {
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
    checkTagType: ({ result }) => result === '同意' ? 'success' : 'danger'
  },
  filters: {
    parseDate: (timeStamp) => new Date(+timeStamp).toLocaleDateString()
  }
}
</script>

<style lang="scss" scoped>
.passed {
  color: #67c23a;
}

.rejected {
  color: #f56c6c;
}

.checking {
  color: #e6a23c;
}

.indent {
  text-indent: 2em;
}

.check-result {
  padding-bottom: 20px;
  .result-box {
    .result {
      float: left; // line-height: 30px;
    }
    .person {
      float: right;
      line-height: 30px;
    }
  }
}

.container {
  width: 100%;
  .aside {
    overflow: hidden;
  }

  .main-content {
    height: 200px; // background: #e4e;
  }
}
</style>

