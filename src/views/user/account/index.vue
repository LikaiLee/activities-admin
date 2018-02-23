<template>
  <div>
    {{ stuBaseInfo }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getStuBaseInfo } from '@/api/stuBase'
export default {
  data() {
    return {
      stuBaseInfo: null
    }
  },
  created() {
    getStuBaseInfo().then((res) => {
      this.stuBaseInfo = res.data
    }).catch(_ => _)
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>
