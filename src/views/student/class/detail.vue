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
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row" :src="scope.row.photo || 'http://placehold.it/30&text=avatar'" width="30" height="30">
        </template>
      </el-table-column>
    </el-table>

    <div class="term-container">
      <el-select @change="filterByTerm" v-model="year" placeholder="请选择" style="width: 100px;">
        <el-option v-for="(year, key) in allYears" :label="year" :value="year" :key="key">{{ year }}</el-option>
      </el-select>
      <span class="desc"> 学年，第</span>
      <el-select @change="filterByTerm" v-model="semester" placeholder="请选择" style="width: 70px;">
        <el-option value="1">1</el-option>
        <el-option value="2">2</el-option>
      </el-select>
      <span class="desc"> 学期 </span>
    </div>

    <el-tabs v-loading="loading" value="activity" @tab-click="handleTabClick" type="card" class="score-container">
      <el-tab-pane label="活动" name="activity">
        <activity-table :data="curList" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane label="荣誉" name="honor">
        <honor-table :data="curList" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane label="职位" name="office">
        <office-table :data="curList" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane label="实践" name="practice">
        <practice-table :data="curList" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane label="加分" name="reserve">
        <reserve-table :data="curList" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane label="技能" name="skill">
        <skill-table :data="curList" :fromIndex="fromIndex" />
      </el-tab-pane>
      <el-tab-pane label="志愿" name="volunteer">
        <volunteer-table :data="curList" :fromIndex="fromIndex" />
      </el-tab-pane>
    </el-tabs>
    <simple-pagination @pageChanged="handlePageChanged" :fromPage="curPage" :dataType="pageDataType" :data="curList" :pageSize="pageSize" />
  </div>
</template>

<script>
import ActivityTable from '@/components/Student/ActivityTable'
import HonorTable from '@/components/Student/HonorTable'
import OfficeTable from '@/components/Student/OfficeTable'
import PracticeTable from '@/components/Student/PracticeTable'
import ReserveTable from '@/components/Student/ReserveTable'
import SkillTable from '@/components/Student/SkillTable'
import VolunteerTable from '@/components/Student/VolunteerTable'
import SimplePagination from '@/components/SimplePagination'
import {
  fetchStudentByStuId, fetchActivity,
  fetchHonor, fetchOffice,
  fetchPractice, fetchReserve, fetchSkill, fetchVolunteer
} from '@/api/student/classAdmin'

import { scoreTypes } from '@/config'

export default {
  data() {
    return {
      stuId: -1,
      fromYear: 2015,
      year: this.getCurYear(),
      semester: this.getCurSemester(),
      student: null,
      curPage: 0,
      pageSize: 3,
      curList: [],
      pageDataType: scoreTypes.ACTIVITY,
      fromIndex: 1,
      loading: false
    }
  },
  mounted() {
    this.stuId = this.$route.params.stuId
    fetchStudentByStuId(this.stuId).then(res => {
      this.student = res.data
    })
    this._fetchActivity()
  },
  methods: {
    filterByTerm() {
      this.fetchDataByType(this.pageDataType)
    },
    handlePageChanged({ page, fromIndex, dataType }) {
      this.fromIndex = fromIndex
      this.curPage = page
      this.fetchDataByType(dataType)
    },
    handleTabClick(tab) {
      const type = tab.name
      this.pageDataType = type
      this.curPage = 0
      this.fromIndex = 1
      this.fetchDataByType(type)
    },
    fetchDataByType(type) {
      switch (type) {
        case scoreTypes.ACTIVITY:
          this._fetchActivity()
          break
        case scoreTypes.HONOR:
          this._fetchHonor()
          break
        case scoreTypes.OFFICE:
          this._fetchOffice()
          break
        case scoreTypes.PRACTICE:
          this._fetchPractice()
          break
        case scoreTypes.RESERVE:
          this._fetchReserve()
          break
        case scoreTypes.SKILL:
          this._fetchSkill()
          break
        case scoreTypes.VOLUNTEER:
          this._fetchVolunteer()
          break
      }
    },
    _fetchActivity() {
      this.loading = true
      fetchActivity({
        stuId: this.stuId,
        term: this.term,
        page: this.curPage,
        size: this.pageSize
      }).then(res => {
        this.curList = res.data
        this.loading = false
      })
    },
    _fetchHonor() {
      this.loading = true
      fetchHonor({
        stuId: this.stuId,
        term: this.term,
        page: this.curPage,
        size: this.pageSize
      }).then(res => {
        this.curList = res.data
        this.loading = false
      })
    },
    _fetchOffice() {
      this.loading = true
      fetchOffice({
        stuId: this.stuId,
        term: this.term,
        page: this.curPage,
        size: this.pageSize
      }).then(res => {
        this.curList = res.data
        this.loading = false
      })
    },
    _fetchPractice() {
      this.loading = true
      fetchPractice({
        stuId: this.stuId,
        term: this.term,
        page: this.curPage,
        size: this.pageSize
      }).then(res => {
        this.curList = res.data
        this.loading = false
      })
    },
    _fetchReserve() {
      this.loading = true
      fetchReserve({
        stuId: this.stuId,
        term: this.term,
        page: this.curPage,
        size: this.pageSize
      }).then(res => {
        this.curList = res.data
        this.loading = false
      })
    },
    _fetchSkill() {
      this.loading = true
      fetchSkill({
        stuId: this.stuId,
        term: this.term,
        page: this.curPage,
        size: this.pageSize
      }).then(res => {
        this.curList = res.data
        this.loading = false
      })
    },
    _fetchVolunteer() {
      this.loading = true
      fetchVolunteer({
        stuId: this.stuId,
        term: this.term,
        page: this.curPage,
        size: this.pageSize
      }).then(res => {
        this.curList = res.data
        this.loading = false
      })
    },
    getCurSemester() {
      const month = new Date().getMonth() + 1
      if (month >= 3 && month <= 9) {
        return 2
      } else {
        return 1
      }
    },
    getCurYear: () => new Date().getFullYear()
  },
  computed: {
    term() {
      return `${this.year}0${this.semester}`
    },
    allYears() {
      const gap = this.getCurYear() - this.fromYear
      const years = []
      for (let i = 0; i <= gap; i++) {
        years.push(this.fromYear + i)
      }
      return years
    }
  },
  components: {
    ActivityTable,
    HonorTable,
    OfficeTable,
    PracticeTable,
    ReserveTable,
    SkillTable,
    VolunteerTable,
    SimplePagination
  }
}
</script>

<style lang="scss" scoped>
.school-detail-container {
  .score-container {
    margin-top: 20px;
  }
  .term-container {
    margin-top: 20px;
    .desc {
      margin: 0 10px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .fade-move {
    transition: all .5s;
  }

  .fade-leave-active {
    position: absolute;
  }
}
</style>
