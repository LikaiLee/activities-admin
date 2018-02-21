<template>
  <div class="inform-send">
    <el-form :model="informForm" :rules="informRules" ref="informForm">
      <el-form-item prop="title">
        <el-input placeholder="请输入标题" v-model="informForm.title">
          <template slot="prepend">标题</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div id="editor" class="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" @click.native.prevent="sendInform" type="primary" icon="el-icon-fa-send">发送</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import { postInform } from '@/api/inform'
export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入标题'))
      } else {
        callback()
      }
    }
    return {
      editor: null,
      informForm: {
        title: ''
      },
      informRules: {
        title: [{ required: true, trigger: 'blur', validator: validateTitle }]
      },
      loading: false
    }
  },
  mounted() {
    this._initEditor()
  },
  methods: {
    resetForm() {
      this.$refs.informForm.resetFields()
      this.editor.txt.clear()
    },
    sendInform() {
      this.$refs.informForm.validate(valid => {
        if (!valid) {
          return false
        }
        this.loading = true
        const data = {
          content: this.editor.txt.html(),
          title: this.informForm.title
        }
        postInform(data).then(res => {
          this.loading = false
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.resetForm()
        }).catch(() => {
          this.loading = false
        })
      })
    },
    _initEditor() {
      this.editor = new Editor('#editor')
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.create()
    }
  }
}
</script>

<style lang="scss" scoped>
.inform-send {
  padding: 5px 20px;
}
</style>

