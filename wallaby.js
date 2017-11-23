const wallabyWebpack = require('wallaby-webpack')
var webpackConfig = require('./build/webpack.test.conf')

module.exports = function () {
  const wallabyPostprocessor = wallabyWebpack(webpackConfig)

  return {
    files: [
      {pattern: 'src/images/*'},
      {pattern: 'src/components/types/*.ts', load: false},
      {pattern: 'src/components/*.ts', load: false}
    ],

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
    }
  }
}
