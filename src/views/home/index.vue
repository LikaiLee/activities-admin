<template>
  <div>
    Home {{user}}
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

<style lang="scss" scoped>

</style>

