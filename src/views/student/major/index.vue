<template>
  <div>
    专业信息管理
  </div>
</template>
<script>
import { fetchStudentByStuId } from '@/api/student/majorAdmin'
export default {
  created() {
    fetchStudentByStuId('15905730')
  }
}
</script>
