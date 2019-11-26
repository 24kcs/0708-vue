// 包含多个间接修改状态数据的方法的对象
// 引入mutation-types
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types'
// 引入接口发送请求
import { reqAddress, reqCategorys, reqShopList } from '../api'
export default {
  // 根据经纬度获取地址信息
  async getAddress ({ state, commit }) {
    const { longitude, latitude } = state
    // 发送异步请求
    const result = await reqAddress({ longitude, latitude })
    if (result.code === 0) {
      // 请求成功获取地址信息
      const address = result.data
      // 提交mutation并更新地址信息
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 获取食品分类信息
  async getCategorys ({ commit },cb) {
    const result = await reqCategorys()
    if (result.code === 0) {
      // 请求成功获取分类信息
      const categorys = result.data
      // 提交mutation并更新分类信息
      commit(RECEIVE_CATEGORYS, categorys)
      typeof cb==='function'&&cb()
    }
  },
  // 获取商铺信息
  async getShops ({ state, commit }) {
    const { longitude, latitude } = state
    const result = await reqShopList({ longitude, latitude })
    if (result.code === 0) {
      const shops = result.data
      // 提交mutation并更新分类信息
      commit(RECEIVE_SHOPS, shops)
     
    }
  },
}