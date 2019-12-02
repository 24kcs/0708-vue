<template>
  <div id="app">
    <!--插槽内容-->
    <!-- <MainSlot /> -->
    <!--混合内容-->
    <!-- <MainMixin /> -->
    <!--组件内容-->
    <!-- <MainComponent /> -->
    <!--事件内容-->
    <!-- <MainEvent/> -->
    <!--双向数据绑定-->
    <!-- <MainModel /> -->
    <!--响应式数据操作-->
    <MainReactive />
  </div>
</template>

<script>
// 演示插槽
import MainSlot from './SlotTest/MainSlot.vue'
// 演示mixin
import MainMixin from './MixinTest/MainMixin.vue'
// 动态组件
import MainComponent from './ComponentTest/MainComponent.vue'
// 原生事件,Vue自定义事件,事件总线
import MainEvent from './EventTest/MainEvent.vue'
// 双向数据绑定
import MainModel from './ModelTest/MainModel.vue'
// 响应式数据操作
import MainReactive from './ReactiveTest/MainReactive.vue'
export default {
  name: 'app',
  components: {
    MainSlot,
    MainMixin,
    MainComponent,
    MainEvent,
    MainModel,
    MainReactive
  }
}
</script>

<style>

</style>
