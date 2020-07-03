<template>
  <div class="wrapper">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" label-position="left">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
          clearable
          @keyup.enter.native="register"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register">注册</el-button>
        <p>
          已有账号，
          <el-link @click="toLogin">返回登录</el-link>
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '../api'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 20, message: '用户名不能超过20个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['changeToken']),

    async register () {
      const formValidated = await this.$refs.form.validate()
      if (formValidated) {
        const loginRes = await api.user.create(this.form)
        const token = loginRes.data.token
        localStorage.setItem('token', token)
        this.changeToken(token)

        // 如果有存储在本地的待办项，将其保存到数据库
        const localTodos = JSON.parse(localStorage.getItem('todosData'))
        if (localTodos) {
          const todoItems = [
            ...localTodos.undone,
            ...localTodos.done,
            ...localTodos.forgone
          ]
          if (todoItems.length) {
            await api.todo.create({ todoItems })
          }
          localStorage.removeItem('todosData')
        }

        this.$router.replace('/')
      }
    },
    toLogin () {
      this.$router.replace({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
  }
}
</style>
