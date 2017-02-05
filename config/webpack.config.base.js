const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cfg = require('../config/env.config.js')
cfg.initPath()
const envcfg = require('../config/env.config.js').server('development')

// const ROOT_PATH = path.join(process.cwd(), '.')
// const BUILD_PATH = path.join(ROOT_PATH, 'build')
const ROOT_PATH = envcfg.ROOT_PATH; // path.join(process.cwd(), '..')
const BUILD_PATH = envcfg.OUT_PATH; // path.join(ROOT_PATH, 'build')

const nodeModulesPath = path.join(ROOT_PATH, 'node_modules')
const SRC_PATH = path.join(ROOT_PATH, 'src')
const imgPath = path.resolve(ROOT_PATH, 'src/img')
const uiPath = path.resolve(ROOT_PATH, 'src/components')
const commPath = path.resolve(ROOT_PATH, 'src/commons')
const GPagesReducer = path.resolve(ROOT_PATH, 'src/store/pages.reducer.js')
const eslintPath = path.resolve(ROOT_PATH, '.eslintrc')
const testJsonPath = path.resolve(ROOT_PATH, 'test/json')

const plugins = [
    new ExtractTextPlugin(envcfg.cssFilename),
    new HtmlWebpackPlugin({
        title: 'ncms admin',
        // template: path.join(BUILD_PATH, './template/index.ejs'),
        template: path.join(SRC_PATH, './h5js.html'),
        filename: './h5js.html',    //生成的html存放路径，相对于 path
    }),
];
const config = {
  entry: {
    app: [path.join(SRC_PATH, 'h5js.js')]
  },
  output: {
    //path: path.join(__dirname, 'public/dist'),
    //path: path.join(__dirname, 'dist/'),
    path: BUILD_PATH,
    filename: envcfg.outputFilename, //isDev?'dist/js/[name].js':'dist/js/[name].[chunkhash:8].js',
    chunkFilename: envcfg.outputChunkFilename, //isDev?'dist/js/[id].chunk.js':'dist/js/[id].[chunkhash:8].chunk.js',
    //chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
    //publicPath: 'public/dist'
    publicPath: envcfg.publicPath,
    //publicPath: isProduction()? 'http://******' : 'http://localhost:3000',
  },
  plugins,
  resolve: {
    root: [SRC_PATH, nodeModulesPath],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
  },
};
const babelQuery = {
    // 支持aysnc await
    plugins: ['transform-runtime', 'add-module-exports'],
    //presets: ['es2015', 'react', 'stage-0']
    presets: ['es2015', 'stage-0', 'react']
    //presets: ["es2015", "react"]
}
/**
 * 解决错误: Cannot define 'query' and multiple loaders in loaders list
 * https://github.com/jsdf/webpack-combine-loaders
 */
config.module.loaders =
[
    {
        test: /\.(js|jsx)$/, loader: 'react-hot-loader', exclude: nodeModulesPath
    },
    {
        test: /\.js$/,
        include: [SRC_PATH],
        exclude: nodeModulesPath,
        loaders: [`babel?${JSON.stringify(babelQuery)}`],
        // loaders: ['babel'+'?'+JSON.stringify(babelQuery)],
        //loaders: ['react-hot', 'babel'+'?'+JSON.stringify(babelQuery)],
    },
    {
        test: /\.jsx$/,
        include: [SRC_PATH],
        exclude: nodeModulesPath,
        loaders: [`babel?${JSON.stringify(babelQuery)}`],
        // loaders: ['babel'+'?'+JSON.stringify(babelQuery)],
        //loaders: ['react-hot', 'babel'+'?'+JSON.stringify(babelQuery)],
    },
    {
        test: /\.less$/,
        // loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader'],
        // 写法参考: https://github.com/webpack/extract-text-webpack-plugin#api
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'autoprefixer-loader', 'less-loader'])
        //loader: 'style-loader!css-loader!autoprefixer-loader!less-loader',
        //loaders: [ExtractTextPlugin.extract('style'), 'css', 'less'],
    },
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'autoprefixer-loader', 'sass-loader'])
    },
    {
        test: /\.css$/,
        //loader: "style-loader!css-loader"
        //分离css单独打包
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    },
]
module.exports = config;
