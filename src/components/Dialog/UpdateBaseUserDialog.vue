<template>
  <el-dialog class="update-base-user-dialog" title="修改学生信息" :visible.sync="dialogVisible" width="35%">
    <el-form :model="user" ref="form" style="width: 80%;" size="small" label-width="100px">
      <transition name="fade">
        <el-alert v-show="error" :closable="false" :title="emailError" type="error" center show-icon style="margin-bottom: 20px;" />
      </transition>
      <el-form-item label="姓名：" prop="realName">
        <el-input v-model="user.realName"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-select v-model="user.sex" placeholder="请选择">
          <el-option value="男" />
          <el-option value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="emitCancel">取 消</el-button>
      <el-button type="primary" @click="emitConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isEmail } from '@/utils/validator'
export default {
  name: 'UpdateBaseUserDialog',
  props: {
    user: {
      type: Object,
      default() {
        return {
          id: -1,
          realName: '',
          sex: '',
          email: ''
        }
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      error: false,
      emailError: ''
    }
  },
  methods: {
    emitCancel() {
      this.dialogVisible = false
      this.$emit('cancel')
    },
    emitConfirm() {
      if (isEmail(this.user.email)) {
        this.error = false
        this.$emit('confirm', this.user)
      } else {
        this.error = true
        this.emailError = '不是有效的邮箱格式!'
      }
    }
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
    },
    dialogVisible(visible) {
      if (!visible) {
        this.error = false
      }
      this.$emit('visibleChange', visible)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
