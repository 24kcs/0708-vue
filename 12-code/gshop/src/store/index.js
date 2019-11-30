// 引入Vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 引入4个对象
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 引入模块
import msite from './modules/msite'
import user from './modules/user'  // user.js 中 state={ age:10 user:{name:'小明'}}
import shop from './modules/shop'
// 声明使用
Vue.use(Vuex)
// 暴露对象
export default new Vuex.Store({
  state, // 总state
  mutations, // 总mutations
  actions, // 总actions
  getters, // 总getters
  modules: {
    msite,
    user,
    shop
  }
})
// msite组件--->user的数据--->computed(){...mapState(['user'])}
/**
 * 
 * computed(){
 *  ...mapState({
 *    user:state=>state.user.user
 *    categorys:state=>state.msite.ctegorys
 *   })
 * }
 * 
 * 
 * obj.name
 * 
 */
// 第一个user---模块名字
// 第二个user--state中的数据的名字(键)
// this.$store.state.user.user.name
// this.$store.state.user.age

// 抽取模块:可以按照功能名字来命名为模块的名字,可以按照组件的使用,来进行命名
// 多模块---内部可以放多个模块
// modules:{
//   a:moduleA,  // name='小明'
//   b:moduleB
// }
// modules----多模块
// a---->模块的名字
// moduleA--->这个模块是moduleA模块



// export default store