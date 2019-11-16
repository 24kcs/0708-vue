<template>
  <div>
    <p>这是父级组件</p>
    <Hello/>
  </div>
</template>

<script>
// 引入组件
import Hello from './components/Hello.vue'
export default{
  name: 'App',
  // 注册组件
  components: {
    Hello
  }
}
</script>

<style>
p{
  color:red;
}
</style>
