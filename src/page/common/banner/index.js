/*
 * @Author: shijie
 * @Date:   2019-02-17 22:55:50
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-19 00:06:25
 */
require('./index.css');

let index = 0;
// 取出所有图片 得用querySelectorAll()
const imgs = document.querySelectorAll('.img');
//所有点的集合
const dots = document.querySelectorAll('#dot');
const len = imgs.length;
//无限轮播图实现
const page = {
	init: function() {
		this.bindEvent();
		this.showFirstImage();
	},
	//事件
	bindEvent: function() {
		const _this = this;
		//左侧按键绑定事件 向前
		const arrow_pre = document.querySelector("#pre");
		arrow_pre.addEventListener('click', () => {
			_this.showPreImage();
		})
		//右侧按键绑定事件 向后
		const arrow_next = document.querySelector('#next');
		arrow_next.addEventListener('click', () => {
			_this.showNextImage();
		});
		//给5个圆点绑定事件 采用事件委托方式将事件绑定在父元素上
		const btn = document.querySelector(".button");
		btn.addEventListener('click', (e) => {
			//取出标签属性  得到的是字符串
			const btnIndex = e.target.getAttribute('index');
			//将它赋值给index变量
			index = Number(btnIndex);
			_this.dotsImage();
		})
	},
	//向前滑动效果
	showPreImage: function() {
		//判断index 大于零递增，小于等于零取最后一张图片
		if (index <= 0) {
			index = len - 1;
		} else {
			index--;
		}
		//遍历图片
		for (let i = 0; i < imgs.length; i++) {
			// 显示index的张
			if (i === index) {
				imgs[i].style.display = "block";
			} else {
				imgs[i].style.display = "none";
			}
		}
		//遍历点
		for (let i = 0; i < dots.length; i++) {
			//显示index的那个点
			if (i === index) {
				dots[i].className = "on";
			} else {
				dots[i].className = "";
			}
		}
	},
	//向后滑动效果
	showNextImage: function() {
		//判断index index=4 即第五张时  取第一张 递减
		if (index >= len - 1) {
			index = 0
		} else {
			index++
		};
		//遍历图片
		for (let i = 0; i < imgs.length; i++) {
			if (i === index) {
				imgs[i].style.display = "block";
			} else {
				imgs[i].style.display = "none";
			}
		}
		//遍历点
		for (let i = 0; i < dots.length; i++) {
			if (i === index) {
				dots[i].className = "on";
			} else {
				dots[i].className = "";
			}
		}
	},
	//点击效果
	dotsImage: function() {

	},
	//打开时显示第一张图片
	showFirstImage: function() {
		for (let i = 0; i < imgs.length; i++) {
			imgs[i].style.display = "none";
		}
		imgs[index].style.display = "block";
	}
}


page.init();