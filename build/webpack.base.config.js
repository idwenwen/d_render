const path = require('path')
const friendlyFormatter = require('eslint-friendly-formatter')
const miniCss = require('mini-css-extract-plugin')
const vueConfig = require('./vue.config')
const { VueLoaderPlugin } = require('vue-loader')

/**
 * 公用webpack打包配置
 */
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
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
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
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
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },

      {
        test: /\.scss$/,
        use: [
          miniCss.loader, 
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.css$/,
        use: [
          miniCss.loader, 
          'css-loader',
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
  plugins: [
    new miniCss({
      filename: '[name].[hash].css',
      publicPath: '/css/'
    }),
    new VueLoaderPlugin()
  ]
}