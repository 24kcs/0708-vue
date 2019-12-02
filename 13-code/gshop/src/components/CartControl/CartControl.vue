<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div
        class="iconfont icon-remove_circle_outline"
        v-show="food.count>0"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>
<script>
export default {
  name: 'CartControl',
  props: {
    food: Object
  },
  methods: {
    // 增加或者减少食物数量的方法---回调
    updateFoodCount(isAdd) {
      // 不能直接操作food对象----->去vuex中,修改vuex中的food对象的数据----mutations直接修改---actions间接修改
      this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
      console.log('执行')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  .icon-remove_circle_outline
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
    &.fade-enter-active,&.fade-leave-active
      transition all .5s
    &.fade-enter,&.fade-leave-to
      opacity 0
      transform translateX(15px) rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .icon-add_circle
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color $green
</style>

