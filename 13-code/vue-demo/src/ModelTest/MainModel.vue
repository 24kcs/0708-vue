<template>
  <div>
    <!--双向数据绑定演示-->
    <!-- <input type="text" v-model="msg">
    <p>{{msg}}</p> -->
    <!--自己实现双向数据绑定-->
    <!-- <input type="text" :value="msg" @input="msg=$event.target.value">
    <p>{{msg}}</p> -->
    <!--组件内实现双向数据绑定-->
    <!-- <Model2 v-model="msg"></Model2>
    <p>{{msg}}</p> -->

    <!-- <Model3 :value="msg" @input="msg=$event"></Model3>
    <p>{{msg}}</p> -->


  </div>
</template>
<script>
/**
 * 自己实现双向数据绑定: <input :value="msg" @input="msg=$event.target.value">
 * $event代表分发事件的传递的数据
 *
 * 父级组件中,使用另一个子组件,在组件上使用v-model="msg2",并显示{{msg2}}
 * 在子级组件中,:value='value' @input="$emit('input',$event.target.value)" props:['value']
 *
 *
 */
import Model1 from './Model1.vue'
import Model2 from './Model2.vue'
import Model3 from './Model3.vue'
export default {
  data() {
    return {
      msg: 'jack',
      msg2: 'tom',
      msg3: 'lucy'
    }
  },
  components: {
    Model1,
    Model2,
    Model3
  },
  methods: {
    // getMsg(event){
    //   // 获取触发该事件的事件源
    //   this.msg=event.target.value
    // }
  }
}
</script>
<style scoped>
</style>