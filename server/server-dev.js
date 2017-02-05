const express = require('express')
const path = require('path')
const webpack = require('webpack')
//var webpackDevMiddleware = require('webpack-dev-middleware')
const app = express()
const logger = require('morgan')
const fs = require('fs')
const opn = require('opn')
const config = require('../config/env.config.js')


config.initPath('development')
process.env.NODE_ENV = 'development'
const webdir = config.OUT_PATH // path.join(__dirname, '../build/development')

app.use(logger('dev'));

console.log('调试服务器插件启动{{')
const webpackConfig = require('../config/webpack.config.base.js')
const myConfig = Object.create(webpackConfig)
myConfig.devtool = 'eval'
myConfig.debug = true

const serverOptions = {
    //contentBase: 'http://' + host + ':' + port,
    // quiet: true, //关掉输出的一堆信息, 但是eslint检测报告也关掉了
    // noInfo: true,
    // hot: true,
    // inline: true,
    // lazy: false,
    //publicPath: '/build/dist/',
    publicPath:  myConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
}
//会自动用webpack构建到内存
const compiler = webpack(myConfig);
app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler));
console.log('调试服务器插件启动}}')

app.listen(3020, function () {
  console.log('Server listening on http://localhost:3020, Ctrl+C to stop')
  opn('http://localhost:3020/admin/test/testa')
})


