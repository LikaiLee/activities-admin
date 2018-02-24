<template>
  <div class="inform-table">
    <el-table :data="data" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="fromIndex" align="center" />
      <el-table-column prop="informId" align="center" label="ID" width="65" />
      </el-table-column>
      <el-table-column width="180px" align="center" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.modified | dateFormatter}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="标题">
        <template slot-scope="scope">
          <span class="link-type" @click="emitUpdate(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="author" align="center" label="发布者" width="100" />
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="emitUpdate(scope.row)">修改
          </el-button>
          <el-button size="small" type="danger" @click="emitDelete(scope.row.informId)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'InformTable',
  props: {
    data: {
      type: Array,
      default() { return [] }
    },
    loading: {
      type: Boolean,
      default: true
    },
    fromIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
  },
  methods: {
    emitDelete(id) {
      this.$emit('delete', id)
    },
    emitUpdate(row) {
      this.$emit('update', row)
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

