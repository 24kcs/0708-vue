<template>
  <div>
    <ul>
      <li v-for="(todo,index) in todos" :key="index">
        <slot :todo="todo">{{todo.title}}</slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      todos: [
        { id: 1, title: '哈弗', isShow: false },
        { id: 2, title: '红旗', isShow: true },
        { id: 3, title: '吉利', isShow: false }
      ]
    }
  }
}
</script>
<style scoped>
</style>