<template>
  <div>
    <h2>点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import {INCREMENT,DECREMENT} from './vuex/mutation-types.js'
// 点击按钮修改状态数据
export default {
  // 状态数据
  computed: {
    // count() {
    //   return this.$store.state.count
    // },
    // evenOrOdd(){
    //   return this.$store.getters.evenOrOdd
    // }
   
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  },

  methods: {
    // 加的操作
    // increment() {
    //   this.$store.commit('INCREMENT')
    // },
    // // 减的操作
    // decrement() {
    //   this.$store.commit('DECREMENT')
    // },
    ...mapMutations({
      increment:INCREMENT,
      decrement:DECREMENT
    }),
    ...mapActions(['incrementIfOdd','incrementAsync'])
    // 奇数的才加1
    // incrementIfOdd() {
    //   this.$store.dispatch('incrementIfOdd')
    // },
    // // 异步的加
    // incrementAsync() {
    //   this.$store.dispatch('incrementAsync')
    // }
  }
}

// const arr=[1,2,3]
// const arr2=[...arr]


// function f1(...args){

// }

// f1(1,2,3,4,5)



</script>
<style scoped>
</style>