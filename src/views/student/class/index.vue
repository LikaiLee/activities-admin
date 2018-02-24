<template>
  <div>
    班级学生信息管理
  </div>
</template>

<script>
import { fetchStudentByStuId } from '@/api/student/classAdmin'
export default {
  created() {
    fetchStudentByStuId('15905730')
  }
}
</script>
