<template>
  <div class="wrapper">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      label-position="left"
      class="form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
          clearable
          @keyup.enter.native="login"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        没有账号?
        <el-link @click="toRegister">立即注册</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '../api'
export default {
  name: 'Login',
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

    async login () {
      const formValidated = await this.$refs.form.validate()
      if (formValidated) {
        const loginRes = await api.session.create(this.form)
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

        // 登录成功后根据当前URL中的查询参数redirect跳转回上一个页面
        this.$router.replace(this.$route.query.redirect || '/')
      }
    },
    toRegister () {
      this.$router.replace('/register')
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
