<template>
  <div class="inform-dialog">
    <el-dialog title="修改通知" :visible.sync="dialogVisible" width="60%">
      <el-form class="small-space" :model="data" label-position="left" label-width="70px">
        <el-form-item label="标题">
          <el-input v-model="data.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <div id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emitCancel">取 消</el-button>
        <el-button type="primary" @click="emitConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Editor from 'wangeditor'
export default {
  name: 'InformDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {
          title: '',
          content: ''
        }
      }
    }
  },
  data() {
    return {
      editor: null,
      dialogVisible: this.visible
    }
  },
  mounted() {
  },
  methods: {
    emitConfirm() {
      const { informId, title } = this.data
      const content = this.editor.txt.html()
      this.$emit('confirm', { informId, title, content })
    },
    emitCancel() {
      this.$emit('cancel')
    },
    _fillEditor() {
      if (!this.editor) {
        this.$nextTick(() => {
          this._initEditor()
          this.editor.txt.html(this.data.content)
        })
      } else {
        this.editor.txt.html(this.data.content)
      }
    },
    _initEditor() {
      this.editor = new Editor('#editor')
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.create()
    }
  },
  watch: {
    visible(see) {
      this.dialogVisible = see
      if (!this.editor && see) {
        this.$nextTick(() => {
          this._initEditor()
          this.editor.txt.html(this.data.content)
        })
      } else {
        this.editor.txt.html(this.data.content)
      }
    },
    dialogVisible(visible) {
      this.$emit('visibleChange', visible)
    }
  }
}
</script>
