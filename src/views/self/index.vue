<template>
  <div>
    个人资料 {{ user }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>
