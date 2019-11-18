<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" />
      <Footer />
    </div>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header.vue'
// 引入List组件
import List from './components/List.vue'
// 引入Footer组件
import Footer from './components/Footer.vue'
// 暴露出去的是当前组件对象(整个组件就是一个对象,组件对象内部使用了this,是该组件的实例对象)
// function Person(){}
// var per = new Person()
export default {
  // 数据操作的功能
  methods: {
    // 添加数据
    addTodo(todo){
      // 插入到前面显示
      this.todos.unshift(todo)
    }
  },
  // 设置当前组件的名字
  name: 'App',
  // 存储数据的-----注意:脚手架中的data是一个方法,不是之前对象
  data() {
    return {
      todos: [
        { id: 1, title: '华哥', isCompleted: false },
        { id: 2, title: '健哥', isCompleted: true },
        { id: 3, title: '强哥', isCompleted: false }
      ]
    }
  },
  // 注册组件
  components: {
    Header,
    List,
    Footer
  }
}
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
