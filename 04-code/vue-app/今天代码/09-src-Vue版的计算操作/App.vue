<template>
  <div>
    <h2>点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementIdOdd">奇数+</button>
    <button @click="incrementAsync">异步+</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    incrementIdOdd() {
      if (this.count % 2 !== 0) {
        this.count++
      }
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }
  },
  computed: {
    evenOrOdd(){
      return this.count%2===0?'偶数':'奇数'
    }
  }
}
</script>
<style scoped>
</style>