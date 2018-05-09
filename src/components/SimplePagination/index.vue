<template>
  <div class="simple-pagination">
    <el-button-group v-show="show">
      <el-button @click="emitPrevPage" :disabled="prevBtnDisabled" type="primary" plain icon="el-icon-arrow-left" size="small">上一页</el-button>
      <el-button @click="emitNextPage" :disabled="nextBtnDisabled" type="primary" plain size="small">下一页
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'SimplePagination',
  props: {
    // 是否显示分页
    show: {
      type: Boolean,
      default: true
    },
    // 分页数据 必须
    data: {
      type: Array,
      required: true,
      default() { return [] }
    },
    // 每页大小 必须
    pageSize: {
      type: Number,
      required: true,
      default: 0
    },
    // 自定义类型
    dataType: {
      type: String,
      default: ''
    },
    // 自定义当前页
    fromPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curPage: this.fromPage,
      isLastPage: false,
      prevBtnDisabled: true,
      nextBtnDisabled: false
    }
  },
  methods: {
    emitPrevPage() {
      this.curPage = Math.max(0, --this.curPage)
      this.$emit('prevPage', this.curPage)
      this.emitPageChanged()
    },
    emitNextPage() {
      this.curPage++
      this.$emit('nextPage', this.curPage)
      this.emitPageChanged()
    },
    emitPageChanged() {
      const fromIndex = this.curPage * this.pageSize + 1
      this.$emit('pageChanged', {
        page: this.curPage,
        fromIndex,
        dataType: this.dataType
      })
    }
  },
  watch: {
    curPage(newPage) {
      this.prevBtnDisabled = newPage === 0
    },
    fromPage(page) {
      this.curPage = page
    },
    data(newData, oldData) {
      const length = newData.length
      // 下一页按钮失效 => 长度为0 || 当前页数据数量小于每页数量 || 到达最后一页
      this.nextBtnDisabled = (!length || length < this.pageSize || this.isLastPage)
      // 到达最后一页 && 上一次请求数据不为空(防止数据库为空时死循环)
      if (!length && oldData.length) {
        this.emitPrevPage()
        this.isLastPage = true
      } else {
        this.isLastPage = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-pagination {
  margin: 20px 0 20px 46%;
}
</style>
