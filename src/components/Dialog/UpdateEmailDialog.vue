<template>
  <el-dialog class="update-email" title="修改邮箱" :visible.sync="dialogVisible" width="35%">
    <el-form label-position="right" label-width="80px">
      <transition name="fade">
        <el-alert v-show="error" :closable="false" title="不是有效的邮箱格式" type="error" center show-icon style="margin-bottom: 20px;" />
      </transition>

      <el-form-item label="邮箱">
        <el-input v-model.trim="email" type="email"></el-input>
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
  name: 'UpdateEmailDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      error: false
    }
  },
  methods: {
    emitConfirm() {
      if (!isEmail(this.email)) {
        this.error = true
      } else {
        this.error = false
        this.$emit('confirm', this.email)
      }
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
