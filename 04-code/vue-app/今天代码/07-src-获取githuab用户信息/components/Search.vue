<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName" @keyup.13="searchUser" />
      <button>Search</button>
    </div>
  </section>
</template>
<script>
export default {
  name:'Search',
  data () {
    return {
      searchName:'' // 搜索内容  
    }
  },
  methods: {
    // 搜索
    searchUser(){
      const searchName=this.searchName.trim()
      if(searchName){
        // 分发事件
        this.$bus.$emit('search',searchName)
      }
    }
  }
}
</script>
<style scoped>
</style>