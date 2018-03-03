<template>
  <div>
    db
  </div>
</template>

<script>
import { fetchClassByMajor, fetchMajorByYear, fetchAllYear } from '@/api/class'
export default {
  mounted() {
    fetchAllYear()
    fetchMajorByYear(2017)
    fetchClassByMajor(1)
  }
}
</script>
