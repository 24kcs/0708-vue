<template>
  <div>
    <Mixin1 />
    <hr />
    <Mixin2 />
  </div>
</template>
<script>
/**
 * 把每个组件中重复的配置内容可以抽取出来,放在mixin.js文件中
 * 然后在需要使用该配置的组件中进行引入,同时使用:mixins:[]进行配置
 *
 *
 */
import Mixin1 from "./Mixin1.vue";
import Mixin2 from "./Mixin2.vue";
export default {
  components: {
    Mixin1,
    Mixin2
  }
};
</script>
<style scoped>
</style>