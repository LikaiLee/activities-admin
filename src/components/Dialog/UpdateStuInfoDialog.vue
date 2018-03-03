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
          {{ user.className }}
        </el-form-item>
        <el-form-item label="修改班级">
          <el-cascader :options="classOpts" v-model="selectedclass" @change="handleClassChange" @active-item-change="fetchNewOpts" />
        </el-form-item>
        <el-form-item label="政治面貌" prop="political">
          <el-select v-model="user.political">
            <el-option value="群众"></el-option>
            <el-option value="共青团员"></el-option>
            <el-option value="党员"></el-option>
          </el-select>
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
          <el-select v-model="user.political">
            <el-option value="群众"></el-option>
            <el-option value="共青团员"></el-option>
            <el-option value="党员"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div v-else-if="type === 'major'">
        <el-form-item label="政治面貌" prop="political">
          <el-select v-model="user.political">
            <el-option value="群众"></el-option>
            <el-option value="共青团员"></el-option>
            <el-option value="党员"></el-option>
          </el-select>
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
import { fetchClassByMajor, fetchMajorByYear, fetchAllYear } from '@/api/class'
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
          userId: -1,
          classId: -1,
          dormitoryId: -1
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
      },
      classOpts: [],
      selectedclass: []
    }
  },
  mounted() {
    this._fetchAllYear()
  },
  methods: {
    fetchNewOpts(classArr) {
      const len = classArr.length
      if (len === 1) {
        const year = classArr[0]
        const majors = this.classOpts.find(_ => year === _.value).children
        fetchMajorByYear(year).then(res => {
          res.data.forEach(({ id, majorName }) => {
            if (majors.some(_ => id === _.value)) return
            majors.push({
              value: id,
              label: majorName,
              children: []
            })
          })
        })
      } else if (len === 2) {
        const [year, majorId] = classArr
        const cls = this.classOpts
          .find(_ => year === _.value).children
          .find(_ => majorId === _.value).children
        fetchClassByMajor(majorId).then((res) => {
          res.data.forEach(({ id, classNum }) => {
            if (cls.some(_ => id === _.value)) return
            cls.push({
              value: id,
              label: `${classNum}班`
            })
          })
        })
      }
    },
    handleClassChange(value) {
      const classId = this.selectedclass[this.selectedclass.length - 1]
      this.user.classId = classId
    },
    _fetchAllYear() {
      fetchAllYear().then(res => {
        res.data.forEach((year) => {
          if (this.classOpts.some(_ => year === _.value)) return
          this.classOpts.push({
            value: year,
            label: `${year}级`,
            children: []
          })
        })
      })
    },
    emitCancel() {
      this.$emit('cancel')
      this.dialogVisible = false
      this.resetClsOpts()
    },
    emitConfirm() {
      this.$emit('confirm', this.user)
      this.resetClsOpts()
    },
    resetClsOpts() {
      // this.classOpts = []
      this.selectedclass = []
    }
  },
  watch: {
    visible(visible) {
      this.dialogVisible = visible
      /* if (visible && !this.classOpts.length) {
        this._fetchAllYear()
      } */
      if (!visible) {
        this.resetClsOpts()
      }
    },
    dialogVisible(visible) {
      this.$emit('visibleChange', visible)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
