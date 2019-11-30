<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li
            class="menu-item"
            :class="{current:currentIndex===index}"
            v-for="(good,index) in goods"
            :key="index"
            @click="clickItem(index)"
          >
            <img class="icon" :src="good.icon" v-if="good.icon" />
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food,index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food" />
  </div>
</template>
<script>
// 引入vuex
import { mapState } from 'vuex'
// 引入BScroll
import BScroll from 'better-scroll'
// 引入Food
import Food from './Food.vue'
// 引入购物车
import ShopCart from './ShopCart'
export default {
  name: 'Goods',
  data() {
    return {
      scrollY: 0, // 默认向上滑动的距离
      tops: [], // 右侧所有li高度的范围  数组
      // 默认是空对象
      food: {}
    }
  },
  components: {
    Food,
    ShopCart
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    // 计算索引:根据scrollY在数组中的范围查找对应的索引
    currentIndex() {
      const { scrollY, tops } = this
      let index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      )
      // 然后判断下一次滑动后的索引和上一次保存的索引不一致则保存

      if (this.index !== index && this.leftScroll) {
        // 先存储当前的索引
        this.index = index
        // 左侧的列表立刻的滑动到指定的位置
        const li = this.$refs.leftUl.children[index]
        this.leftScroll.scrollToElement(li, 300)
      }
      return index
    }
  },
  async mounted() {
    // 发送异步请求
    await this.$store.dispatch('getGoods')
    // 初始化
    this._initBScroll()
    // 初始化tops数组数据
    this._initTops()
  },
  methods: {
    // 初始化BScroll
    _initBScroll() {
      this.leftScroll = new BScroll('.menu-wrapper', {
        click: true
      })
      this.rightScroll = new BScroll('.foods-wrapper', {
        click: true,
        // 1 非实时
        // 2 实时
        // 3 实时 惯性
        probeType: 1
      })
      // 滑动事件
      this.rightScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
      // 滑动结束的事件
      this.rightScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops数组
    _initTops() {
      const tops = []
      let top = 0
      tops.push(top)
      const list = this.$refs.rightUl.children
      Array.prototype.slice.call(list).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      console.log(tops)
      // 更新数组数据
      this.tops = tops
    },
    // 点击左侧列表,右侧滑动
    clickItem(index) {
      const scrollY = this.tops[index]
      this.scrollY = scrollY
      // 取负的值
      this.rightScroll.scrollTo(0, -scrollY, 300)
    },
    // 显示Food组件
    showFood(food) {
      this.food = food
      this.$refs.food.toggleFood()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 225px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>

