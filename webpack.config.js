/*
 * @Author: shijie
 * @Date:   2019-01-20 13:19:59
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-01-21 21:34:24
 */
const path = require('path');
//抽离css文件的插件webpack4使用mini-css-extract-plugin  以前版本支持extract-text-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//多页配置函数封装
var getHtmlCofig = function(name, title) {
	return new HtmlWebpackPlugin({
		//匹配路径
		template: './src/view/' + name + '.html',
		//打包输出路径
		filename: 'view/' + name + '.html',
		title: title,
		chunks: [name],
		hash: true, //清缓存
		//压缩html文件
		// minify: {
		// 	removeAttributeQuotes: true, //删除属性的引号
		// 	collapseWhitespace: true //删除空格
		// }
	})
}


module.exports = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js']
	},
	output: {
		path: path.resolve('./dist'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		}, {
			test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
			loader: 'url-loader?limit=100&name=resource/[name].[ext]'
		}, {
			test: /\.string$/,
			use: 'html-loader'
		}]
	},
	//js代码抽离
	optimization: {
		splitChunks: {
			//缓存组
			cacheGroups: {
				//自动提取js,commons可以改
				common: {
					name: "common", //输出的文件名，对应output.chunkFilename
					chunks: "all", //chunks有三个值，initial初始chunk,  async按需加载chunk, all 加载所有chunk
					minChunks: 2, //其他入口文件引用次数最小值
					minSize: 1, //公用代码的大小的最小值
					priority: 0 //webpack打包优先级
				},
				//优先拆分node_modules的模块，输出到vendor.js文件里，因为priority大
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					priority: 10
				}
			}
		}
	},
	//开发服务器
	devServer: {
		contentBase: './dist', //沿这个目录寻找模块,即执行webpack-dev-server打开的是dist这个目录
		port: 8090, //自定义端口，默认8080
		open: true, //执行webpack-dev-server自动打开浏览器
		compress: true, //服务器压缩
		hot: true //热更新

	},
	plugins: [
		//单独抽离css文件
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new webpack.HotModuleReplacementPlugin(),
		//html模块的处理
		new getHtmlCofig('index', '主页'),
		new getHtmlCofig('login', '登录页面')
	]
}