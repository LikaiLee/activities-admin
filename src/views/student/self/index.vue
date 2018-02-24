<template>
  <div class="account-container">
    <el-form label-position="right" label-width="80px" :model="user">
      <el-form-item label="姓名：">
        <!-- <el-input v-model="user.realName"></el-input> -->
        {{user.realName}}
      </el-form-item>
      <el-form-item label="性别：">
        {{user.sex}}
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input @keyup.enter.native="handleEdit" v-if="isEdit" v-model="user.email" auto-complete="email" width="100px"></el-input>
        <div v-else>{{ user.email }}</div>
        <div style="color: #f30;">{{ emailError }}</div>
        <el-button @click="handleEdit" :type="isEdit ? 'success' : 'primary'" size="small" icon="el-icon-fa-edit" class="btn-edit">
          {{ isEdit ? '完成' : '修改' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { isEmail } from '@/utils/validator'
import { updateBaseInfo } from '@/api/user/baseInfo'
export default {
  name: 'AccountManage',
  data() {
    return {
      isEdit: false,
      emailError: ''
    }
  },
  methods: {
    handleEdit() {
      if (this.isEdit) {
        const email = this.user.email
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
  }
}
</script>

<style lang="scss" scoped>
.account-container {
  width: 50%;
  .btn-edit {
    margin-top: 20px;
  }
}
</style>

