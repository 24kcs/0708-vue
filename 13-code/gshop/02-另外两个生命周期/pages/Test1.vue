<template>
  <div>
    第一个组件
  </div>
</template>
<script>
export default {
   activated () {
    console.log('激活的时候调用')
  },
  deactivated(){
    console.log('组件停用时候调用')
  },
}
</script>
<style scoped>
</style>