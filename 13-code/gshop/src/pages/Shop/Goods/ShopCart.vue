<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}" @click="showCart">
              <i class="iconfont icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food,index) in cartFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <div class="cartcontrol">
                  <CartControl :food="food" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click="showCart"></div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
// 引入BScroll
import BScroll from 'better-scroll'
export default {
  name: 'ShopCart',
  data() {
    return {
      isShowCart: false
    }
  },
  computed: {
    ...mapState({
      cartFoods: state => state.shop.cartFoods,
      info: state => state.shop.info
    }),
    ...mapGetters(['totalCount', 'totalPrice']),
    // 计算类样式
    payClass() {
      const { totalPrice } = this // 总价格
      const { minPrice } = this.info // 最低起送价格
      return totalPrice < minPrice ? 'not-enough' : 'enough'
      //not-enough
    },
    // 计算显示的文本内容
    payText() {
      const { totalPrice } = this // 总价格
      const { minPrice } = this.info // 最低起送价格

      if (totalPrice === 0) {
        return `￥${minPrice}元起送`
      } else if (totalPrice >= minPrice) {
        return '结算'
      } else {
        return `还差￥${minPrice - totalPrice}元起送`
      }
    },
    // 计算属性,用来显示或者隐藏列表,需要new 滑动对象
    listShow() {
      // 获取总数量
      const { totalCount } = this
      // 判断数量是不是0
      if (totalCount === 0) {
        this.isShowCart = false
        return false
      }

      // 此时列表应该是显示的
      this.$nextTick(() => {
        // 单例模式
        if (!this.scroll) {
          this.scroll = new BScroll('.list-content', {
            click: true
          })
        }else{
          // 刷新---滚动正常
          this.scroll.refresh()
        }
      })

      return this.isShowCart
    }
  },
  methods: {
    showCart() {
      if (this.totalCount > 0) {
        this.isShowCart = !this.isShowCart
      }
    }
  }
}


// var obj 
// if(!obj){
//  obj = new Object()
// }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../common/stylus/mixins.styl'
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    font-size 0
    color rgba(255, 255, 255, 0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        vertical-align top
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c
          &.highlight
            background $green
          .icon-shopping_cart
            line-height 44px
            font-size 24px
            color #80858a
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 12px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 16px
        font-weight 700
        &.highlight
          color #fff
      .desc
        display inline-block
        vertical-align top
        margin 12px 0 0 12px
        line-height 24px
        font-size 10px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
  .shopcart-list
    position absolute
    left 0
    top 0
    z-index -1
    width 100%
    transform translateY(-100%)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 40
  backdrop-filter blur(10px)
  opacity 1
  background rgba(7, 17, 27, 0.6)
  &.fade-enter-active, &.fade-leave-active
    transition all 0.5s
  &.fade-enter, &.fade-leave-to
    opacity 0
</style>
