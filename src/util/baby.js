/*
 * @Author: shijie
 * @Date:   2019-01-21 22:14:34
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-20 00:26:04
 */
const $ = require('./ajax.js');
const Hogan = require('hogan.js');
const url = require('url'); //引入nodejs中的url模块
const querystring = require('querystring'); //引入nodejs中的querystring模块
class Baby {
	//将.string的hogan.js渲染成html
	renderHtml(htmlTemlate, data) {
		// Hogan.compile(模板参数).render(传入模板的数据)
		let template = Hogan.compile(htmlTemlate);
		//render函数会把相应的数据data传给 template模块中 以{{接收变量}}
		let result = template.render(data);
		return result;
	}
	//操作成功提示
	successTips(msg) {
		alert(msg || '操作成功！');
	}
	//错误提示
	errorTips(msg) {
		alert(msg || '好像哪里不对了~');
	}
	//获取url参数,把请求的参数变成对象 a=b&c=d
	getUrlParam(name) {
		//判断name是否在请求参数中
		let query = url.parse(window.location.href).query; //获取请求参数串
		let queryObject = querystring.parse(query); //将参数变成对象
		if (decodeURIComponent(queryObject[name]) === 'undefined') {
			return;
		}
		return decodeURIComponent(queryObject[name]);
	}
	//通用事件
	eventBind(elem, type, selected, fn) {
		if (fn == null) {
			fn = selected;
			selected = null;
		}

		elem.addEventListener(type, function(e) {
			var target;
			if (selected) {
				target = e.target;
				if (target.matches(selected)) {
					fn.call(target, e);
				}
			} else {
				fn.call(elem, e);
			}
		})
	}

}

module.exports = Baby;