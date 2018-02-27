<template>
  <div>
    class.vue {{ stuId }}
  </div>
</template>

<script>
import { fetchActivity } from '@/api/student/classAdmin'
export default {
  data() {
    return {
      stuId: -1
    }
  },
  created() {
    this.stuId = this.$route.params.stuId
    fetchActivity({
      stuId: this.stuId,
      term: '201701',
      page: 0
    })
  }
}
</script>
