<template>
  <ul class="todo-main">
    <Item v-for="(todo,index) in todos" :key="index" :todo="todo" :deleteTodo="deleteTodo" :index="index" :toggleTodo='toggleTodo' />
  </ul>
</template>
<script>
// 引入Item组件
import Item from './Item.vue'
export default {
  name: 'List',
  // 此时todos这个数据就直接传入到了List组件中了,而且使用todos的时候,不需要加props,直接this.todos就可以了
  props: ['todos','deleteTodo','toggleTodo'],
  components: {
    Item
  },
  // 界面显示完毕
  // mounted () {
  //     console.log(this)
  // }
  
}
</script>
<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
