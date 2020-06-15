const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
/**
 * 开发环境下，webpack的相关配置。
 * 1. proxy
 * 2. dev-server
 */
const devConfig = merge(baseConfig, {
  mode: 'development',

  devtool:'cheap-eval-source-map',
  
  devServer: {
    clientLogLevel: 'warning',
    host: 'localhost',
    port: 8028,
    hot: true,
    compress: true,
    filename: '[name].[hash].js',
    headers: {
      'x-Custom-check': 'localhost'
    },
    historyApiFallback: true,
    open: true,
    overlay: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: path.resolve(__dirname, '../src/icon/title.png'),
      title: 'DRender'
    })
  ]
})