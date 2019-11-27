// 包含了多个直接修改状态数据的方法的对象
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types'
export default {
  // 更新地址信息
  [RECEIVE_ADDRESS] (state,address) {
    state.address = address
  },
  // 更新分类信息
  [RECEIVE_CATEGORYS] (state,categorys) {
    state.categorys = categorys
  },
  // 更新商铺信息
  [RECEIVE_SHOPS] (state,shops) {
    state.shops = shops
  },
}