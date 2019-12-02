<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="'required|changePhone'"
              />
              <span style="color:red">{{ errors.first('phone') }}</span>
              <button
                class="get_verification"
                :disabled="!isRightPhone||computedTime>0"
                :class="{right:isRightPhone}"
                @click.prevent="sendCode"
              >{{computedTime>0?`已发送(${computedTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="'required'"
              />
              <span style="color:red">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                />
                <span style="color:red">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShowPwd?'text':'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                />
                <span style="color:red">{{ errors.first('pwd') }}</span>
                <div
                  class="switch_button"
                  :class="isShowPwd?'on':'off' "
                  @click="isShowPwd=!isShowPwd"
                >
                  <div class="switch_circle" :class="{run_circle:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="'required'"
                />
                <span style="color:red">{{ errors.first('captcha') }}</span>
                <img
                  @click="sendCaptcha"
                  ref="im"
                  class="get_verification"
                  src="http://localhost:5000/captcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
// 引入接口
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '../../api'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'Login',
  data() {
    return {
      loginWay: true, // 默认值是true,默认是手机登录
      phone: '', // 手机号
      computedTime: 0, // 倒计时的默认值
      isShowPwd: false, // 默认是false,使用的是password
      code: '', // 验证码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '' // 图形验证码
    }
  },
  computed: {
    isRightPhone() {
      // 手机号码
      return /[1]\d{10}/.test(this.phone)
    }
  },
  methods: {
    // 发送验证码
    async sendCode() {
      this.computedTime = 10
      this.timeId = setInterval(() => {
        this.computedTime--
        if (this.computedTime <= 0) {
          // 还原为默认值
          this.computedTime = 0
          // 清理定时器
          clearInterval(this.timeId)
        }
      }, 1000)

      // 调用接口发送验证码----成功或者失败
      const result = await reqSendCode(this.phone)
      if (result.code === 0) {
        // 成功
        Toast('发送成功')
      } else {
        // 失败
        MessageBox.alert('发送失败', '提示')
        this.computedTime = 0
      }
    },
    // 获取图形验证码
    sendCaptcha() {
      // 图标标签
      this.$refs.im.src = 'http://localhost:5000/captcha?time=' + Date.now()
    },
    // 登录操作
    async login() {
      // this.$validator.validateAll(); 表单整体校验
      const { loginWay, phone, code, name, pwd, captcha } = this
      let names
      // 判断
      if (loginWay) {
        // 手机号码登录
        names = ['phone', 'code']
      } else {
        // 用户名/密码/图形验证码
        names = ['name', 'pwd', 'captcha']
      }
      // 表单的验证
      const success = await this.$validator.validateAll(names)
      // 判断表单验证是否通过
      if (success) {
        let result
        // 判断是哪种方式进行登录
        if (loginWay) {
          // 调用手机登录的接口
          result = await reqSmsLogin(phone, code)
          this.code = '' // 清掉验证码
        } else {
          // 调用用户名/密码的接口
          result = await reqPwdLogin({ name, pwd, captcha })
          if (result.code !== 0) {
            // 刷新图形码
            this.sendCaptcha()
            this.captcha = '' // 清空图形码
          }
        }
        // console.log(result)
        // 判断调用接口之后的返回的结果的状态码----code:0
        if (result.code === 0) {
          // 登录成功
          const user = result.data
          // 保存当前的用户信息
          this.$store.dispatch('saveUser', user)

          // 跳转界面
          this.$router.replace('/profile') // 我的  界面
        } else {
          Toast('登录失败')
        }
      }
    }
  },
  // 组件内的路由守卫
  beforeRouteEnter(to, from, next) {
    // 该路由守卫,进入到当前组件之前这里的this是undefined,进入组件之前进行守卫,所以,组件实例对象是没有
    next(vm => {
      // 放行之后vm才是你的组件实例对象
      // console.log(vm)
      // 如果登录去我的界面
      if (vm.$store.state.user.user._id) {
        next('/profile')
      }
    })
  }

  // beforeRouteEnter(to, from, next) {
  //   // 这里没代码,则在我的界面点击登录,是无法进来的
  //   next(vm => {
  //     // 通过 `vm` 访问组件实例
  //     // 登录了去个人中心
  //     if(vm.$store.state.user.user._id){
  //       next('/profile')
  //     }
  //   })
  // }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.run_circle
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>