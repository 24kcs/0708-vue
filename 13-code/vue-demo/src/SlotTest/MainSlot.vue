<template>
  <div>
    <!--普通插槽-->
    <!-- <Slot1>
      这是一个普通的插槽
      <span>这是一个span标签</span>
    </Slot1>-->

    <!--具名插槽-->
    <!-- <Slot2>
      <span slot="top">这是上面的插槽</span>
      <p>这是华哥来了,在中间</p>
      <span slot="bottom">这是下面的插槽</span>
    </Slot2>-->

    <!--作用域插槽-->

    <Slot3>
      <!-- <template slot-scope="slotProps"> -->
      <template v-slot="slotProps">
        <!-- <p v-if="slotProps.todo.isShow">{{slotProps.todo.title}}✔</p> -->
        <p v-if="slotProps.todo.isShow" style="color:red">{{slotProps.todo.title}}</p>
      </template>
    </Slot3>

    <!-- <Slot3>
      <template slot-scope="slotProps">
      <template v-slot:default="slotProps">
        <p v-if="slotProps.todo.isShow">{{slotProps.todo.title}}✔</p>
        <p v-if="slotProps.todo.isShow" style="color:red">{{slotProps.todo.title}}✔</p>
      </template>
    </Slot3>-->
  </div>
</template>
<script>
/**
 * 1.使用普通插槽,没有名字的插槽,直接传值即可：父级组件向子级组件中传入数据
 * 2.具名插槽传值,只能使用名字,其他的内容是不会被传递的(标签名字,标签位置这些都没有关系,只要有slot="插槽名字"即可传值)
 * 3.作用域插槽,子组件向父级组件传递数据,父级组件根据数据渲染标签结构传递给子组件
 *
 */
// 引入Slot1组件---显示普通插槽传值方式
import Slot1 from './Slot1.vue'
// 引入Slot2组件---显示具名插槽传值方式
import Slot2 from './Slot2.vue'
// 作用域插槽
import Slot3 from './Slot3.vue'
export default {
  components: {
    Slot1,
    Slot2,
    Slot3
  }
}
</script>
<style >
</style>