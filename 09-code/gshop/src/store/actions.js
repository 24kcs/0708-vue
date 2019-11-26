// 包含了多个间接修改状态数据的方法的对象
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from './mutation-types'
// 引入api
import { reqAddress, reqCategorys, reqShopList } from '../api'
export default {
  // 获取地址信息
  async getAddress ({ state, commit }) {
    const { longitude, latitude } = state
    const result = await reqAddress({ longitude, latitude })
    // 判断请求是否成功
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }

  },
  // 获取分类信息
  async getCategorys ({ commit },cb) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      typeof cb==='function'&&cb()
      // if(typeof cb==='function'){
      //   cb()
      // }

    }
  },
  // 获取商铺列表信息
  async getShops ({ state, commit }) {
    const { longitude, latitude } = state
    const result = await reqShopList({ longitude, latitude })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
}