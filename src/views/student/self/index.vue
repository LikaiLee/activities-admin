<template>
  <div class="account-container">
    <base-list-view :labels="labels" :data="userBaseInfo" :labelPosition="'right'">
      <span slot="itemName">邮箱：</span>
      <div slot="itemContent">
        <el-input @keyup.enter.native="handleEdit" v-if="isEdit" v-model="userBaseInfo.email" auto-complete="email" width="100px"></el-input>
        <div v-else>{{ userBaseInfo.email }}</div>
        <div style="color: #f30;">{{ emailError }}</div>
        <el-button @click="handleEdit" :type="isEdit ? 'success' : 'primary'" size="small" icon="el-icon-fa-edit" class="btn-edit">
          {{ isEdit ? '完成' : '修改' }}
        </el-button>
      </div>
    </base-list-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseListView from '@/components/BaseListView'
import { isEmail } from '@/utils/validator'
import { updateBaseInfo } from '@/api/user/baseInfo'
import { fetchStuBaseInfo } from '@/api/student'
export default {
  name: 'AccountManage',
  data() {
    return {
      isEdit: false,
      emailError: '',
      userBaseInfo: {},
      labels: [
        { key: 'realName', name: '姓名：' },
        { key: 'stuId', name: '学号：' },
        { key: 'sex', name: '性别：' },
        { key: 'entrance_time', name: '入学时间：' },
        { key: 'className', name: '班级：' },
        { key: 'dormitory', name: '寝室：' },
        { key: 'political', name: '政治面貌：' },
        { key: 'photo', name: '照片：' }
      ]
    }
  },
  mounted() {
    fetchStuBaseInfo().then(res => {
      this.userBaseInfo = Object.assign({}, this.user, res.data)
    }).catch(_ => _)
  },
  methods: {
    handleEdit() {
      if (this.isEdit) {
        const email = this.userBaseInfo.email
        if (!isEmail(email)) {
          this.emailError = '不是有效的邮箱格式!'
          return false
        } else {
          this.emailError = ''
          this.isEdit = false
          updateBaseInfo({ email }).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getUserInfo()
          }).catch(_ => _)
        }
      } else {
        this.isEdit = true
      }
    },
    ...mapActions([
      'getUserInfo'
    ])
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  components: {
    BaseListView
  }
}
</script>

<style lang="scss" scoped>
.account-container {
  width: 50%;
  .btn-edit {
    margin-top: 20px;
  }
  .el-row {
    margin: 12px 0;
  }
  .el-col {
    height: 30px;
    line-height: 30px;
  }
  .item-name {
    color: #606266;
    text-align: right;
  }
}
</style>
