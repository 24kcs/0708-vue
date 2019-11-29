<template>
  <div>
    <!--路由视图:显示路由组件的-->
    <router-view />
    <!--底部组件-->
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>
<script>
// 引入底部组件
import FooterGuide from './components/FooterGuide/FooterGuide'
// 引入接口,测试
// import { reqAddress, reqCategorys, reqShopList } from './api'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted() {
    this.$store.dispatch('getAddress')
    // 自动登录的操作
    this.$store.dispatch('autoLogin')
    // this.$store.dispatch('getCategorys')
    // this.$store.dispatch('getShops')
  }

  // async mounted() {
  //    const result1=await reqAddress({
  //     longitude: '116.36867',
  //     latitude: '40.10038'
  //   })
  //    await reqCategorys()
  //    await reqShopList({
  //     longitude: '116.36867',
  //     latitude: '40.10038'
  //   })
  //  // console.log(result1)

  // }
}
</script>
<style lang="stylus" rel="stylesheet/stylus"></style>
