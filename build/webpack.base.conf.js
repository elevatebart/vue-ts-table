'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var vueTemplateLoaderConfig = require('./vue-template-loader.conf')
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      watch: ['./src', './app'] // optional but improves performance (less stat calls)
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
    modules: [
      "node_modules"
    ]
  },
  devtool: "inline-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.html$/,
        loader: 'vue-template-loader',
        exclude: resolve('index.html'),
        options: vueTemplateLoaderConfig
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: utils.buildBabelOptions()
        },
        include: [resolve('src'), resolve('app'), resolve('test')]
      },
      {
        test: /\.ts$/,
        use: [{
          loader: 'babel-loader',
          options: utils.buildBabelOptions()
          }, {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true // Disable type checking to run it in fork
          },
        }],
        include: [resolve('src'), resolve('app'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
