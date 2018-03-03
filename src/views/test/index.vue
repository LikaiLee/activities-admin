<template>
  <div>
    test
  </div>
</template>

<script>
/*eslint-disable */
// import axios from 'axios'
import fetch from '@/utils/fetch'
import { fetchClassByMajor, fetchMajorByYear, fetchAllYear } from '@/api/class'
export default {
  created() {
    fetchClassByMajor(1)
  },
  methods: {
    async test() {
      return 'test'
    },
    async test2() {
      const res = await this.test()
      console.log(res)
      return 'test2'
    }
  },
  components: {
  }
}
</script>

