<template>
  <h2 v-if="!repUrl">正在加载中......</h2>
  <h2 v-else>
    most star is
    <a :href="repUrl">{{repName}}</a>
  </h2>
</template>
<script>
// 引入axios
import axios from "axios";
export default {
  data() {
    return {
      repUrl: "", // 地址
      repName: "" // 名字
    };
  },
  async mounted() {
    // 地址
    try {
      const url = `https://api.github.com/search/repositories?q=v&sort=stars`;
      const response = await axios.get(url);
      const result = response.data.items[0];
      // 更新数据
      this.repName = result.name;
      this.repUrl = result.html_url;
    } catch (e) {
      console.log("错误:" + e.message);
    }
  }
};
</script>
<style scoped>
</style>