<template>
  <div class="base-info-container">
    <base-list-view :labels="labels" :data="stuBaseInfo" :labelPosition="'center'" />
  </div>
</template>
<script>
import BaseListView from '@/components/BaseListView'
import { fetchStuBaseInfo } from '@/api/student'
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
        { key: 'political', name: '政治面貌' },
        { key: 'photo', name: '照片' }
      ]
    }
  },
  created() {
    fetchStuBaseInfo().then((res) => {
      this.stuBaseInfo = res.data
    }).catch(_ => _)
  },
  components: {
    BaseListView
  }
}
</script>
