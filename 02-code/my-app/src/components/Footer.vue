<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isChecked" />
    </label>
    <span>
      <span>已完成{{count}}</span>
      / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" v-show="count>0">清除已完成任务</button>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    todos: {
      type: Array,
      required: true
    },
    checkAll: Function
  },
  // 计算属性
  computed: {
    count() {
      return this.todos.reduce((pre, todo) => pre + (todo.isShow ? 1 : 0), 0)
    },
    isChecked: {
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAll(val)
      }
    }
  }
}
</script>
<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
