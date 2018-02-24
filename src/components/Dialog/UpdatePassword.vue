<template>
  <el-dialog class="update-password" title="修改密码" :visible.sync="dialogVisible" width="35%">
    <el-form ref="form" :rules="rules" :model="formData" label-position="right" label-width="80px">
      <transition name="fade">
        <el-alert v-show="error" :closable="false" title="两次输入的密码不一致" type="error" center show-icon style="margin-bottom: 20px;" />
      </transition>

      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model.trim="formData.checkPassword" type="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="emitCancel">取 消</el-button>
      <el-button type="primary" @click="emitConfirm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'UpdatePassword',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      formData: {
        checkPassword: '',
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '请填写原密码', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' }
        ]
      },
      error: false
    }
  },
  methods: {
    emitConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid || this.formData.checkPassword !== this.formData.password) {
          this.error = true
          return false
        }
        this.$emit('confirm', this.formData.password)
      })
    },
    emitCancel() {
      this.$emit('cancel')
    }
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
    },
    dialogVisible(visible) {
      if (!visible) {
        this.error = false
        this.$refs['form'].resetFields()
      }
      this.$emit('visibleChange', visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
