<template>
  <div>
    <!--点击按钮,按钮的点击事件中调用的是$emit方法,该方法内部触发传过来的click事件,调用show3回调函数-->

    <button @click="$emit('click','show3')">组件2中的第一个按钮</button>

    <button @click="$emit('xxx','show4')">组件2中的第二个按钮</button>

    
    <button @click="showMsg">组件2中的按钮3</button>
  </div>
</template>
<script>
export default {
  methods: {
    showMsg() {
      this.$bus.$emit('xx', '试试')
    }
  }
}
</script>
<style scoped>
</style>