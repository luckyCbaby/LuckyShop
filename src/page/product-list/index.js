/*
 * @Author: shijie
 * @Date:   2019-01-22 14:34:20
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-20 01:02:25
 */
require('./index.css');
require("page/common/nav/index.js");
require("page/common/header/index.js");
const Baby = require("util/baby.js");
const Product = require('service/product-service.js');
const Pagination = require('util/pagination/index.js');

const _baby = new Baby();
const _product = new Product();



const templateIndex = require('./index.string');

//逻辑部分
var page = {
	data: {
		listParam: {
			keyword: _baby.getUrlParam('keyword') || '',
			categoryId: _baby.getUrlParam('categoryId') || '',
			orderBy: _baby.getUrlParam('orderBy') || 'default',
			pageNum: _baby.getUrlParam('pageNum') || 1,
			pageSize: _baby.getUrlParam('pageSize') || 20
		}
	},
	init: function() {
		this.onload();
		this.bindEvent();
	},
	bindEvent: function() {
		//缓存this
		var _this = this;
		// 排序的点击事件
		_baby.eventBind(document, 'click', '.sort-item', function() {
			_this.data.listParam.pageNum = 1;
			// 点击默认排序
			if (this.dataset['type'] === 'default') {
				// 已经是active样式
				if (this.matches('.active')) {
					return;
				}
				// 其他
				else {
					this.className = 'sort-item active';
					document.querySelectorAll('.sort-item')[1].className = 'sort-item';
					_this.data.listParam.orderBy = 'default';
				}
			}
			//点击价格排序
			else if (this.dataset['type'] === 'price') {
				// active class 的处理
				document.querySelectorAll('.sort-item')[0].className = 'sort-item';
				// 升序、降序的处理
				if (!this.matches('.asc')) {
					this.className = 'sort-item active asc';
					_this.data.listParam.orderBy = 'price_asc';
				} else {
					this.className = 'sort-item active desc';
					_this.data.listParam.orderBy = 'price_desc';
					console.log('1')
				}
			}
			// 重新加载列表
			_this.loadList();
		});
	},
	onload: function() {
		this.loadList();
	},
	//加载list数据
	loadList: function() {
		var _this = this,
			listHtml = '',
			listParam = this.data.listParam,
			pListCon = document.querySelector('.p-list-con');
		pListCon.innerHTML = '<div class="loading"></div>';
		//         // 删除参数中不必要的字段
		listParam.categoryId ?
			(delete listParam.keyword) : (delete listParam.categoryId);
		//         // 请求接口
		_product.getProductList(listParam, function(res) {
			res.data.list.forEach(function(cur, index, arr) {
				cur['name'] = cur['name'].replace('【测试学习使用】', '');
			});
			listHtml = _baby.renderHtml(templateIndex, {
				list: res.data.list
			});
			pListCon.innerHTML = listHtml;
			_this.loadPagination({

				hasPreviousPage: res.data.hasPreviousPage,
				prePage: res.data.prePage,
				hasNextPage: res.data.hasNextPage,
				nextPage: res.data.nextPage,
				pageNum: res.data.pageNum,
				pages: res.data.pages

				// hasPreviousPage : res.data.hasPreviousPage,
				// prePage         : res.data.prePage,
				// hasNextPage     : res.data.hasNextPage,
				// nextPage        : res.data.nextPage,
				// pageNum         : res.data.pageNum,
				// pages           : res.data.pages

			});
		}, function(msg) {
			_baby.errorTips(msg);
		});
	},
	//加载分页信息
	loadPagination: function(pageNum, pages) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render(Object.assign({}, pageNum, {
			container: document.querySelector('.pagination'),
			onSelectPage: function(pageNum) {
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}
}
page.init();