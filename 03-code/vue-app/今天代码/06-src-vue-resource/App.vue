<template>
  <h2 v-if="!repUrl">正在加载中......</h2>
  <h2 v-else>
    most star is
    <a :href="repUrl">{{repName}}</a>
  </h2>
</template>
<script>
export default {
  data() {
    return {
      repUrl: "", // 地址
      repName: "" // 名字
    };
  },
  mounted() {
    // 地址
     const url = `https://api.github.com/search/repositories?q=v&sort=stars`;
    this.$http
      .get(url)
      .then(response=>{
        const result=response.data.items[0]
        // 更新数据
        this.repUrl=result.html_url
        this.repName=result.name
      })
      .catch(error=>{
        console.log('错误:'+error)
      });
  }
};
</script>
<style scoped>
</style>