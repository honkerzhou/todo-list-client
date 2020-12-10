const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            // filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240, // 对超过10k的数据进行压缩
            minRatio: 0.6 // 压缩比例，值为0 ~ 1
          })
        ]
      }
    }
  }
  // chainWebpack: (config) => {
  //   // 移除 prefetch 插件
  //   config.plugins.delete('prefetch')
  //   /* 添加分析工具 */
  //   if (process.env.NODE_ENV === 'production') {
  //     if (process.env.npm_config_report) {
  //       config
  //         .plugin('webpack-bundle-analyzer')
  //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  //         .end()
  //     }
  //   }
  // }

}
