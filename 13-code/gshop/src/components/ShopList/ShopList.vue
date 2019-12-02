<template>
  <div class="msite_shop_list">
    <div class="shop_header">
      <i class="iconfont icon-xuanxiang"></i>
      <span class="shop_header_title">附近商家</span>
    </div>
    <div class="shop_container">
      <ul class="shop_list" v-if="shops.length">
        <li
          class="shop_li border-1px"
          v-for="(shop,index) in shops"
          :key="index"
          @click="$router.push('/shop')"
        >
          <a>
            <div class="shop_left">
              <img class="shop_img" :src="`https://fuss10.elemecdn.com`+shop.image_path" />
            </div>
            <div class="shop_right">
              <section class="shop_detail_header">
                <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                <ul class="shop_detail_ul">
                  <li
                    class="supports"
                    v-for="(support,index) in shop.supports"
                    :key="index"
                  >{{support.icon_name}}</li>
                </ul>
              </section>
              <section class="shop_rating_order">
                <section class="shop_rating_order_left">
                  <Star size="24" :score="shop.rating" />
                  <!-- <div class="star star-24">
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                    <span class="star-item on"></span>
                    <span class="star-item half"></span>
                    <span class="star-item off"></span>
                  </div>-->
                  <div class="rating_section">{{shop.rating}}</div>
                  <div class="order_section">月售{{shop.recent_order_num}}单</div>
                </section>
                <section class="shop_rating_order_right">
                  <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                </section>
              </section>
              <section class="shop_distance">
                <p class="shop_delivery_msg">
                  <span>¥{{shop.float_minimum_order_amount}}起送</span>
                  <span class="segmentation">/</span>
                  <span>{{shop.piecewise_agent_fee.tips}}</span>
                </p>
              </section>
            </div>
          </a>
        </li>
      </ul>
      <ul v-else>
        <li>
          <img src="./images/shop_back.svg" alt />
        </li>
        <li>
          <img src="./images/shop_back.svg" alt />
        </li>
        <li>
          <img src="./images/shop_back.svg" alt />
        </li>
        <li>
          <img src="./images/shop_back.svg" alt />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 引入Vuex
import { mapState } from 'vuex'
export default {
  name: 'ShopList',
  computed: {
    // 从Vuex中获取了shops数组数据信息
    // ...mapState(['shops'])
    ...mapState({
      shops: state => state.msite.shops
    })
  }
}

// 两个变量值的交换

// 三种----2种------第三种
// var num1 = 10;
// var num2 = 20;
// var temp = num1;
// num1 = num2;
// num2 = temp;
// console.log(num1,num2)

// var num1 = 10
// var num2 = 20
// num1 = num1 + num2
// num2 = num1 - num2
// num1 = num1 - num2
// console.log(num1, num2)

// var num1 = 10
// var num2 = 20
// num1 = num1 ^ num2
// num2 = num1 ^ num2
// num1 = num1 ^ num2
// console.log(num1, num2)
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite_shop_list
  top-border-1px(#e4e4e4)
  margin-top 10px
  background #fff
  .shop_header
    padding 10px 10px 0
    .shop_icon
      margin-left 5px
      color #999
    .shop_header_title
      color #999
      font-size 14px
      line-height 20px
  .shop_container
    margin-bottom 50px
    .shop_list
      .shop_li
        bottom-border-1px(#f1f1f1)
        width 100%
        >a
          clearFix()
          display block
          box-sizing border-box
          padding 15px 8px
          width 100%
          .shop_left
            float left
            box-sizing border-box
            width 23%
            height 75px
            padding-right 10px
            .shop_img
              display block
              width 100%
              height 100%
          .shop_right
            float right
            width 77%
            .shop_detail_header
              clearFix()
              width 100%
              .shop_title
                float left
                width 200px
                color #333
                font-size 16px
                line-height 16px
                font-weight 700
                &::before
                  content '品牌'
                  display inline-block
                  font-size 11px
                  line-height 11px
                  color #333
                  background-color #ffd930
                  padding 2px 2px
                  border-radius 2px
                  margin-right 5px
              .shop_detail_ul
                float right
                margin-top 3px
                .supports
                  float left
                  font-size 10px
                  color #999
                  border 1px solid #f1f1f1
                  padding 0 2px
                  border-radius 2px
            .shop_rating_order
              clearFix()
              width 100%
              margin-top 18px
              margin-bottom 8px
              .shop_rating_order_left
                float left
                color #ff9a0d
                .rating_section
                  float left
                  font-size 10px
                  color #ff6000
                  margin-left 4px
                .order_section
                  float left
                  font-size 10px
                  color #666
                  transform scale(0.8)
              .shop_rating_order_right
                float right
                font-size 0
                .delivery_style
                  transform-origin 35px 0
                  transform scale(0.7)
                  display inline-block
                  font-size 12px
                  padding 1px
                  border-radius 2px
                .delivery_left
                  color #fff
                  margin-right -10px
                  background-color #02a774
                  border 1px solid #02a774
                .delivery_right
                  color #02a774
                  border 1px solid #02a774
            .shop_distance
              clearFix()
              width 100%
              font-size 12px
              .shop_delivery_msg
                float left
                transform-origin 0
                transform scale(0.9)
                color #666
              .segmentation
                color #ccc
</style>