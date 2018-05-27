<template>
  <div class="home-container">
    <el-table :data="list" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="fromIndex" align="center" />
      <el-table-column width="180px" align="center" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.modified | dateFormatter}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="标题" prop="title" />
      <el-table-column prop="author" align="center" label="发布者" width="100" />
    </el-table>
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" class="pagination" />
  </div>
</template>

<script>
import SimplePagination from '@/components/SimplePagination'
import { fetchInformByPage } from '@/api/inform/admin'
export default {
  data() {
    return {
      list: [],
      loading: true,
      fromIndex: 1,
      curPage: 0,
      pageSize: 10
    }
  },
  mounted() {
    this._fetchData()
  },
  methods: {
    handlePageChanged({ page, fromIndex }) {
      this.fromIndex = fromIndex
      this.curPage = page
      this._fetchData()
    },
    _fetchData() {
      this.loading = true
      fetchInformByPage(this.curPage, this.pageSize).then(({ data }) => {
        if (data.length) {
          this.list = data.sort((a, b) => a.informId - b.informId)
        } else {
          this.list = data
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
