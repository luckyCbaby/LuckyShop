/*
 * @Author: shijie
 * @Date:   2019-02-19 03:25:29
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-19 20:25:28
 */
const Baby = require('util/baby.js');
const Ajax = require('util/ajax.js');

const _baby = new Baby();
const $ = new Ajax();

class Product {
	//获取商品列表
	getProductList(listParam, resolve, reject) {
		$.ajax({
			url: '/product/list.do',
			type: 'post',
			data: listParam,
			success: resolve,
			error: reject
		});
	}
}


module.exports = Product;