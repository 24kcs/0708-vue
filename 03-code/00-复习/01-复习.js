/**
 * 事件修饰符:.prevent------阻止事件的默认行为   .stop----阻止事件冒泡
 * 
 * 按键修饰符: .enter-----.13------是否按下了回车键
 * 
 * Vue的生命周期:
 * beforeCreate()---数据初始化之前
 * created()----数据初始化之后
 * beforeMount()-----界面显示之前
 * mounted()------界面显示之后
 * beforeUpdate()------界面更新之前
 * updated()----界面更新之后
 * beforeDestory()-------卸载之前
 * destoryed()-----卸载之后
 * 
 * 过渡和动画
 * <transition name="fade"></transition>------Vue中的组件
 * 在style的标签内部:
 * .fade-enter{}
 * .fade-enter-active{}
 * .fade-enter-to{}
 * .fade-leave-{}
 * .fade-leave-active{}
 * .fade-leave-to{}
 * 
 * 过滤器
 * Vue.filter('过滤器的名字',回调)----moment() 格式化日期的
 * 
 * 自定义指令
 * 全局指令:在任何的位置使用
 * Vue.directive
 * 实例对象的指令----局部指令----在当前所对应的容器对象中使用
 * 实例对象的内部:directives
 * 自定义插件:
 * 首先必须有install的方法,内部需要定义全局的方法和实例方法,还可以定义指令
 * 使用插件的时候,先Vue.use(插件对象)---就可以插件了
 * 
 * key:最好使用id作为key,如果仅仅展示信息,可以直接使用index作为key使用
 * 
 * 脚手架
 * 安装脚手架 npm install vue-cli
 * 下载模版  vue init webpack 名字
 * cd 路径------切换路径
 * 运行:npm run dev-------------npm start
 * 打包: npm run build 
 * 运行打包文件: serve dist
 * 整个项目中的主入口文件,src/main.js
 * App.vue----父级组件
 * scoped-----范围,父子级的组件之间,有可能因为没有使用scoped会影响样式
 * 
 * todoList案例中的问题:
 * 1.拆分组件
 * 2.组件的关系:父子关系,兄弟关系,间接的父子关系
 * 3.组件之间的传值:
 *  1)props
 *  2)
 * 
 * 
 * 
 * 
 * 
 * 
 */