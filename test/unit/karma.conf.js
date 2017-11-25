// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadless'],
    
    mime: {
      'text/x-typescript': ['ts']
    },
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage', 'remap-coverage'],
    files: ['./index.ts'],
    preprocessors: {
      './index.ts': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      lcovonly: './test/unit/coverage/lcov.info',
      html: './test/unit/coverage/lcov-report'
    },
    
    // make sure both reporter plugins are loaded 
    plugins: ['karma-webpack', 
      'karma-sourcemap-loader', 
      'karma-coverage', 
      'karma-remap-coverage',
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-sinon-chai'
    ]
  })
}
