// 包含多个直接修改状态数据的方法的对象
// 引入mutation-types
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types'
export default {
  // 修改地址信息
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  // 修改分类信息
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
  // 修改商铺信息
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  }
}