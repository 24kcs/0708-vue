<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <Footer :todos="todos" :checkAll="checkAll" />
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
// 引入utils
import storage from './utils/utils.js'
export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer
  },
  // 状态数据
  data() {
    return {
      // todos: [
      //   { id: 1, title: '宝马', isShow: false },
      //   { id: 2, title: '奔驰', isShow: true },
      //   { id: 3, title: '奥迪', isShow: false }
      // ]
      todos: storage.getTodos()
    }
  },
  watch: {
    //  todos:{
    //    deep:true, //深度监视
    //    handler:function(){
    //      localStorage.setItem('todos_key',JSON.stringify(this.todos))
    //    }
    //  }
    //  todos:{
    //    deep:true, //深度监视
    //    handler(val){
    //      localStorage.setItem('todos_key',JSON.stringify(val))
    //    }
    //  }
    todos:{
       deep:true, //深度监视
       handler:localStorage.setItem
     }
  },
  methods: {
    // 添加操作
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除操作
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 选中切换操作
    toggleTodo(todo) {
      todo.isShow = !todo.isShow
    },
    // 选中所有
    checkAll(flag){
      this.todos.forEach(todo=>todo.isShow=flag)
    }
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
