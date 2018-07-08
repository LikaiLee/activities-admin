<template>
  <el-table :data="curList" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
    <el-table-column type="index" :index="fromIndex" align="center" />
    <el-table-column align="center" label="活动名">
      <template slot-scope="scope">
        <span class="link-type" v-if="scope.row" @click="showDetail(scope.row)">
          {{scope.row.activityName}}
        </span>
      </template>
    </el-table-column>
    <el-table-column width="180px" align="center" label="申请日期">
      <template slot-scope="scope">
        <span>{{scope.row.applyDate | dateFormatter}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="chiefName" label="社长" />
    <el-table-column prop="clubName" label="社团" />
    <el-table-column prop="status" label="状态" />
    <el-table-column v-if="showOperate" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="emitDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ApplyTable',
  props: {
    curList: {
      type: Array,
      default() { return [] }
    },
    loading: {
      type: Boolean,
      default: false
    },
    fromIndex: {
      type: Number,
      default: 1
    },
    showOperate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitDelete(row) {
      this.$emit('delete', row)
    },
    // 显示申请详情
    showDetail({ applicationId }) {
      this.$router.push(`/club/apply/detail/${applicationId}`)
    }
  },
  filters: {
    dateFormatter(date) {
      return date
        .replace(/年|月/g, '-')
        .replace(/时|分/g, ':')
        .replace(/日|秒\s*\w*\s*/g, '')
    }
  }
}
</script>

