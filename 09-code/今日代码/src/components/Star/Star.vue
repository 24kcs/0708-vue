<template>
  <div class="star" :class="`star-`+size">
    <span class="star-item" :class="cls" v-for="(cls,index) in scoreClass" :key="index"></span>
   
  </div>
</template>
<script>
export default {
  name: 'Star',
  props: {
    // 设置分数类型
    score: Number,
    // 设置尺寸类型
    size: String
  },
  computed: {
    // 根据传入进来的分数,计算对应的类样式
    scoreClass() {
      const { score } = this
      let classArr = []
      // 3.8 取整
      let scoreInt = Math.floor(score)
      // 遍历的方式添加on
      for (let i = 0; i < scoreInt; i++) {
        classArr.push('on')
      }
      // 半颗星星
      if (score * 10 - scoreInt * 10 >= 5) {
        classArr.push('half')
      }
      // 灰色星星
      while(classArr.length<5){
        classArr.push('off')
      }
      return classArr
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>