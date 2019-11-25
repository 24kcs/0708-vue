/**
 * 
 * stylus,是css预处理之一
 * less
 * 如果是在静态页面中使用stylus,
 * 先安装stylus : 命令:  npm install stylus -g
 * 首先创建一个文件  xxx.styl
 * 都是把xxx.styl文件编译成xxx.css文件
 * stylus -w xxx.styl -o  css   (此时xxx.styl文件和css目录是兄弟关系)
 * stylus -w xxx.styl -o 绝对路径/css (此时xxx.styl文件和css目录是子父关系:css目录中有xxx.styl文件)
 * 
 * 在Vue脚手架2中使用stylus,使用的是插件
 * 命令:
 * npm install stylus stylus-loader (也可以使用yarn add stylus stylus-loader)
 * 项目:
 * 1. 下载脚手架2
 * vue init webpack 名字
 * 2. 安装路由和stylus
 * npm install vue-router stylus stylus-loader 
 * 3.分析做好的项目,6个一级路由
 * 把每一个一级路由对应的组件放在自己同名的目录中,这些路由组件(目录)都放在pages目录中
 * 项目中分上下两个部分,下面的部分显示的是路由组件,下面的部分显示的是FooterGuide组件
 * 4.拆分组件
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */