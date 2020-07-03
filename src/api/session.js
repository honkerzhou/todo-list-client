import http from '../utils/http'

const session = {
  // 获取所有待办项的数据
  create (params) {
    return http.post('/sessions', params)
  },
  // 更新 单个待办项 的状态
  updateTodo (id, params) {
    http.patch(`/todos/${id}`, params)
  },
  // 批量更新 多个待办项 的状态
  updateTodos (params) {
    return http.patch('/todos', params)
  }
}

export default session
