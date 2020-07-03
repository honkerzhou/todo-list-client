import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Index = () => import('@/views/Index')
const TodoCreate = () => import('@/views/TodoCreate')
const EditTodo = () => import('@/views/TodoEdit')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/add',
      name: 'TodoCreate',
      component: TodoCreate
    },
    {
      path: '/edit/:id',
      name: 'editTodo',
      component: EditTodo
    }
  ]
})

export default router
