<template>
  <div>
    <el-container class="container">
      <el-aside width="35%" class="aside">
        <el-collapse accordion>
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
              <p class="suggestion">暂无审批记录</p>
            </div>
          </el-collapse-item>
          <!-- <el-collapse-item>
              <template slot="title">
                <i :class="checkTitle(checkResults.lv3)" class="header-icon"></i>
                场地审批
              </template>
              <div v-if="checkResults.lv3" class="check-result">
                <p class="suggestion">{{ checkResults.lv3.comment }} </p>
                <div class="result-box">
                  <el-tag class="result" :type="checkTagType(checkResults.lv3.result)">
                    {{ checkResults.lv3.result }}
                  </el-tag>
                  <span class="person">
                    审核人： {{ checkResults.lv3.auditor }}
                  </span>
                </div>
              </div>
              <div v-else>
                <p class="suggestion">暂无审批记录</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <i :class="checkTitle(checkResults.lv3)" class="header-icon"></i>
                社联审批
              </template>
              <div v-if="checkResults.lv3" class="check-result">
                <p class="suggestion">{{ checkResults.lv3.comment }} </p>
                <div class="result-box">
                  <el-tag class="result" :type="checkTagType(checkResults.lv3.result)">
                    {{ checkResults.lv3.result }}
                  </el-tag>
                  <span class="person">
                    审核人： {{ checkResults.lv3.auditor }}
                  </span>
                </div>
              </div>
              <div v-else>
                <p class="suggestion">暂无审批记录</p>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <i :class="checkTitle(checkResults.lv4)" class="header-icon"></i>
                团委审批
              </template>
              <div v-if="checkResults.lv4" class="check-result">
                <p class="suggestion">{{ checkResults.lv4.comment }} </p>
                <div class="result-box">
                  <el-tag class="result" :type="checkTagType(checkResults.lv4.result)">
                    {{ checkResults.lv4.result }}
                  </el-tag>
                  <span class="person">
                    审核人： {{ checkResults.lv4.auditor }}
                  </span>
                </div>
              </div>
              <div v-else>
                <p class="suggestion">暂无审批记录</p>
              </div>
            </el-collapse-item> -->
        </el-collapse>
      </el-aside>
      <el-main class="main-content">
      </el-main>
    </el-container>
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
      ]
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
    parseDate: (timeStamp) => new Date(timeStamp).toLocaleDateString()
  }
}
</script>

<style lang="scss" scoped>
.passed {
  color: green;
}

.rejected {
  color: red;
}

.checking {
  color: orange;
}

.suggestion {
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

  .main-content {}
}
</style>

