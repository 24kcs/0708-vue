// 包含了多个状态数据,直接修改状态数据的方法的对象,间接修改状态数据的方法的对象,状态数据的计算属性的get操作的方法
import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-types'
import { reqGoods, reqRatings, reqInfo } from '../../api'
import Vue from 'vue'
const state = {

  // 点餐的信息
  goods: [],
  // 评价的信息
  ratings: [],
  // 商家信息
  info: {},
  // 用来保存多个食物的
  cartFood: []
}
const mutations = {
  // 更新点餐信息
  [RECEIVE_GOODS] (state, { goods }) {
    state.goods = goods
  },
  // 更新评价信息
  [RECEIVE_RATINGS] (state, { ratings }) {
    state.ratings = ratings
  },
  // 更新商家信息
  [RECEIVE_INFO] (state, { info }) {
    state.info = info
  },
  // 添加食物
  [ADD_FOOD_COUNT] (state, { food }) {
    if (!food.count) {
      // 不存在count,则默认值为1,添加1个,并且把食物添加到数组中
      // food.count = 1
      // state.cartFood.push(food)
      Vue.set(food, 'count', 1)
      state.cartFood.push(food)
    } else {
      // 如果存在count,直接修改count数量即可
      food.count++
    }
  },

  // 减少食物
  [REDUCE_FOOD_COUNT] (state, { food }) {
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        // 判断,如果食物为0的时候,食物要从数组中移除
        state.cartFood.splice(state.cartFood.indexOf(food), 1)
      }
    }
  },
}
const actions = {
  // 获取点餐信息
  async getGoods ({ commit }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
  },
  // 获取评价信息
  async getRatings ({ commit }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
    }
  },
  // 获取商家信息
  async getInfo ({ commit }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 添加或者减少食物

  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      // 增加
      commit(ADD_FOOD_COUNT, { food })
    } else {
      // 删除
      commit(REDUCE_FOOD_COUNT, { food })
    }
  },
  xxx () {
    console.log('shop中的xxx')
  }
}
const getters = {
  // 总数量
  totalCount (state) {
    return state.cartFood.reduce((pre, food) => pre + food.count, 0)
  },
  // 总价格
  totalPrice () {
    return state.cartFood.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}