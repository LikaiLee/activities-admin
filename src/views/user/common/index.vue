<template>
  <div class="base-info-container">
    <base-list-view :labels="labels" :data="stuBaseInfo" :labelPosition="'center'" />
  </div>
</template>
<script>
import BaseListView from '@/components/BaseListView'
import { getStuBaseInfo } from '@/api/stuBase'
export default {
  data() {
    return {
      stuBaseInfo: null,
      labels: [
        { key: 'realName', name: '姓名' },
        { key: 'stuId', name: '学号' },
        { key: 'sex', name: '性别' },
        { key: 'entrance_time', name: '入学时间' },
        { key: 'className', name: '班级' },
        { key: 'dormitory', name: '寝室' },
        { key: 'photo', name: '照片' }
      ]
    }
  },
  created() {
    getStuBaseInfo().then((res) => {
      this.stuBaseInfo = res.data
    }).catch(_ => _)
  },
  components: {
    BaseListView
  }
}
</script>
