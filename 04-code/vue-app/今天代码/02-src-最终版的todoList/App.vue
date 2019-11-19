<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo" />
      <List :todos="todos" />
      <Footer :todos="todos" :checkAllTtodos="checkAllTtodos">
        <label slot="left">
          <input type="checkbox" v-model="checkedAll" />
        </label>
        <span slot="center">
          <span>已完成{{count}}</span>
          / 全部{{todos.length}}
        </span>
        <button slot="right" class="btn btn-danger" v-show="count>0">清除已完成任务</button>
      </Footer>
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
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
 computed: {
    count() {
      return this.todos.reduce(
        (pre, todo) => pre + (todo.isCompleted ? 1 : 0),
        0
      )
    },
    checkedAll: {
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAllTtodos(val)
      }
    }
  },



  // 界面加载完毕
  mounted() {
    console.log(this)
    // 消息的订阅
    ;(this.token = PubSub.subscribe('deleteTodo', (msg, data) => {
      this.deleteTodo(data)
    })),
      // 界面加载后,使用事件总线的方式进行事件的绑定
      this.$bus.$on('toggleTodo', todo => {
        this.toggleTodo(todo)
      })
  },
  // 组件被销毁之前
  beforeDestroy() {
    // 取消消息订阅
    PubSub.unsubscribe(this.token)
    // 解绑事件
    this.$bus.$off('toggleTodo')
  },
  // 数据操作的功能
  methods: {
    // 添加数据
    addTodo(todo) {
      // 插入到前面显示
      this.todos.unshift(todo)
    },
    // 删除数据
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 切换选中
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 设置todos中的每个todo的isCompleted的结果
    checkAllTtodos(flag) {
      this.todos.forEach(todo => {
        todo.isCompleted = flag
      })
    }
  },
  // 设置当前组件的名字
  name: 'App',
  // 存储数据的-----注意:脚手架中的data是一个方法,不是之前对象
  data() {
    return {
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
    todos: {
      deep: true, // 深度监视
      handler: storage.setTodos
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
