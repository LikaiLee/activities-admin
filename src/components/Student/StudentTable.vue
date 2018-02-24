<template>
  <div class="student-table">
    <el-table :data="data" v-loading="loading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="fromIndex" align="center" />
      <el-table-column prop="stuId" label="学号" align="center" width="100px" />
      <el-table-column label="姓名" align="center" width="100px">
        <template slot-scope="scope">
          <span class="link-type" @click="emitUpdate(scope.row)">{{scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center" width="60px" />
      <el-table-column prop="entrance_time" label="入学时间" align="center" />
      <el-table-column prop="className" label="班级" align="center" />
      <el-table-column prop="political" label="政治面貌" align="center" />
      <el-table-column prop="dormitory" label="寝室" align="center" />
      <el-table-column prop="photo" label="照片" align="center" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="emitUpdate(scope.row)" size="mini">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StudentTable',
  props: {
    data: {
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
    }
  },
  methods: {
    emitUpdate(row) {
      this.$emit('update', row)
    }
  }
}
</script>

