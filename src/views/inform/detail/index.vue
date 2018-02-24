<template>
  <div class="inform-detail">
    <div class="inform-detail-container" v-if="data">
      <h1>{{data.title}}</h1>
      <p>来源：{{data.author}} 发布时间：{{data.date}}</p>
      <hr>
      <div v-html="data.content" />
      <el-button @click="back" icon="el-icon-fa-home" size="mini"></el-button>
    </div>
    <div v-else>
      无数据
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
  background: url('../../../assets/login_bg.jpg');
  background-size: cover;
  overflow: hidden;
  &-container {
    position: relative;
    margin: 0 auto;
    text-align: center;
    background: rgba(255, 255, 255, .7);
    width: 70%;
    height: 100%;
  }
}
</style>
