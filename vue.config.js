/*
 * @description:
 * @version:
 * @Author: changjia
 * @Date: 2021-11-12 15:57:15
 * @LastEditors: changjia
 * @LastEditTime: 2021-12-01 21:15:15
 */
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Vue Admin Concise' // 首页标题

// 如果您的端口设置为80，则使用管理员权限来执行命令行。
// 例如，Mac: sudo npm run修改端口的方法如下:
// port = 9528 npm run dev或 npm run dev--port = 9521
const port = process.env.port || process.env.npm_config_port || 9521 // 开发端口

// 所有配置项说明可在 https://cli.vuejs.org/config/
module.exports = {
  /**
   * 如果您计划将站点部署在子路径下，例如GitHub Pages，则需要设置publicPath。
   * 例如 GitHub Pages. 如果您计划将站点部署到 https://foo.github.io/bar/,
   * 那么publicPath应该设置为 "/bar/".
   * 在大多数情况下请使用 '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: false, // 关闭ESLint错误检查
  // lintOnSave: 'warning', // 输出错误提示，但项目继续运行
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js') // 使用mock数据代理
      // 配置api代理
      // proxy: {
      //   // 'dev-api' 作为开发环境公共路径,作为所有的api接口开头(在.env.development文件中设置)
      //   "dev-api": {
      //     target: "http://localhost:8080", // 目标路径
      //     pathRewrite: {
      //       "^/dev-api": "", // 重写url.代码中定义以'dev-api'作为url的开头，最终url开头不显示 'dev-api'，故需要用空字符代替。
      //     },
      //   },
      // },
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用的标题，这样就可以在index.html中访问它，从而注入正确的标题。
    name: name,
    resolve: {
      extensions: ['.js', '.vue', '.json', 'css', 'scss'],
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 它可以提高第一屏的速度，建议开启预加载
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      // 忽略runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }])

    // 当页面太多时，会导致太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
          // `runtime`必须与 runtimeChunk名称相同。默认是`runtime`
          inline: /runtime\..*\.js$/
        }])
        .end()
      config.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // 只打包最初依赖的第三方
            },
            elementUI: {
              name: 'chunk-elementUI', // 将elementUI拆分为单个包
              priority: 20, // 重量需要大于libs和app，否则它将被打包成libs或app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应 cnpm
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // 可以自定义规则
              minChunks: 3, //  最低常见的数量
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
        // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  }
}
