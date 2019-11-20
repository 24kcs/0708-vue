// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state
import state from './state.js'
// 引入mutations
import mutations from './mutations.js'
// 引入actions
import actions from './actions.js'
// 引入getters
import getters from './getters.js'
// 声明使用Vuex
Vue.use(Vuex)
// 实例化Vuex对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})