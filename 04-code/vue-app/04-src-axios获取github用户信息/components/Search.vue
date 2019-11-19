<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        @keyup.13="searchContent"
        v-model="searchName"
      />
      <button>Search</button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      searchName: '' // 获取搜索到的名字内容
    }
  },
  methods: {
    // 搜索操作
    searchContent() {
      // 获取输入的搜索内容
      const searchName = this.searchName.trim()
      // 判断
      if (searchName) {
        // 分发事件
        this.$bus.$emit('search', searchName)
      }
      // 清空文本框
      this.searchName = ''
    }
  }
}
</script>
<style scoped>
</style>