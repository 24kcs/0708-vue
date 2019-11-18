<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <Footer :todos="todos" :checkAllTtodos="checkAllTtodos" />
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
// 引入utils
import storage from './utils/utils.js'
export default {
  // 数据操作的功能
  methods: {
    // 添加数据
    addTodo(todo){
      // 插入到前面显示
      this.todos.unshift(todo)
    },
    // 删除数据
    deleteTodo(index){
      this.todos.splice(index,1)
    },
    // 切换选中
    toggleTodo(todo){
      todo.isCompleted=!todo.isCompleted
    },
    // 设置todos中的每个todo的isCompleted的结果
    checkAllTtodos(flag){
      this.todos.forEach(todo=>{
        todo.isCompleted=flag
      })
    }
  },
  // 设置当前组件的名字
  name: 'App',
  // 存储数据的-----注意:脚手架中的data是一个方法,不是之前对象
  data() {
    return {
      // todos: [
      //   { id: 1, title: '华哥', isCompleted: false },
      //   { id: 2, title: '健哥', isCompleted: true },
      //   { id: 3, title: '强哥', isCompleted: false }
      // ]
      //  todos: JSON.parse(localStorage.getItem('todos_key')||'[]')
       todos: storage.getTodos()
    }
  },
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  watch: {
    // 总结:watch什么使用?怎么用?
    // 如果数据发生了相关的变化,需要做相关的一些操作,此时使用watch
    // 如果仅仅是监视一个数据,做很简单的操作,watch中直接写方法即可
    // 如果是监视一个数据,做稍微复杂的操作,watch中写对象,进行配置,在handler方法中写操作的代码
    // 如果一个属性的值发生变化,相关联的属性的值也会自动的变化,此时使用计算属性
    todos:{
      deep:true,  // 深度监视
      // handler:function(val){
      //   // 做相关的操作
      //   // 缓存数据
      //   //localStorage.setItem('todos_key',JSON.stringify(this.todos))
      //   storage.setTodos(val)
      // }
       handler:storage.setTodos
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
