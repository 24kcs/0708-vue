<template>
  <div>
    必须要有一个根标签---父级容器
    <p>这是父级组件</p>
    <Hello/>
  </div>
</template>
<script>
// 引入子级组件
import Hello from './components/Hello.vue'
export default {
  name:'App',
  components: {
    Hello
  }
}

// 如果父级组件中有和子级组件中相同的标签(相同的样式),父级组件中的style标签中没有设置scoped,那么子级的样式会影响到父级组件的样式
</script>
<style >
p{
  color: green;
}
</style>