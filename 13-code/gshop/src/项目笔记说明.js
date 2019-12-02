/**
 * api目录:放ajax相关操作的代码文件:index.js(相关的接口),ajax.js(封装的axios,拦截器)
 * common目录:stylus的混合文件.styl
 * components目录: 普通的组件的目录
 * filter目录:放过滤器的相关代码---日期格式化的文件
 * mock目录:.json文件及mock.js文件(拦截ajax请求,随机生成数据)
 * pages目录:路由的组件
 * router目录:路由器及路由的配置
 * store目录:vuex相关的文件
 * 准备工作
 * 1.static目录中创建一个css目录,该目录中:reset.css和iconfont.css
 * 2.src目录中的common目录,里面有一个stylus目录中:mixins.styl
 * 3.在index.html文件中引入重置样式和图标字体和移动端延迟的问题
 * 因为项目使用stylus的方式设置样式
 * 所以,先安装stylus及stylus-loader
 * 命令: npm install stylus stylus-loader
 * 4.创建组件
 * components目录中有一个FooterGuide目录,中有:FooterGuide.vue文件底部的组件文件
 * 5.路由组件
 * pages目录中有4个目录:MSite,Search,Order,Profile
 * 6.下载路由插件
 * npm install vue-router
 * 7.拆分组件,复制粘贴即可
 */
