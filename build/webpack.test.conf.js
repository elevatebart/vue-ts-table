'use strict'
// This is the webpack config used for unit tests.
var isCoverage = process.env.NODE_ENV === 'coverage';

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
var nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf')
const path = require('path')

const webpackConfig = merge(baseConfig, {
  entry: {
    'vue-ts-table': './src'
  },
  module: {
    rules: utils.styleLoaders()
  },
  
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require(isCoverage ? '../config/coverage.env' : '../config/test.env')
    })
  ],
  target: "node",
  externals: [nodeExternals()]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
