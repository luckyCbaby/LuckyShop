/*
 * @Author: shijie
 * @Date:   2019-02-17 01:08:02
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-17 01:42:06
 */

class Ajax {
	ajax({
		url = '',
		type = 'get',
		asyn = true,
		data = {},
		dataType = 'json',
		success = function(res) {
			console.log(res)
		},
		error = function(err) {
			console.log(new Error('出错了:' + err))
		}
	}) {
		function getData(udata) {
			let arr = [];
			for (let i in udata) {
				arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(udata[i]));
			}
			return arr.join('&')
		};
		let xhr = null;
		let param = getData(data);
		//判断浏览器
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHttp')
		}
		//判断提交方式
		switch (type.toUpperCase()) {
			//如果是get方式提交
			case 'GET':
				xhr.open('GET', url + '?' + param, asyn);
				xhr.send(null);
				break;
				//如果的POST方式提交
			case 'POST':
				xhr.open('POST', url, asyn);
				//post方法必须setRequestHeader()
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				xhr.send(param);
				break;
		};

		//判断ajax是否完成响应
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) { //完成响应
				if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) { //成功处理响应
					typeof success === 'function' ? success(JSON.parse(xhr.responseText)) : console.log(new Error('success must be a function'))
				} else {
					typeof error === 'function' ? error(xhr.status) : console.log('error must be a function');
				}
			}
		}
	}
};



export default Ajax;