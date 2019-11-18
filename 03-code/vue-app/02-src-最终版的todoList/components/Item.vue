<template>
  <li
    @mouseenter="mouseenterHandle(true)"
    @mouseleave="mouseenterHandle(false)"
    :style="{color:fontColor,backgroundColor:bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isCheck" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>
<script>
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  data() {
    return {
      fontColor: 'black', // 默认的字体颜色
      bgColor: 'white', // 默认的是背景颜色
      isShow: false // 设置按钮默认是隐藏的
    }
  },
  computed: {
    isCheck:{
      get(){
        return this.todo.isCompleted
      },
      set(){
        this.$bus.$emit('toggleTodo',this.todo)
        // this.toggleTodo(this.todo)
      }
    }
  },
  methods: {
    // 高亮显示的相关的操作的方法
    mouseenterHandle(flag) {
      if (flag) {
        // 鼠标进入
        this.fontColor = 'green'
        this.bgColor = 'pink'
        this.isShow = true
      } else {
        // 鼠标离开
        this.fontColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    // 删除操作
    delTodo(){
      // 提示
      if(confirm('确定删除吗')){
        // 删除操作
        // 发布消息
        PubSub.publish('deleteTodo',this.index)
        //this.deleteTodo(this.index)
      }
    }
  },
  name: 'Item',
  props: {
    // 限定todo是Object类型的
    todo: Object,
    // 限定deleteTodo是Function类型的
    // deleteTodo:Function,
    // 限定index是Number类型的
    index:Number,
    // 限定toggleTodo是Function类型
    // toggleTodo:Function
  }
}
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
