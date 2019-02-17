/*
 * @Author: shijie
 * @Date:   2019-01-20 13:19:59
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-17 17:26:48
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
		favicon: './favicon.ico', //favicon
		//打包输出路径
		filename: 'view/' + name + '.html',
		title: title,
		chunks: ['base', name], //对应entry名字的
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
		'base': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'user-login': ['./src/page/user-login/index.js'],
		'user-register': ['./src/page/user-register/index.js'],
		'user-center': ['./src/page/user-center/index.js'],
		'user-center-update': ['./src/page/user-center-update/index.js'],
		'user-pwd-reset': ['./src/page/user-pwd-reset/index.js'],
		'user-pwd-update': ['./src/page/user-pwd-update/index.js'],
		'product-detail': ['./src/page/product-detail/index.js'],
		'cart': ['./src/page/cart/index.js'],
		'about': ['./src/page/about/index.js'],
		'order-detail': ['./src/page/order-detail/index.js'],
		'order-list': ['./src/page/order-list/index.js'],
		'order-confirm': ['./src/page/order-confirm/index.js'],
		'order-payment': ['./src/page/order-payment/index.js'],
		'result': ['./src/page/result/index.js'],
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
				MiniCssExtractPlugin.loader, 'css-loader'
			]
		}, {
			test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
			loader: 'url-loader?limit=100&name=resource/[name].[ext]'
		}, {
			test: /\.string$/,
			use: 'html-loader'
		}, {
			test: /\.(js|jsx)?$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'env', 'react']
			}
		}]
	},
	//js代码抽离
	optimization: {
		//拆分模块
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
			filename: "css/[name].css"
		}),
		//html模块的处理
		new getHtmlCofig('index', '主页'),
		new getHtmlCofig('user-login', '用户登录'),
		new getHtmlCofig('user-register', '用户注册'),
		new getHtmlCofig('user-center', '个人中心'),
		new getHtmlCofig('user-center-update', '修改个人信息'),
		new getHtmlCofig('user-pwd-reset', '找回密码'),
		new getHtmlCofig('user-pwd-update', '修改密码'),
		new getHtmlCofig('product-detail', '商品详情'),
		new getHtmlCofig('product-list', '商品列表'),
		new getHtmlCofig('cart', '购物车'),
		new getHtmlCofig('about', '关于我们'),
		new getHtmlCofig('order-detail', '订单详情'),
		new getHtmlCofig('order-list', '订单列表'),
		new getHtmlCofig('order-confirm', '订单支付'),
		new getHtmlCofig('order-payment', '订单支付'),
		new getHtmlCofig('result', '操作结果'),
	]
}