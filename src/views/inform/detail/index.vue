<template>
  <div class="inform-detail">
    <div class="inform-detail-container" v-if="data">
      <h1>{{data.title}}</h1>
      <p>来源：{{data.author}} 发布时间：{{data.date}}</p>
      <hr>
      <div v-html="data.content" />
      <a href="/">
        <el-button icon="el-icon-fa-home" size="mini"></el-button>
      </a>
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
  created() {
    this._fetchData()
  },
  methods: {
    _fetchData() {
      this.id = this.$route.params.id
      fetchInformById(this.id).then(res => {
        this.data = res.data
      })
    }
  },
  watch: {
    $route() {
      this._fetchData()
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
