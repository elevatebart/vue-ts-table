const wallabyWebpack = require('wallaby-webpack')
var webpackConfig = require('./build/webpack.test.conf')

module.exports = function (wallaby) {
  webpackConfig.resolve.alias = {'@': require('path').join(wallaby.projectCacheDir, 'src')}
  webpackConfig.module.rules.find(r => r.loader === 'vue-loader').options.loaders.jss = ''
  const wallabyPostprocessor = wallabyWebpack(webpackConfig)

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'src/**/*.*', load: false}
    ],
    compilers: {
      '**/*.vue': require('wallaby-vue-compiler')
    },
    env: {
      kind: 'chrome'
    },

    tests: [
      {pattern: 'test/unit/specs/**/*.spec.ts', load: false},
      {pattern: 'test/unit/specs/*.spec.ts', load: false}
    ],

    postprocessor: wallabyPostprocessor,

    testFramework: 'mocha',

    setup: function () {
      window.__moduleBundler.loadTests()
      window.expect = chai.expect;
      var should = chai.should();
    }
  }
}
