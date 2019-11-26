<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <Header :title="address.name||'正在定位中...'">
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
        </span>
      </Header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
              <a
                href="javascript:"
                class="link_to_food"
                v-for="(category,index) in categorys"
                :key="index"
              >
                <div class="food_container">
                  <img :src="`https://fuss10.elemecdn.com`+category.image_url" />
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--首页附近商家-->
      <ShopList />
    </section>
  </div>
</template>
<script>
// 引入组件
import ShopList from '../../components/ShopList/ShopList.vue'
// 引入Swiper
import Swiper from 'swiper'
// 引入Swiper的样式文件
import 'swiper/css/swiper.css'
// 引入vuex
import { mapState } from 'vuex'

export default {
  name: 'MSite',
  // 注册组件
  components: {
    ShopList
  },
  computed: {
    ...mapState(['address', 'categorys']),
    // 每屏8条数据,两个屏
    categorysArr() {
      const { categorys } = this
      // 大数组
      let bigArr = []
      // 小数组
      let smallArr = []
      // 遍历数据向大数组中添加数据
      categorys.forEach(category => {
        // 如果小数组没有数据,则添加到大数组中
        if (smallArr.length === 0) {
          bigArr.push(smallArr)
        }
        // 向小数组中添加数据
        smallArr.push(category)
        // 如果小数组中的数据8条的时候就要清空小数组
        if (smallArr.length === 8) {
          smallArr = []
        }
      })
      return bigArr
    }
  },
  // 界面显示之后
  async mounted() {
    // 提交action,获取商铺信息
    this.$store.dispatch('getShops')
    // 提交action,获取食品分类信息
    await this.$store.dispatch('getCategorys')
    this.$nextTick(() => {
      new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    })

    // this.$store.dispatch('getCategorys', () => {
    //   this.$nextTick(() => {
    //     new Swiper('.swiper-container', {
    //       loop: true, // 循环模式选项
    //       // 如果需要分页器
    //       pagination: {
    //         el: '.swiper-pagination'
    //       }
    //     })
    //   })
    // })
    // 坑============================================
  }
  // watch: {
  //   categorys() {
  //     setTimeout(() => {
  //       new Swiper('.swiper-container', {
  //         loop: true, // 循环模式选项
  //         // 如果需要分页器
  //         pagination: {
  //           el: '.swiper-pagination'
  //         }
  //       })
  //     }, 1000)
  //   }
  // }
  // watch: {
  //   categorys() {
  //     // 将回调延迟到下次 DOM 更新循环之后执行
  //     this.$nextTick(() => {
  //       new Swiper('.swiper-container', {
  //         loop: true, // 循环模式选项
  //         // 如果需要分页器
  //         pagination: {
  //           el: '.swiper-pagination'
  //         }
  //       })
  //     })
  //   }
  // }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>