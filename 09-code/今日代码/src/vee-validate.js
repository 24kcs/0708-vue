
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)


VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号码'
  }
})
VeeValidate.Validator.extend('phone', {
  getMessage: (field) => `请输入正确的` + field,
  validate: (value) => {
    return /[1]\d{10}/.test(value)
  }
})