<template>
  <el-dialog class="update-stu-info-dialog" title="修改学生信息" :visible.sync="dialogVisible" width="35%">
    <el-form :model="user" :rules="rules" ref="form" style="width: 80%;" size="small" label-width="100px">
      <el-form-item label="学号" prop="stuId">
        {{ user.stuId }}
      </el-form-item>
      <div v-if="type === 'school'">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="user.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="user.sex" placeholder="请选择">
            <el-option value="男" />
            <el-option value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间" prop="entrance_time">
          <el-input v-model="user.entrance_time"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input v-model="user.className"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-input v-model="user.political"></el-input>
        </el-form-item>
        <el-form-item label="寝室" prop="dormitory">
          <el-input v-model="user.dormitory"></el-input>
        </el-form-item>
        <el-form-item label="照片" prop="photo">
          <el-input v-model="user.photo"></el-input>
        </el-form-item>
      </div>
      <div v-else-if="type === 'class'">
        <el-form-item label="政治面貌" prop="political">
          <el-input v-model="user.political"></el-input>
        </el-form-item>
      </div>
      <div v-else-if="type === 'major'">
        <el-form-item label="政治面貌" prop="political">
          <el-input v-model="user.political"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="emitCancel">取 消</el-button>
      <el-button type="primary" @click="emitConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateStuInfoDialog',
  props: {
    type: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default() {
        return {
          className: '',
          dormitory: '',
          entrance_time: '',
          photo: '',
          political: '',
          realName: '',
          sex: '',
          stuId: '',
          userId: -1
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
      rules: {
        stuId: [
          { required: true }
        ]
      }
    }
  },
  methods: {
    emitCancel() {
      this.$emit('cancel')
      this.dialogVisible = false
    },
    emitConfirm() {
      this.$emit('confirm', this.user)
    }
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
    },
    dialogVisible(visible) {
      this.$emit('visibleChange', visible)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
