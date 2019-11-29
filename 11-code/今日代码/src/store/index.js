// 引入Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入4个对象
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 引入模块文件
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'
// 声明使用
Vue.use(Vuex)
// 暴露对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    msite,
    shop,
    user
  }
})
// 外层的对象称为总的state.....等等
// 里面的modules模块,msite模块...等等
// 如何访问,store.state.msite.a