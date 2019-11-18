<template>
  <li
    @mouseenter="mouseenterHandle(true)"
    @mouseleave="mouseenterHandle(false)"
    :style="{color:fontColor,backgroundColor:bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isChecked" />
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
  methods: {
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
      if(confirm('确认删除吗')){
        // this.deleteTodo(this.index)
        PubSub.publish('deleteTodo', this.index);
      }
    }
  },
  name: 'Item',
  props: {
    // 限定todo是Object类型的
    todo: Object,
    // deleteTodo:Function,
    index:Number,
    // toggleTodo:Function
  },
  // 计算属性
 computed: {
   isChecked:{
     get(){
       return this.todo.isCompleted
     },
     set(val){
       this.$bus.$emit('toggleTodo',this.todo)
       // this.toggleTodo(this.todo)
     }
   }
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
