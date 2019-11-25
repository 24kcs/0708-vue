<template>
  <div>
    <!--路由视图:显示路由组件的-->
    <router-view/>
    <!--底部组件-->
    <FooterGuide/>
  </div>
</template>
<script>
// 引入底部组件
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  components: {
    FooterGuide
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus"></style>
