<template>
  <div>
    <h2>原生DOM事件</h2>
    <!-- <button @click="show1">原生DOM事件</button>
    <Event1 @click.native="show2" /> -->

    <h2>自定义事件</h2>
    <!-- <button @sddsd="">按钮啊</button> -->

    <!-- <Event2 @click="show3" @xxx="show4" /> -->

    <!-- <Event2 @click="show3" @xxx="show4" /> -->
    <Event1 />
    <Event2 />
  </div>
</template>
<script>
/**
 * 原生DOM事件
 * button @click=""
 * <Component @click.native="show" />
 * 自定义DOM事件
 * button @xxx="show"
 * <Component @click="show">
 *
 *
 */
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'
export default {
  components: {
    Event1,
    Event2
  },
  methods: {
    show1() {
      console.log('我是原生DOM的原生DOM事件')
    },
    show2() {
      console.log('组件中的事件')
    },
    show3() {
      console.log('自定义事件1')
    },
    show4() {
      console.log('自定义事件2')
    }
  }
}
</script>
<style scoped>
</style>