const path = require('path')
const friendlyFormatter = require('eslint-friendly-formatter')
const miniCss = require('mini-css-extract-plugin')
const vueConfig = require('./vue.config')

/**
 * 公用webpack打包配置
 */
module.exports = {
  entry: {
    common: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '',
    library: 'drender'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@c': path.resolve(__dirname, '../src/component'),
      '@u': path.resolve(__dirname, '../src/util')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['eslint-loader'],
        enforce: 'pre',
        options: {
          formatter: friendlyFormatter,
        }
      },
      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: ['babel-loader'],
        options: {
          presets: ['es2015']
        }
      },

      {
        test: /\.scss$/,
        use: [
          miniCss.loader, 
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:6].[ext]'
        }
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:6].[ext]'
        }
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:6].[ext]'
        }
      }
    ]
  },
  plugin: [
    new miniCss({
      filename: '[name].[hash].css',
      publicPath: '/css/'
    })
  ]
}