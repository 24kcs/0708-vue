<template>
  <div>
    <h2>点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementIfOdd">奇数+</button>
    <button @click="incrementAsync">异步+</button>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  computed: {
    // count() {
    //   return this.$store.state.count
    // },
    // evenOrOdd() {
    //   return this.$store.getters.evenOrOdd
    // }
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])

  },
  methods: {
    // increment() {
    //   this.$store.commit('INCREMENT')
    // },
    // decrement() {
    //   this.$store.commit('DECREMENT')
    // },
    ...mapMutations({
      increment:'INCREMENT',
      decrement:'DECREMENT'
    }),
    ...mapActions(['incrementIfOdd','incrementAsync'])
    // incrementIfOdd() {
    //   this.$store.dispatch('incrementIfOdd')
    // },
    // incrementAsync() {
    //   this.$store.dispatch('incrementAsync')
    // }
  }
}
</script>
<style scoped>
</style>