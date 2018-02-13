<template>
  <div class="login">
    <div class="login-cont">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-fa-arrow-circle-right"></i>
          欢迎登录
        </div>
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" autoComplete="on" placeholder="用户名" prefix-icon="el-icon-fa-user"></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginForm.password" @keyup.enter.native="handleLogin" autoComplete="on" placeholder="密码" type="password" prefix-icon="el-icon-fa-eye"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" @click.native.prevent="handleLogin" class="btn-submit" type="primary">登录
              <i class="el-icon-fa-chevron-circle-right el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能小于1位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'yxm',
        password: '1'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        this.loading = true
        this.login(this.loginForm).then((res) => {
          this.loading = false
          this.$router.push({ path: '/' })
        }).catch(() => {
          this.loading = false
        })
      })
    },
    ...mapActions([
      'login'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.login {
  @include relative;
  background: url('../../assets/login_bg.jpg') center center;
  background-size: cover;

  &-cont {
    width: 300px;
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-60%);

    .btn-submit {
      width: 100%;
    }
  }
}
</style>
