<template>
  <div class="wrapper">
    <LoginTip v-if="!token" />
    <el-form ref="form" :model="form" class="content" label-width="110px">
      <div v-for="(todo, index) in form.todoItems" :key="todo.id">
        <el-form-item
          :label="'待办内容' + (index + 1)"
          :prop="'todoItems.' + index + '.content'"
          :rules="[
            { required: true, message: '请输入待办内容', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="todo.content"
            type="textarea"
            maxlength="1000"
            :autosize="{ minRows: 2, maxRows: 4}"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="待办类型">
          <el-radio-group v-model="todo.type">
            <el-radio :label="1">日</el-radio>
            <el-radio :label="2">周</el-radio>
            <el-radio :label="3">月</el-radio>
            <el-radio :label="4">年</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item
          label="计划完成时间"
          :prop="'todoItems.' + index + '.expectTime'"
          :rules="{
            required: true, message: '请选择完成时间', trigger: 'change'
          }"
        >
          <el-time-picker v-model="todo.expectTime" format="HH:mm" placeholder="选择时间"></el-time-picker>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button @click="addMore">继续新增</el-button>
        <el-button @click="submit">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import LoginTip from '../components/LoginTip'
import { mapState } from 'vuex'
import api from '../api'
export default {
  name: 'TodoCreate',
  components: {
    LoginTip
  },
  data () {
    return {
      todosData: {},
      form: {
        todoItems: [
          {
            id: 0,
            content: '',
            type: 1,
            status: 1,
            expectTime: ''
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['token'])
  },
  created () {
    if (!this.token) {
      this.todosData = JSON.parse(localStorage.getItem('todosData'))
      this.form.todoItems[0].id =
        this.todosData.undone.length +
        this.todosData.done.length +
        this.todosData.forgone.length
    }
  },
  methods: {
    addMore () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { length } = this.form.todoItems
          const id = this.form.todoItems[length - 1].id + 1
          this.form.todoItems.push({
            id,
            content: '',
            type: 1,
            status: 1,
            expectTime: ''
          })
        }
      })
    },
    async submit () {
      const formValidated = await this.$refs.form.validate()
      if (formValidated) {
        if (this.token) {
          // 如果是登录用户
          await api.todo.create(this.form)
        } else {
          this.todosData.undone.push(...this.form.todoItems)
          localStorage.setItem('todosData', JSON.stringify(this.todosData))
        }
        this.$message.success('添加成功')
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
