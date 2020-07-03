import http from '../utils/http'

const todo = {
  // 创建待办项
  create (params) {
    return http.post('/todos', params)
  },
  getById (id) {
    return http.get(`/todos/${id}`)
  },
  // 获取所有待办项的数据
  list () {
    return http.get('/todos')
  },
  // 更新 单个待办项 的状态
  update (id, params) {
    return http.patch(`/todos/${id}`, params)
  },
  // 批量更新 多个待办项 的状态
  updateMany (params) {
    return http.patch('/todos', params)
  }
}

export default todo
