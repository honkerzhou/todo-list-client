import http from '../utils/http'

const user = {
  // 获取所有待办项的数据
  create (params) {
    return http.post('/users', params)
  }
}

export default user
