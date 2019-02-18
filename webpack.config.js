/*
 * @Author: shijie
 * @Date:   2019-01-20 13:19:59
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-19 01:14:25
 */

// webpack3的配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// 环境变量, dev, (test), online
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//多页配置函数封装

function getHtmlCofig(name, title) {
	return (new HtmlWebpackPlugin({
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		favicon: './favicon.ico',
		title: title,
		chunks: ['common', name]
	}))
};


module.exports = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'user-login': ['./src/page/user-login/index.js'],
		'user-register': ['./src/page/user-register/index.js'],
		'user-center': ['./src/page/user-center/index.js'],
		'user-center-update': ['./src/page/user-center-update/index.js'],
		'user-pwd-reset': ['./src/page/user-pwd-reset/index.js'],
		'user-pwd-update': ['./src/page/user-pwd-update/index.js'],
		'product-detail': ['./src/page/product-detail/index.js'],
		'product-list': ['./src/page/product-list/index.js'],
		'cart': ['./src/page/cart/index.js'],
		'about': ['./src/page/about/index.js'],
		'order-detail': ['./src/page/order-detail/index.js'],
		'order-list': ['./src/page/order-list/index.js'],
		'order-confirm': ['./src/page/order-confirm/index.js'],
		'order-payment': ['./src/page/order-payment/index.js'],
		'result': ['./src/page/result/index.js'],


	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
		publicPath: '/dist/'

	},
	module: {
		rules: [
			//react语法处理
			{
				test: /\.js$/,
				exclude: /(node_modules)/, //这个目录下的文件不做处理
				use: {
					loader: 'babel-loader',
					options: {
						//env即environment，自动根据环境打包，不管是浏览器环境还是node环境
						presets: ['es2015', 'env', 'react']
					}
				}
			},
			//css文件处理
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},

			//图片及静态文件处理
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'resource/[name].[ext]' //指定图片打包路径，[ext]表示它是什么后缀导出什么后缀
					}
				}
			}, {
				test: /\.string$/,
				loader: "html-loader"
			}
		]
	},

	//配置webpack-dev-server
	devServer: {
		contentBase: '/dist',
		port: 8090,
		open: true, //执行webpack-dev-server自动打开浏览器
		//访问一个页面找不到会返回一个指定页面
		historyApiFallback: {
			index: '/dist/view/index.html'
		}
	},
	resolve: {
		//处理别名,
		alias: {
			//将绝对路径下的src/page取别名叫page
			page: path.resolve(__dirname, 'src/page'),
			view: path.resolve(__dirname, 'src/view'),
			util: path.resolve(__dirname, 'src/util'),
			service: path.resolve(__dirname, 'src/service'),
		}
	},
	plugins: [
		// 独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		//把css单独打包到文件里
		new ExtractTextWebpackPlugin("css/[name].css"),
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