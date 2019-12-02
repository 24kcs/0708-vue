<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <router-link replace to="/shop/goods">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link replace to="/shop/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link replace to="/shop/info">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
import { reqGoods, reqRatings, reqInfo } from '../../api'
export default {
  name: 'Shop',
  components: {
    ShopHeader
  },
  mounted() {
    this.$store.dispatch('getInfo')
    // this.$store.dispatch('xxx')

    // this.$store.dispatch('getGoods')
    // this.$store.dispatch('getRatings')
    // this.$store.dispatch('getInfo')
    // const result1 = await reqGoods()
    // const result2 = await reqRatings()
    // const result3 = await reqInfo()
    // console.log(result1)
    // console.log(result2)
    // console.log(result3)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.tab
  height 40px
  line-height 40px
  background #fff
  bottom-border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    float left
    width 33.33333%
    text-align center
    font-size 14px
    color rgb(77, 85, 93)
    a
      display block
      position relative
      &.router-link-active
        color #02a774
        &::after
          content ''
          position absolute
          left 50%
          bottom 1px
          width 35px
          height 2px
          transform translateX(-50%)
          background #02a774
</style>
