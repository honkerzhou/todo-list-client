<template>
  <div class="wrapper">
    <LoginTip v-if="!token" />
    <el-form ref="form" :model="todo" :rules="validateRules" label-width="110px" class="content">
      <el-form-item label="待办内容" prop="content">
        <el-input
          type="textarea"
          v-model="todo.content"
          maxlength="1000"
          :autosize="{ minRows: 2, maxRows: 4}"
          show-word-limit
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="待办类型">
      <el-radio-group v-model="todo.type">
        <el-radio v-for="type in typeOptions" :key="type.label" :label="type.label" :disabled="todo.type !== type.label">
          {{ type.value }}
        </el-radio>
      </el-radio-group>
      </el-form-item>-->
      <el-form-item label="计划完成时间" prop="expectTime">
        <el-time-picker v-model="todo.expectTime" format="HH:mm" placeholder="选择时间"></el-time-picker>
      </el-form-item>
      <el-form-item>
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
  name: 'TodoEdit',
  components: {
    LoginTip
  },
  data () {
    return {
      todo: {},
      typeOptions: [
        {
          label: 1,
          value: '日'
        },
        {
          label: 2,
          value: '周'
        },
        {
          label: 3,
          value: '月'
        },
        {
          label: 4,
          value: '年'
        }
      ],
      validateRules: {
        content: [
          { required: true, message: '请输入待办内容', trigger: 'blur' }
        ],
        expectTime: [
          { required: true, message: '请选择完成日期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['token'])
  },
  created () {
    const todoId = this.$route.params.id
    if (this.token) {
      this.getData(todoId)
    } else {
      const todosData = JSON.parse(localStorage.getItem('todosData'))
      this.todo = todosData.undone.find(item => item.id === Number(todoId))
    }
  },
  methods: {
    async getData (id) {
      const res = await api.todo.getById(id)
      this.todo = res.data
    },
    async submit () {
      const formValidated = await this.$refs.form.validate()
      if (formValidated) {
        if (this.token) {
          // 如果是登录用户
          await api.todo.update(this.todo.id, {
            content: this.todo.content,
            expectTime: this.todo.expectTime
          })
        } else {
          const todosData = JSON.parse(localStorage.getItem('todosData'))
          const index = todosData.undone.findIndex(
            item => item.id === this.todo.id
          )
          todosData.undone.splice(index, 1, this.todo)
          localStorage.setItem('todosData', JSON.stringify(todosData))
        }
        this.$message.success('修改成功')
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
