const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  configureWebpack: {
    resolve: {
      // 后缀为.js和.vue和.json都可以省略
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // 配置了esm.js这个文件
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')  // 需要改东西
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // 目标地址
        target: 'http://localhost:5000',
        // 是否跨域
        changeOrigin: true,
        // 干掉/api
        pathRewrite: {
          '^/api': '' // rewrite path
        }
      }
    }
  }
}
