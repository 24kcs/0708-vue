// 包含了多个状态数据,直接修改状态数据的方法的对象,间接修改状态数据的方法的对象,状态数据的计算属性的get操作的方法
import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-types'
import { reqGoods, reqRatings, reqInfo } from '../../api'
// 引入Vue
import Vue from 'vue'
const state = {

  // 点餐的信息
  goods: [],
  // 评价的信息
  ratings: [],
  // 商家信息
  info: {},
  // 用来存储购物车中的食物的
  cartFoods:[]
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
  // 增加食物
  [ADD_FOOD_COUNT] (state, { food }) {
    // 此时vuex中的数据--food对象是响应式数据:
    // 响应式数据:当数据变化,界面会重新渲染,
    // 判断是否有count属性
    if (!food.count) {
      // 第一次点击加的时候,添加了这个count属性,并且默认添加了1个属性
      // food.count = 1
      Vue.set(food,'count',1)
      // 立刻把食物对象添加到数组中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  // 减少食物
  [REDUCE_FOOD_COUNT] (state, { food }) {
    if (food.count > 0) {
      food.count--
      if(food.count===0){
        // 从食物的数组中删除当前添加的食物
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
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

  // 增加或者减少食物的数量
  updateFoodCount ({ commit }, { isAdd, food }) {
    // 判断,是增加还是修改
    if (isAdd) {
      // 增加操作
      commit(ADD_FOOD_COUNT, { food })
    } else {
      // 修改操作
      commit(REDUCE_FOOD_COUNT, { food })
    }
  },
  // xxx(){
  //   console.log('子模块中的action方法')
  // }
}
const getters = {
  // 总数量
  totalCount(state){
    return state.cartFoods.reduce((pre,food)=>pre+food.count ,0)
  },
  // 总价格
  totalPrice(state){
    return state.cartFoods.reduce((pre,food)=>pre+food.count*food.price ,0)
  },
   /*
  总商家评论数
   */
  totalRatingsCount (state) {
    return state.ratings.length
  },

  /*
  总商家推荐评论数
   */
  positiveRatingsCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType===0 ? 1 : 0), 0)
  }

}
export default {
  state,
  mutations,
  actions,
  getters
}