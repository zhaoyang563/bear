const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 34   //基准大小 baseSize，需要和rem.js中相同
})

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  configureWebpack: {    
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },    
    module: {        
      rules: [    
        {    
          test: /\.tsx?$/,    
          loader: 'ts-loader',    
          exclude: /node_modules/,    
          options: {
            appendTsSuffixTo: [/\.vue$/],    
          }    
        }        
      ]    
    }    
  },
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
   // 是否使用css分离插件 ExtractTextPlugin
   extract: true,
   // 开启 CSS source maps?
   sourceMap: false,
   // css预设器配置项
   loaderOptions: {},
      // 启用 CSS modules for all css / pre-processor files.
      modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
      proxy: {
        '/api1':{
          // target:'https://api.bimface.com/',
          target:'https://api.map.baidu.com/',
          // target:'http://127.0.0.1:9778/',
          changeOrigin: true,
          // https需要加这个参数
          secure: true,
          pathRewrite: {
            '^/api1': ''
          }
        },
        '/': {
          // target: 'http://testjk.renewp.com:9595/',
          target: 'http://192.168.199.128:9595/',
          changeOrigin: true,
          // ws: true,
          // pathRewrite: {
          //   '^/': ''
          // }
        },
        
      }, // 设置代理
      // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
  // ...
  }
}