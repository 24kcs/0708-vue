<template>
  <div>
    <h2>点击次数:{{$store.state.count}},奇数or偶数:{{$store.getters.evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>

// 点击按钮修改状态数据
export default {
  // 状态数据
  // computed: {
  //   evenOrOdd() {
  //     return this.count % 2 === 0 ? '偶数' : '奇数'
  //   }
  // },

  methods: {
    // 加的操作
    increment() {
      this.$store.commit('INCREMENT')
    },
    // 减的操作
    decrement() {
      this.$store.commit('DECREMENT')
    },
    // 奇数的才加1
    incrementIfOdd() {
      this.$store.dispatch('incrementIfOdd')
    },
    // 异步的加
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style scoped>
</style>