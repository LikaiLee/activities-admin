<template>
  <div v-cloak class="inform-detail">
    <div class="inform-detail-container" v-if="data">
      <div class="title-wrapper">
        <div class="title">{{data.title}}</div>
        <p>来源：{{data.author}} 发布时间：{{data.date}}</p>
      </div>
      <hr>
      <div class="content" v-html="data.content" />
      <!-- <el-button class="btn-back" @click="back" icon="el-icon-fa-home" size="mini">返回登录页</el-button> -->
    </div>
  </div>
</template>

<script>
import { fetchInformById } from '@/api/inform'
export default {
  name: 'informDetail',
  data() {
    return {
      id: -1,
      data: null
    }
  },
  mounted() {
    this._fetchData()
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    _fetchData() {
      this.id = this.$route.params.id
      fetchInformById(this.id).then(res => {
        this.data = res.data
      }).catch(err => {
        console.error(err)
      })
    }
  },
  watch: {
    '$route'(route) {
      if (route.params.id) {
        this._fetchData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inform-detail {
  width: 100%;
  height: 100%;
  background: url('../../../assets/bg_school.jpg') center center;
  background-size: 100% 100%;
  &-container {
    position: relative;
    margin: 0 auto; // background: rgba(255, 255, 255, .7);
    background: #fafafa;
    width: 70%;
    min-height: 100%;
    .title-wrapper {
      text-align: center;
    }
    .title {
      font-size: 30px;
      font-weight: bold;
      line-height: 50px;
    }
    .content {
      min-height: 100%;
    }
  }
}
</style>
