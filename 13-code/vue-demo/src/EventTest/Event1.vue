<template>
  <div>
    <h2>Event1</h2>
    <button>组件中的按钮</button>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "测试"
    };
  },
  mounted() {
  
    this.$bus.$on('xx',(msg)=>{
      console.log(msg)
      this.msg=msg
    })
  }
};
</script>
<style scoped>
div {
  width: 200px;
  height: 200px;
  border: 1px solid red;
}
</style>