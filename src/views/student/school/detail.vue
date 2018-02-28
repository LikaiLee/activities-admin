<template>
  <div class="school-detail-container">
    <el-table :data="[student]" v-loading="!student" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="stuId" label="学号" align="center" width="100px" />
      <el-table-column prop="realName" label="姓名" align="center" width="100px" />
      <el-table-column prop="sex" label="性别" align="center" width="60px" />
      <el-table-column prop="entrance_time" label="入学时间" align="center" />
      <el-table-column prop="className" label="班级" align="center" />
      <el-table-column prop="political" label="政治面貌" align="center" />
      <el-table-column prop="dormitory" label="寝室" align="center" />
      <el-table-column prop="photo" label="照片" align="center" />
    </el-table>
    <el-tabs @tab-click="handleTabClick" type="card" class="score-container">
      <el-tab-pane v-for="item in scoreList" :key="item.key" :label="item.label">
        {{item.list}}
        <el-table :data="item.list" v-loading="!item.list.length" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="activityDate" label="日期" align="center" />
          <el-table-column prop="activityName" label="活动名" align="center" />
          <el-table-column prop="score" label="加分" align="center" />
          <el-table-column prop="term" label="学期" align="center" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import {
  fetchStudentByStuId, fetchActivity,
  fetchHonor, fetchOffice,
  fetchPractice, fetchReserve, fetchSkill, fetchVolunteer
} from '@/api/student/schoolAdmin'
export default {
  data() {
    return {
      stuId: -1,
      student: null,
      activityList: [],
      honorList: [],
      officeList: [],
      practiceList: [],
      reserveList: [],
      skillList: [],
      volunteerList: [],
      scoreList: [
        { label: '活动', key: 'activity', list: [] },
        { label: '荣誉', key: 'honor', list: [] },
        { label: '职位', key: 'office', list: [] },
        { label: '实践', key: 'practice', list: [] },
        { label: '加分', key: 'reserve', list: [] },
        { label: '技能', key: 'skill', list: [] },
        { label: '志愿', key: 'volunteer', list: [] }
      ]
    }
  },
  mounted() {
    this.stuId = this.$route.params.stuId
    fetchStudentByStuId(this.stuId).then(res => {
      this.student = res.data
    }).catch()
  },
  methods: {
    handleTabClick(tab) {
      const scoreItem = this.scoreList[tab.index]
      switch (scoreItem.key) {
        case 'activity':
          fetchActivity({
            stuId: this.stuId,
            term: '201701',
            page: 0
          }).then(res => {
            scoreItem.list = res.data
          }).catch()
          break
        case 'honor': break
        case 'office': break
        case 'practice': break
        case 'reserve': break
        case 'skill': break
        case 'volunteer': break
      }
      console.log(scoreItem.key)
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.school-detail-container {
  .score-container {
    margin-top: 20px;
  }
}
</style>

