<template>
  <div class="inform">
    <el-card class="inform-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-fa-info-circle"></i>
        通知公告
        <el-button-group style="float: right;">
          <el-button @click="prevPage" ref="prevBtn" :disabled="prevBtnDisabled" plain icon="el-icon-arrow-left" size="mini"></el-button>
          <el-button @click="nextPage" ref="nextBtn" :disabled="nextBtnDisabled" plain icon="el-icon-arrow-right" size="mini"></el-button>
        </el-button-group>
      </div>
      <el-table v-loading.body="loading" element-loading-text="给我一点时间" :data="informs" :show-header="showHeader" border fit highlight-current-row height="300">
        <el-table-column label="标题">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p>标题: {{ scope.row.title }}</p>
              <p>发布者: {{ scope.row.author }}</p>
              <p>日期: {{ scope.row.date | dateFormatter }}</p>
              <div slot="reference" class="name-wrapper">
                <span class="link-type" @click.prevent="informClickHandler(scope.row)">
                  <i class="el-icon-fa-pencil-square-o"></i>&nbsp;&nbsp;{{scope.row.title}}
                </span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="author" align="center" label="发布者" width="100" />
        <el-table-column prop="date" align="center" label="日期" width="200">
          <template slot-scope="scope">
            {{ scope.row.date | dateFormatter }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { fetchInformByPage } from '@/api/inform'
const perPageNum = 6
export default {
  name: 'inform',
  data() {
    return {
      informs: [],
      loading: true,
      showHeader: true,
      informPage: 0,
      prevBtnDisabled: true,
      nextBtnDisabled: false
    }
  },
  created() {
    this._fetchInform()
  },
  methods: {
    informClickHandler(inform) {
      this.$router.push(`/inform/detail/${inform.informId}`)
    },
    nextPage() {
      this.informPage++
    },
    prevPage() {
      this.informPage = Math.max(0, --this.informPage)
    },
    _fetchInform() {
      this.loading = true
      fetchInformByPage(this.informPage).then((res) => {
        this.informs = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  filters: {
    dateFormatter(date) {
      return date.split(' ')[0]
    }
  },
  watch: {
    informPage(newPage) {
      this._fetchInform()
      if (newPage === 0) {
        this.prevBtnDisabled = true
      } else {
        this.prevBtnDisabled = false
      }
    },
    informs(newData) {
      if (!newData.length || newData.length < perPageNum) {
        this.nextBtnDisabled = true
      } else {
        this.nextBtnDisabled = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.inform {
  width: 650px;
  height: 300px;

  &-card {
    width: 100%;
  }
}
</style>
