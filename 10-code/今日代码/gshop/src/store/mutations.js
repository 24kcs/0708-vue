// 包含了多个直接修改状态数据的方法的对象
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER, RECEIVE_TOKEN, RESET_USER, RESET_TOKEN } from './mutation-types'
export default {
  // 更新地址信息
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  // 更新分类信息
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  // 更新商铺信息
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  // 更新用户信息
  [RECEIVE_USER] (state, user) {
    state.user = user
  },
  // 重置用户信息
  [RECEIVE_TOKEN] (state, token) {
    state.token = token
  },
  // 更新token信息
  [RESET_USER] (state) {
    state.user = {}
  },
  // 重置token信息
  [RESET_TOKEN] (state) {
    state.token = ''
  }
}