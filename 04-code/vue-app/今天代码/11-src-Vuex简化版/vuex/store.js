// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)

// 包含了多个状态数据
const state = {
  count: 0
}
// 包含了多个直接修改状态数据方法的对象
const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
}
// 包含了多个间接修改状态数据方法的对象
const actions = {
  increment (context) {
    context.commit('INCREMENT')
  },
  decrement ({ commit }) {
    commit('DECREMENT')
  },
  incrementIfOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit('INCREMENT')
    }
  },
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },
}
// 包含多个状态数据的getter操作方法的对象
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

// 实例化对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})