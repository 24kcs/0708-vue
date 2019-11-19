<template>
  <div>
    <div class="container">
      <Search />
      <Main />
    </div>
  </div>
</template>
<script>
// 引入Search
import Search from './components/Search.vue'
// 引入Main
import Main from './components/Main.vue'
export default {
  name:'App',
  components:{
    Search,
    Main
  }
}
</script>
<style scoped>
</style>