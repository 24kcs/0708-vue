// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 声明使用Vuex
Vue.use(Vuex)
// 实例化Vuex的对象,并暴露出去

// 首先是一个对象,包含了多个状态数据的对象
const state = {
  count: 0
}
// 首先是一个对象,包含了多个直接修改状态数据的方法
const mutations = {
  // 每个方法都可以叫一个mutation
  // 加的操作
  INCREMENT (state) {
    state.count++
  },
  // 减的操作
  DECREMENT (state) {
    state.count--
  }

}
// 首先是一个对象,包含了多个间接修改状态数据的方法
const actions = {
  // 加的操作
  increment (context) {
    context.commit('INCREMENT')
  },
  // 减的操作
  decrement ({commit}) {
    commit('DECREMENT')
  },
  // 奇数的才加1
  incrementIfOdd ({state,commit}) {
    if(state.count%2!==0){
      commit('INCREMENT')
    }
  },
  // 异步的加
  incrementAsync ({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000);
  }
}
// 首先是一个对象,包含了多个的状态数据的getter方法
const getters = {
  evenOrOdd(state){
    return state.count%2===0?'偶数':'奇数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})





// export default new Vuex.Store({
//   state:{}, // 负责放状态数据的
//   mutations:{}, // 负责直接修改状态数据的值
//   actions:{}, // 负责间接修改状态数据的值
//   getters:{} // 负责状态数据的计算属性的getter的方法的
// })