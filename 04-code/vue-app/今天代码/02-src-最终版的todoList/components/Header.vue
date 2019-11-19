<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.13="add" />
  </div>
</template>
<script>
export default {
  methods: {
    add() {
      console.log(this)
      // 获取文本框的数据,并去掉空格
      const title = this.title.trim()
      if (title) {
        // 直接调用父级组件传过来的添加方法addTodo
        const todo={
          id:Date.now(),
          title,
          isCompleted: false
        }
        // 分发
        this.$emit('addTodo',todo)
        // this.addTodo(todo)
        // 清空文本框
        this.title = ''
      }
    }
  },
  // 状态数据
  data() {
    return {
      title: '' // 是文本框的默认值, 是空的
    }
  },
  name: 'Header',
  // 限定传过来的数据的类型
  props: {
    // 以对象的方式进行设置
    // addTodo: {
    //   type: Function, // 类型
    //   required: true // 是否是必须的
    // }
  }
}
</script>
<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
