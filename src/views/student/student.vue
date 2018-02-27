<template>
  <div>
    student.vue {{ stuId }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      stuId: -1
    }
  },
  created() {
    this.stuId = this.$route.params.stuId
  }
}
</script>
