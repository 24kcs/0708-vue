// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入state
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 声明使用
Vue.use(Vuex)
// 向外暴露对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})