// 包含了多个直接修改状态数据的方法的对象
// 引入types
import { REQUERT, REQ_SUCCESS, REQ_ERROR } from './mutation-types.js'
export default {
  // 发送请求的时候
  [REQUERT] (state) {
    state.firstView = false
    state.loading = true
  },
  // 请求成功的时候
  [REQ_SUCCESS] (state, users) {
    state.loading = false
    state.users = users
  },
  // 请求失败的时候
  [REQ_ERROR] (state, errorMsg) {
    state.loading = false
    state.errorMsg = errorMsg
  }
}