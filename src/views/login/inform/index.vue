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
      <el-table :data="informs" v-loading.body="loading" element-loading-text="给我一点时间" :show-header="showHeader" border fit highlight-current-row>
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
import { fetchInformByPage } from '@/api/inform/admin'
const pageSize = 6
export default {
  name: 'inform',
  data() {
    return {
      informs: [],
      loading: true,
      showHeader: true,
      informPage: 0,
      isLastPage: false,
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
      fetchInformByPage(this.informPage, pageSize).then((res) => {
        this.informs = res.data.sort((a, b) => {
          return a.informId - b.informId
        })
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
      this.prevBtnDisabled = newPage === 0
    },
    informs({ length }, old) {
      this.nextBtnDisabled = (!length || length < pageSize || this.isLastPage)
      if (!length && old.length) {
        this.prevPage()
        this.isLastPage = true
      } else {
        this.isLastPage = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.inform {
  width: 650px;

  &-card {
    width: 100%;
  }
}
</style>
