import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  // 中文的提示信息
  messages: zh_CN.messages,
  // 属性的提示
  attributes: {
    phone: '手机号码',
    code: '短信验证码',
    name: '用户名',
    pwd: '密码',
    captcha: '图形验证码'
  }
});

VeeValidate.Validator.extend('changePhone', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {
    return /[1]\d{10}/.test(value)
  }
});


