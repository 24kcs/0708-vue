/**
 * 
 * 包含了多个修改状态数据操作的对象
 * 
 */
// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入mutaiton-types.js
import {INCREMENT,DECREMENT} from './mutation-typs.js'
// 声明使用插件
Vue.use(Vuex)

// 包含了多个状态数据
const state = {
  count: 0
}
// 包含了多个可以直接修改状态数据的方法的对象
const mutations = {
  [INCREMENT] (state) {
    state.count++
  },
  [DECREMENT] (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据的方法的对象
const actions = {
  increment (content) {
    content.commit(INCREMENT)
  },
  decrement ({ commit }) {
    commit(DECREMENT)
  },
  incrementIfOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit(INCREMENT)
    }
  },
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit(INCREMENT)
    }, 1000);
  }
}
// 包含了多个状态数据的getter方法的对象
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

// 创建Vuex的实例
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})