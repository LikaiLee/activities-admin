<template>
  <div class="inform-manage-container">

    <inform-table :fromIndex="fromIndex" :data="list" :loading="loading" @update="showUpdateDialog" @delete="handleDelete" />
    <simple-pagination @pageChanged="handlePageChanged" :show="!loading" :data="list" :pageSize="pageSize" class="pagination" />
    <inform-dialog @confirm="handleUpdate" @cancel="toggleDialog" @visibleChange="handleVisibleChange" :visible="visible" :data="temp" />
  </div>
</template>

<script>
import InformTable from '@/components/Inform/InformTable'
import InformDialog from '@/components/Inform/InformDialog'
import SimplePagination from '@/components/SimplePagination'
import { fetchInformByPage, deleteInformById, updateInform } from '@/api/inform/admin'
export default {
  data() {
    return {
      list: [],
      loading: true,
      fromIndex: 1,
      curPage: 0,
      pageSize: 10,
      visible: false,
      temp: {
        title: '',
        content: ''
      }
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
    handleUpdate(data) {
      updateInform(data).then(res => {
        this.toggleDialog()
        this.$notify({
          title: '修改成功',
          message: res.message,
          type: 'success',
          duration: 3000
        })
        this._fetchData()
      }).catch(() => { })
    },
    showUpdateDialog(row) {
      this.toggleDialog()
      this.temp = row
    },
    handleDelete(id) {
      deleteInformById(id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this._fetchData()
      }).catch(() => { })
    },
    toggleDialog() {
      this.visible = !this.visible
    },
    handleVisibleChange(newVal) {
      this.visible = newVal
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
  components: {
    InformTable,
    InformDialog,
    SimplePagination
  }
}
</script>

<style lang="scss" scoped>
</style>
