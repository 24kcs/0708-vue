<template>
  <div>
    <input type="text" :value="msg" @input="msg=$event.target.value" >
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg:'tom'
    }
  }
}
</script>
<style scoped>
</style>