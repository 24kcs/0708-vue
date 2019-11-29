import {  RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS } from '../mutation-types'
// 引入api
import {  reqGoods, reqRatings, reqInfo } from '../../api'
const state={
  
  // 点餐信息
  goods: [],
  // 评价信息
  ratings: [],
  // 商家信息
  info: {}
}
const mutations={
  
  // 更新点餐信息
  [RECEIVE_GOODS] (state, { goods }) {
    state.goods = goods
  },
  // 更新评价信息
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },

  // 更新商家信息
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
}
const actions={
  

  // 获取点餐
  async getGoods ({ commit }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
  },
  // 获取评价
  async getRatings ({ commit }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
    }
  },
  // 获取商家
  async getInfo ({ commit }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  }
}
const getters={}

export default {
  state,
  mutations,
  actions,
  getters  
}