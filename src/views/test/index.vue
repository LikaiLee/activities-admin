<template>
  <div>
    <table-list>
      <div slot="table"> table</div>
      <div slot="pagination"> pagination</div>
      <div slot="dialog"> dialog</div>
    </table-list>
  </div>
</template>

<script>
/*eslint-disable */
// import axios from 'axios'
import fetch from '@/utils/fetch'
import TableList from '@/components/TableList'
export default {
  created() {
    // fetch.post('https://www.easy-mock.com/mock/5a7bfd3ea7b3ff4311b6778f/dev/menu')
    // fetchInformByPage(1)
    // fetchInformById(1)
  },
  components: {
    TableList
  }
}
</script>

