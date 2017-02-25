/*!
 * 框架名称：AHelper.js
 * 框架作者：新生帝(JsonLei)
 * 编写日期：2015年12月01日
 * 版权所有：中山赢友网络科技有限公司
 * 企业官网：http://www.winu.net
 * 开源协议：GPL v2 License
 * 框架描述：APICloud操作库，一切从简，只为了更懒！
 * 讨论群区：一起改变中国IT教育 18863883
 * 文档地址：http://www.kancloud.cn/winu/ahelper
 * 开源地址：http://git.oschina.net/winu.net/AHelper.js
 */

;! function(win) {"use strict";

	// 全局模块
	var modules = {};

	// 公共类库
	var $$com = {
		// 去掉前后空格
		// @str：字符串
		trim : function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, '');
		},
		// 判断是否为null，或者为空
		// @str：字符串
		isNullOrEmpty : function(str) {
			return (str == null || str == undefined || $$com.trim(str) == "") ? true : false;
		},
		// 判断是否为null，或者undefined
		// @str：字符串
		isNullOrUndefined : function(str) {
			return (str == null || str == undefined) ? true : false;
		},
		// 拓展对象
		// @baseObj：需要拓展的对象
		// @extObj：需要拓展的属性集合
		extend : function(baseObj, extObj) {
			var inheritObj = baseObj;
			for (var i in extObj) {
				inheritObj[i] = extObj[i];
			}
			return inheritObj;
		},
		// 获取文件拓展名
		// @fileName：文件名
		getFileExt : function(fileName) {
			return fileName.substring(fileName.lastIndexOf('.') + 1);
		},
		// 滚动到文档底部
		scrollToDocButton : function() {
			document.getElementsByTagName('body')[0].scrollTop = document.getElementsByTagName('body')[0].scrollHeight;
		},
		// 根据出生日期获取年龄
		// @birthday：出生日期
		getAgeForBirthDay : function(birthday) {
			var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
			if (r == null)
				return false;
			var d = new Date(r[1], r[3] - 1, r[4]);
			if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
				var Y = new Date().getFullYear();
				return (Y - r[1]);
			}
			return 0;
		},
		// 判断是否是数值
		// @str：字符串
		isNumber : function(str) {
			return !isNaN(str);
		},
		// 判断是否是正小数
		// @str：字符串
		isPlusDecimal : function(str) {
			return (/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/).test(str);
		},
		// 判断是否是日期格式
		// @str：字符串
		isDate : function(str) {
			return (/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/).text(str);
		},
		// 获取当前时间并格式化
		// @dateSeparator：日期分隔符
		// @timeSeparator：时间分隔符
		// @isShowTime：是否显示时间
		// @datetime：自定义日期格式
		getNowDateFormat : function(dateSeparator, timeSeparator, isShowTime, datetime) {
			dateSeparator = $$com.isNullOrEmpty(dateSeparator) ? "-" : dateSeparator;
			timeSeparator = $$com.isNullOrEmpty(timeSeparator) ? ":" : timeSeparator;
			isShowTime = ( typeof arguments[2] != 'boolean') ? true : arguments[2];

			var now = datetime ? datetime : new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			var hours = now.getHours();
			var minutes = now.getMinutes();
			var seconds = now.getSeconds();

			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (date >= 0 && date <= 9) {
				date = "0" + date;
			}
			var _date = year + dateSeparator + month + dateSeparator + date;
			var _time = hours + timeSeparator + minutes + timeSeparator + seconds;

			return isShowTime ? (_date + " " + _time) : _date;
		},
		// 将PHP时间戳转换为时间格式
		// @timestamp：PHP格式时间戳
		// @isShowTime：是否显示时间
		transPHPTimestamp : function(timestamp, isShowTime) {
			isShowTime = ( typeof arguments[1] != 'boolean') ? true : arguments[1];
			var datetime = new Date(timestamp * 1000);
			$$com.getNowDateFormat('-', ':', isShowTime, datetime);
		},
		// 将Javascript时间戳转换为时间格式
		// @timestamp：时间戳
		// @isShowTime：是否显示时间
		transJsTimestamp : function(timestamp, isShowTime) {
			isShowTime = ( typeof arguments[1] != 'boolean') ? true : arguments[1];
			var datetime = new Date(timestamp);
			$$com.getNowDateFormat('-', ':', isShowTime, datetime);
		},
		// 判断是否是方法
		// @func：方法句柄
		isFunction : function(func) {
			return ( typeof func == "function");
		},
		// 判断是否是json对象
		// @obj：对象
		isObject : function(obj) {
			return ( typeof obj == "object" && obj != null && obj != undefined);
		},
		// 判断是否是数组
		// @arr：数组对象
		isArray : function(arr) {
			return toString.apply(arr) === '[object Array]';
		},
		// 生成唯一字符串
		newGuid : function() {
			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}

			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		},
		// 去除数组从重复项
		// @arr：数组对象
		unique : function(arr) {
			if (!$$com.isArray(arr)) {
				return arr;
			}
			var result = [], hash = {};
			for (var i = 0, elem; ( elem = arr[i]) != null; i++) {
				if (!hash[elem]) {
					result.push(elem);
					hash[elem] = true;
				}
			}
			return result;
		}
	};
	// ######################################## 完美分割线 #############################################
	// APICloud 自带api.js
	(function(window) {
		var u = {};

		// 判断是否是安卓平台
		var isAndroid = (/android/gi).test(navigator.appVersion);

		// 设置本地存储
		var uzStorage = function() {
			var ls = window.localStorage;
			if (isAndroid) {
				ls = os.localStorage();
			}
			return ls;
		};
		// 初始化api.ajax参数
		// @url：url地址
		// @data：数据
		// @fuSuc：执行成功回调函数
		// @dataType：回调函数返回格式
		function parseArguments(url, data, fnSuc, dataType) {
			if ( typeof (data) == 'function') {
				dataType = fnSuc;
				fnSuc = data;
				data = undefined;
			}
			if ( typeof (fnSuc) != 'function') {
				dataType = fnSuc;
				fnSuc = undefined;
			}
			return {
				url : url,
				data : data,
				fnSuc : fnSuc,
				dataType : dataType
			};
		}

		// 去掉字符串首尾空格
		// @str：字符串
		u.trim = function(str) {
			if (String.prototype.trim) {
				return str == null ? "" : String.prototype.trim.call(str);
			} else {
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}
		};
		// 去掉字符串所有空格
		// @str：字符串
		u.trimAll = function(str) {
			return str.replace(/\s*/g, '');
		};
		// 判断对象是否是一个元素
		// @obj：对象
		u.isElement = function(obj) {
			return !!(obj && obj.nodeType == 1);
		};
		// 判断对象是否是数组
		// @obj：对象
		u.isArray = function(obj) {
			if (Array.isArray) {
				return Array.isArray(obj);
			} else {
				return obj instanceof Array;
			}
		};
		// 判断对象是否是空对象
		// @obj：对象
		u.isEmptyObject = function(obj) {
			if (JSON.stringify(obj) === '{}') {
				return true;
			}
			return false;
		};
		// 为DOM元素绑定事件
		// @el：DOM元素
		// @name：事件名称
		// @fn：事件处理函数
		// @useCapture：是否捕获事件
		u.addEvt = function(el, name, fn, useCapture) {
			if (!u.isElement(el)) {
				console.warn('$api.addEvt Function need el param, el param must be DOM Element');
				return;
			}
			useCapture = useCapture || false;
			if (el.addEventListener) {
				el.addEventListener(name, fn, useCapture);
			}
		};
		// 为DOM元素移除事件
		// @el：DOM元素
		// @name：事件名称
		// @fn：事件处理函数
		// @useCapture：是否捕获事件
		u.rmEvt = function(el, name, fn, useCapture) {
			if (!u.isElement(el)) {
				console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
				return;
			}
			useCapture = useCapture || false;
			if (el.removeEventListener) {
				el.removeEventListener(name, fn, useCapture);
			}
		};
		// 为DOM绑定事件，但该事件只执行一次
		// @el：DOM元素
		// @name：事件名称
		// @fn：事件处理函数
		// @useCapture：是否捕获事件
		u.one = function(el, name, fn, useCapture) {
			if (!u.isElement(el)) {
				console.warn('$api.one Function need el param, el param must be DOM Element');
				return;
			}
			useCapture = useCapture || false;
			var that = this;
			var cb = function() {
				fn && fn();
				that.rmEvt(el, name, cb, useCapture);
			};
			that.addEvt(el, name, cb, useCapture);
		};
		// 选择第一个匹配的DOM元素
		// @el：DOM元素
		// @selector：CSS选择器
		u.dom = function(el, selector) {
			if (arguments.length === 1 && typeof arguments[0] == 'string') {
				if (document.querySelector) {
					return document.querySelector(arguments[0]);
				}
			} else if (arguments.length === 2) {
				if (el.querySelector) {
					return el.querySelector(selector);
				}
			}
		};
		// 选择所有匹配的DOM元素
		// @el：DOM元素
		// @selector：CSS选择器
		u.domAll = function(el, selector) {
			if (arguments.length === 1 && typeof arguments[0] == 'string') {
				if (document.querySelectorAll) {
					return document.querySelectorAll(arguments[0]);
				}
			} else if (arguments.length === 2) {
				if (el.querySelectorAll) {
					return el.querySelectorAll(selector);
				}
			}
		};
		// 根据ID选择DOM元素
		// @id：ID
		u.byId = function(id) {
			return document.getElementById(id);
		};
		// 选择DOM元素的第一个子元素
		// @el：DOM元素
		// @selector：CSS选择器
		u.first = function(el, selector) {
			if (arguments.length === 1) {
				if (!u.isElement(el)) {
					console.warn('$api.first Function need el param, el param must be DOM Element');
					return;
				}
				return el.children[0];
			}
			if (arguments.length === 2) {
				return this.dom(el, selector + ':first-child');
			}
		};
		// 选择DOM元素最后一个子元素
		// @el：DOM元素
		// @selector：CSS选择器
		u.last = function(el, selector) {
			if (arguments.length === 1) {
				if (!u.isElement(el)) {
					console.warn('$api.last Function need el param, el param must be DOM Element');
					return;
				}
				var children = el.children;
				return children[children.length - 1];
			}
			if (arguments.length === 2) {
				return this.dom(el, selector + ':last-child');
			}
		};
		// 选择第几个元素
		// @el：DOM元素
		// @index：索引
		u.eq = function(el, index) {
			return this.dom(el, ':nth-child(' + index + ')');
		};
		// 排除选择器中指定元素的子元素
		// @el：DOM元素
		// @selector：CSS选择器
		u.not = function(el, selector) {
			return this.domAll(el, ':not(' + selector + ')');
		};
		// 获取相邻的上一个兄弟元素
		// @el：DOM元素
		u.prev = function(el) {
			if (!u.isElement(el)) {
				console.warn('$api.prev Function need el param, el param must be DOM Element');
				return;
			}
			var node = el.previousSibling;
			if (node.nodeType && node.nodeType === 3) {
				node = node.previousSibling;
				return node;
			}
		};
		// 获取相邻的下一个兄弟元素
		// @el：DOM元素
		u.next = function(el) {
			if (!u.isElement(el)) {
				console.warn('$api.next Function need el param, el param must be DOM Element');
				return;
			}
			var node = el.nextSibling;
			if (node.nodeType && node.nodeType === 3) {
				node = node.nextSibling;
				return node;
			}
		};
		// 根据选择器匹配最近的父元素
		// @el：DOM元素
		// @selector：CSS选择器
		u.closest = function(el, selector) {
			if (!u.isElement(el)) {
				console.warn('$api.closest Function need el param, el param must be DOM Element');
				return;
			}
			var doms, targetDom;
			var isSame = function(doms, el) {
				var i = 0, len = doms.length;
				for (i; i < len; i++) {
					if (doms[i].isEqualNode(el)) {
						return doms[i];
					}
				}
				return false;
			};
			var traversal = function(el, selector) {
				doms = u.domAll(el.parentNode, selector);
				targetDom = isSame(doms, el);
				while (!targetDom) {
					el = el.parentNode;
					if (el != null && el.nodeType == el.DOCUMENT_NODE) {
						return false;
					}
					traversal(el, selector);
				}

				return targetDom;
			};

			return traversal(el, selector);
		};
		// 判断某一个元素是否包含目标元素
		// @parent：判断某一个元素是否包含目标元素
		// @el：DOM元素
		u.contains = function(parent, el) {
			var mark = false;
			if (el === parent) {
				mark = true;
				return mark;
			} else {
				do {
					el = el.parentNode;
					if (el === parent) {
						mark = true;
						return mark;
					}
				} while (el === document.body || el === document.documentElement);

				return mark;
			}

		};
		// 移除DOM元素
		// @el：DOM元素
		u.remove = function(el) {
			if (el && el.parentNode) {
				el.parentNode.removeChild(el);
			}
		};
		// 获取或设置DOM元素的属性
		// @el：DOM元素
		// @name：属性名
		// @value：属性值
		u.attr = function(el, name, value) {
			if (!u.isElement(el)) {
				console.warn('$api.attr Function need el param, el param must be DOM Element');
				return;
			}
			if (arguments.length == 2) {
				return el.getAttribute(name);
			} else if (arguments.length == 3) {
				el.setAttribute(name, value);
				return el;
			}
		};
		// 移除DOM元素的属性
		// @el：DOM元素
		// @name：属性名
		u.removeAttr = function(el, name) {
			if (!u.isElement(el)) {
				console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
				return;
			}
			if (arguments.length === 2) {
				el.removeAttribute(name);
			}
		};
		// DOM元素是否含有某个className
		// @el：DOM元素
		// @cls：class名
		u.hasCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn('$api.hasCls Function need el param, el param must be DOM Element');
				return;
			}
			if (el.className.indexOf(cls) > -1) {
				return true;
			} else {
				return false;
			}
		};
		// 为DOM元素增加className
		// @el：DOM元素
		// @cls：class名
		u.addCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn('$api.addCls Function need el param, el param must be DOM Element');
				return;
			}
			if ('classList' in el) {
				el.classList.add(cls);
			} else {
				var preCls = el.className;
				var newCls = preCls + ' ' + cls;
				el.className = newCls;
			}
			return el;
		};
		// 移除指定的className
		// @el：DOM元素
		// @cls：class名
		u.removeCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn('$api.removeCls Function need el param, el param must be DOM Element');
				return;
			}
			if ('classList' in el) {
				el.classList.remove(cls);
			} else {
				var preCls = el.className;
				var newCls = preCls.replace(cls, '');
				el.className = newCls;
			}
			return el;
		};
		// 切换指定的className
		// @el：DOM元素
		// @cls：class名
		u.toggleCls = function(el, cls) {
			if (!u.isElement(el)) {
				console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
				return;
			}
			if ('classList' in el) {
				el.classList.toggle(cls);
			} else {
				if (u.hasCls(el, cls)) {
					u.removeCls(el, cls);
				} else {
					u.addCls(el, cls);
				}
			}
			return el;
		};
		// 获取或设置常用 Form 表单元素的 value 值
		// @el：DOM元素
		// @val：想设置的value值
		u.val = function(el, val) {
			if (!u.isElement(el)) {
				console.warn('$api.val Function need el param, el param must be DOM Element');
				return;
			}
			if (arguments.length === 1) {
				switch (el.tagName) {
					case 'SELECT':
						var value = el.options[el.selectedIndex].value;
						return value;
						break;
					case 'INPUT':
						return el.value;
						break;
					case 'TEXTAREA':
						return el.value;
						break;
				}
			}
			if (arguments.length === 2) {
				switch (el.tagName) {
					case 'SELECT':
						el.options[el.selectedIndex].value = val;
						return el;
						break;
					case 'INPUT':
						el.value = val;
						return el;
						break;
					case 'TEXTAREA':
						el.value = val;
						return el;
						break;
				}
			}

		};
		// 在DOM元素内部，首个子元素前插入HTML字符串
		// @el：DOM元素
		// @html：HTML字符串
		u.prepend = function(el, html) {
			if (!u.isElement(el)) {
				console.warn('$api.prepend Function need el param, el param must be DOM Element');
				return;
			}
			el.insertAdjacentHTML('afterbegin', html);
			return el;
		};
		// 在DOM元素内部，最后一个子元素后面插入HTML字符串
		// @el：DOM元素
		// @html：HTML字符串
		u.append = function(el, html) {
			if (!u.isElement(el)) {
				console.warn('$api.append Function need el param, el param must be DOM Element');
				return;
			}
			el.insertAdjacentHTML('beforeend', html);
			return el;
		};
		// 在DOM元素前面插入HTML字符串
		// @el：DOM元素
		// @html：HTML字符串
		u.before = function(el, html) {
			if (!u.isElement(el)) {
				console.warn('$api.before Function need el param, el param must be DOM Element');
				return;
			}
			el.insertAdjacentHTML('beforebegin', html);
			return el;
		};
		// 在DOM元素后面插入HTML字符串
		// @el：DOM元素
		// @html：HTML字符串
		u.after = function(el, html) {
			if (!u.isElement(el)) {
				console.warn('$api.after Function need el param, el param must be DOM Element');
				return;
			}
			el.insertAdjacentHTML('afterend', html);
			return el;
		};
		// 获取或设置DOM元素的innerHTML
		// @el：DOM元素
		// @html：HTML字符串
		u.html = function(el, html) {
			if (!u.isElement(el)) {
				console.warn('$api.html Function need el param, el param must be DOM Element');
				return;
			}
			if (arguments.length === 1) {
				return el.innerHTML;
			} else if (arguments.length === 2) {
				el.innerHTML = html;
				return el;
			}
		};
		// 设置或者获取元素的文本内容
		// @el：DOM元素
		// @txt：文本内容
		u.text = function(el, txt) {
			if (!u.isElement(el)) {
				console.warn('$api.text Function need el param, el param must be DOM Element');
				return;
			}
			if (arguments.length === 1) {
				return el.textContent;
			} else if (arguments.length === 2) {
				el.textContent = txt;
				return el;
			}
		};
		// 获取元素在页面中的位置与宽高，(此为距离页面左侧及顶端的位置，并非距离窗口的位置)
		// @el：DOM元素
		u.offset = function(el) {
			if (!u.isElement(el)) {
				console.warn('$api.offset Function need el param, el param must be DOM Element');
				return;
			}
			var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

			var rect = el.getBoundingClientRect();
			return {
				l : rect.left + sl,
				t : rect.top + st,
				w : el.offsetWidth,
				h : el.offsetHeight
			};
		};
		// 设置所传入的DOM元素的样式，可传入多条样式
		// @el：DOM元素
		// @css：想要设置的CSS样式
		u.css = function(el, css) {
			if (!u.isElement(el)) {
				console.warn('$api.css Function need el param, el param must be DOM Element');
				return;
			}
			if ( typeof css == 'string' && css.indexOf(':') > 0) {
				el.style && (el.style.cssText += ';' + css);
			}
		};
		// 获取指定DOM元素的指定属性的完整的值，如800px
		// @el：DOM元素
		// @prop：css属性
		u.cssVal = function(el, prop) {
			if (!u.isElement(el)) {
				console.warn('$api.cssVal Function need el param, el param must be DOM Element');
				return;
			}
			if (arguments.length === 2) {
				var computedStyle = window.getComputedStyle(el, null);
				return computedStyle.getPropertyValue(prop);
			}
		};
		// json对象转字符串
		// @json：json对象
		u.jsonToStr = function(json) {
			if ( typeof json === 'object') {
				return JSON && JSON.stringify(json);
			}
		};
		// 字符串转json对象
		// @str：字符串
		u.strToJson = function(str) {
			if ( typeof str === 'string') {
				return JSON && JSON.parse(str);
			}
		};
		// 设置localStorage数据
		// @key：键
		// @value：值
		u.setStorage = function(key, value) {
			if (arguments.length === 2) {
				var v = value;
				if ( typeof v == 'object') {
					v = JSON.stringify(v);
					v = 'obj-' + v;
				} else {
					v = 'str-' + v;
				}
				var ls = uzStorage();
				if (ls) {
					ls.setItem(key, v);
				}
			}
		};
		// 获取localStorage数据
		// @key：键
		u.getStorage = function(key) {
			var ls = uzStorage();
			if (ls) {
				var v = ls.getItem(key);
				if (!v) {
					return;
				}
				if (v.indexOf('obj-') === 0) {
					v = v.slice(4);
					return JSON.parse(v);
				} else if (v.indexOf('str-') === 0) {
					return v.slice(4);
				}
			}
		};
		// 移除localStorage数据
		// @key：键
		u.rmStorage = function(key) {
			var ls = uzStorage();
			if (ls && key) {
				ls.removeItem(key);
			}
		};
		// 清空所有localStorage数据
		// @key：键
		u.clearStorage = function() {
			var ls = uzStorage();
			if (ls) {
				ls.clear();
			}
		};
		// 适配iOS7+系统状态栏，为传入的DOM元素增加20px的上内边距
		// @el：DOM元素
		u.fixIos7Bar = function(el) {
			if (!u.isElement(el)) {
				console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
				return;
			}
			var strDM = api.systemType;
			if (strDM == 'ios') {
				var strSV = api.systemVersion;
				var numSV = parseInt(strSV, 10);
				var fullScreen = api.fullScreen;
				var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
				if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
					el.style.paddingTop = '20px';
				}
			}
		};
		// 适配iOS7+、Android4.4+系统状态栏，为传入的DOM元素增加适当的上内边距，避免header与状态栏重叠
		// @el：DOM元素
		u.fixStatusBar = function(el) {
			if (!u.isElement(el)) {
				console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
				return;
			}
			var sysType = api.systemType;
			if (sysType == 'ios') {
				u.fixIos7Bar(el);
			} else if (sysType == 'android') {
				var ver = api.systemVersion;
				ver = parseFloat(ver);
				if (ver >= 4.4) {
					el.style.paddingTop = '25px';
				}
			}
		};
		// 延时提示框
		// @title：标题
		// @text：内容
		// @time：延迟时间
		u.toast = function(title, text, time) {
			var opts = {};
			var show = function(opts, time) {
				api.showProgress(opts);
				setTimeout(function() {
					api.hideProgress();
				}, time);
			};
			if (arguments.length === 1) {
				var time = time || 500;
				if ( typeof title === 'number') {
					time = title;
				} else {
					opts.title = title + '';
				}
				show(opts, time);
			} else if (arguments.length === 2) {
				var time = time || 500;
				var text = text;
				if ( typeof text === "number") {
					var tmp = text;
					time = tmp;
					text = null;
				}
				if (title) {
					opts.title = title;
				}
				if (text) {
					opts.text = text;
				}
				show(opts, time);
			}
			if (title) {
				opts.title = title;
			}
			if (text) {
				opts.text = text;
			}
			time = time || 500;
			show(opts, time);
		};
		// api.ajax()方法的post方式简写
		u.post = function(/*url,data,fnSuc,dataType*/) {
			var argsToJson = parseArguments.apply(null, arguments);
			var json = {};
			var fnSuc = argsToJson.fnSuc;
			argsToJson.url && (json.url = argsToJson.url);
			argsToJson.data && (json.data = argsToJson.data);
			if (argsToJson.dataType) {
				var type = argsToJson.dataType.toLowerCase();
				if (type == 'text' || type == 'json') {
					json.dataType = type;
				}
			} else {
				json.dataType = 'json';
			}
			json.method = 'post';
			api.ajax(json, function(ret, err) {
				if (ret) {
					fnSuc && fnSuc(ret);
				}
			});
		};
		// api.ajax()方法的get方式简写
		u.get = function(/*url,fnSuc,dataType*/) {
			var argsToJson = parseArguments.apply(null, arguments);
			var json = {};
			var fnSuc = argsToJson.fnSuc;
			argsToJson.url && (json.url = argsToJson.url);
			//argsToJson.data && (json.data = argsToJson.data);
			if (argsToJson.dataType) {
				var type = argsToJson.dataType.toLowerCase();
				if (type == 'text' || type == 'json') {
					json.dataType = type;
				}
			} else {
				json.dataType = 'text';
			}
			json.method = 'get';
			api.ajax(json, function(ret, err) {
				if (ret) {
					fnSuc && fnSuc(ret);
				}
			});
		};
		/*end*/
		window.$$api = u;
	})(win);

	// ######################################## 完美分割线 #############################################
	// APICloud 默认配置对象
	var defaultsOption = {
		alert : {
			title : '点点例',
			msg : '',
			buttons : ['确定']
		},
		confirm : {
			title : '点点例',
			msg : '选择您要的操作类型',
			buttons : ['确定', '取消']
		},
		prompt : {
			title : '点点例',
			msg : '请输入内容后点击确定按钮',
			text : '',
			type : 'text',
			buttons : ['确定', '取消']
		},
		actionSheet : {
			title : '选择您要的操作类型',
			cancelTitle : '取 消',
			//destructiveTitle : '删 除',
			buttons : ['按钮一', '按钮二', '按钮三'],
			style : {
				layerColor : 'rgba(0,0,0,0.4)',
				itemNormalColor : '#F1F1F1',
				itemPressColor : '#E6E6E6',
				fontNormalColor : '#007AFF',
				fontPressColor : '#0060F0',
				titleFontColor : '#8F8F8F'
			}
		},
		showProgress : {
			style : 'default',
			animationType : 'zoom',
			title : '努力加载中...',
			text : '先喝杯茶...',
			modal : true
		},
		toast : {
			msg : '点点例',
			duration : 4000,
			location : 'bottom'
		},
		setRefreshHeaderInfo : {
			visible : true,
			loadingImg : 'widget://image/refresh.png',
			bgColor : '#f1f1f1',
			textColor : '#999',
			textDown : '下拉刷新...',
			textUp : '松开刷新...',
			textTime : '最后更新：' + $$com.getNowDateFormat(),
			textLoading : '加载中...',
			showTime : true
		},
		getPicture : {
			sourceType : 'album',
			encodingType : 'jpg',
			mediaValue : 'pic',
			destinationType : 'url',
			allowEdit : true,
			quality : 80,
			saveToPhotoAlbum : false
		},
		openWin : {
			name : $$com.newGuid(),
			url : '',
			pageParam : {},
			bounces : false,
			bgColor : 'rgba(0,0,0,0)',
			scrollToTop : true,
			vScrollBarEnabled : false,
			hScrollBarEnabled : false,
			scaleEnabled : false,
			slidBackEnabled : false,
			animation : {
				type : "movein",
				subType : "from_right",
				duration : 300
			},
			delay : 300,
			showProgress : true,
			reload : false,
			allowEdit : true,
			softInputMode : 'auto'
		},
		closeWin : {
			animation : {
				type : "movein",
				subType : "from_left",
				duration : 300
			}
		},
		closeToWin : {
			name : 'root',
			animation : {
				type : "movein",
				subType : "from_left",
				duration : 300
			}
		},
		openFrame : {
			name : $$com.newGuid(),
			url : '',
			pageParam : {},
			bounces : false,
			bgColor : 'rgba(0,0,0,0)',
			scrollToTop : true,
			vScrollBarEnabled : false,
			hScrollBarEnabled : false,
			scaleEnabled : false,
			showProgress : false,
			reload : false,
			allowEdit : true,
			softInputMode : 'auto',
			rect : {
				x : 0,
				y : 0,
				w : 0,
				h : 0,
				marginLeft : 0,
				marginTop : 0,
				marginBottom : 0,
				marginRight : 0
			}
		},
		ajax : {
			url : '',
			tag : $$com.newGuid(),
			method : 'get',
			cache : false,
			timeout : 30,
			dataType : 'json',
			charset : 'utf-8',
			headers : {},
			report : false,
			returnAll : false,
			data : {}
		},
		execScript : {
			name : 'root',
			frameName : $$com.newGuid(),
			script : 'function ______winu(){}();'
		},
		openFrameGroup : {
			name : $$com.newGuid(),
			url : '',
			background : '#fff',
			scrollEnabled : true,
			rect : {
				x : 0,
				y : 0,
				w : 0,
				h : 0,
				marginLeft : 0,
				marginTop : 0,
				marginBottom : 0,
				marginRight : 0
			},
			index : 0,
			preload : 1,
			frames : []
		},
		setFrameGroupIndex : {
			name : $$com.newGuid(),
			index : 0,
			scroll : true
		},
		openSlidLayout : {
			type : 'left',
			leftEdge : 80,
			slidPaneStyle : {
				leftEdge : 80,
				leftScale : 1.0
			},
			fixedPane : {}, // 左边菜单frame
			slidPane : {}	// 主要内容frame
		},
		openApp : {
			appParam : {
				paras : ''
			},
			iosUrl : 'http://www.winu.net/',
			androidPkg : 'android.intent.action.VIEW',
			mimeType : 'text/html',
			uri : 'http://www.winu.net'
		},
		imageCache : {
			url : '',
			policy : 'default',
			thumbnail : true
		},
		download : {
			url : 'http://www.winu.net/a.jpg',
			savePath : '',
			report : true,
			cache : true,
			allowResume : true
		},
		notification : {
			vibrate : [500, 500],
			sound : 'default',
			light : false,
			notify : {
				updateCurrent : true,
				extra : ''
			}
		},
		call : {
			type : 'tel_prompt',
			number : '18676265646'
		},
		sms : {
			numbers : ['18676265646'],
			text : '大家好，我叫新生帝。'
		},
		mail : {
			recipients : ['winu@winu.net'], // 收件人
			subject : '我给您发送了一个邮件',
			body : '你好，我叫新生帝。',
			attachments : [],	// 附件
		},
		openPicker : {
			type : 'date_time',
			title : '选择时间'
		}
	};

	// ######################################## 完美分割线 #############################################

	// APICloud类库
	var $$apicloud = {

		// 打开Window窗口
		// @options：配置对象
		// @isInit：标识是否已经初始化
		openWin : function(options, isInit) {
			isInit = typeof isInit == 'boolean' ? isInit : false;
			if (!isInit) {
				// 拓展对象
				defaultsOption.openWin.pageParam = api.pageParam;
				defaultsOption.openWin.delay = $$apicloud.isIOS() ? 0 : 300;
			}
			var o = options || {};
			o = $$com.extend(defaultsOption.openWin, o);

			api.openWin(o);
		},
		// 快速创建并打开Window（默认全屏）
		// @winName：window名称
		// @winUrl：window地址
		// @pageParam：参数
		$openWin : function(winName, winUrl, pageParam) {
			pageParam = pageParam ? pageParam : api.pageParam;
			$$apicloud.openWin({
				name : winName,
				url : winUrl,
				pageParam : pageParam
			});
		},
		// 关闭window窗口
		// @callback：回调函数
		// @options：配置对象
		closeWin : function(options) {
			if (options) {
				// 拓展对象
				var o = options || {};
				o = $$com.extend(defaultsOption.closeWin, o);
				api.closeWin(o);
			} else {
				api.closeWin();
			}
		},
		// 快速关闭当前window
		$closeCurrentWin : function() {
			api.closeWin();
		},
		// 关闭当前window，并打开指定窗口。
		// @options：配置对象，可以是字符串或者对象
		closeToWin : function(options) {
			var o = defaultsOption.closeToWin;
			if ( typeof options == 'string') {
				o.name = options;
			} else {
				// 拓展对象
				o = options || {};
				o = $$com.extend(defaultsOption.closeToWin, o);
			}

			api.closeToWin(o);
		},
		// 快速关闭当前window，并打开指定窗口。
		// @winName：需要关闭并打开的窗口名称
		$closeCurrentToWin : function(winName) {
			winName = winName ? winName : 'root';

			// 只有当前窗口不等于传入窗口名称才关闭
			if (api.winName != winName) {
				$$apicloud.closeToWin(winName);
			}
		},
		// 设置window属性
		// @options：配置对象
		setWinAttr : function(options) {
			// 拓展对象
			var o = options || {};
			api.setWinAttr(o);
		},
		// 快速设置状态栏
		// @callback：回调函数，并返回头部值
		// @headerId：导航栏Id
		$fixStatusBar : function(callback, headerId) {
			var header = $$api.byId(headerId);
			if (header) {
				var systemType = api.systemType;
				var systemVersion = parseFloat(api.systemVersion);
				if ($$apicloud.isIOS()) {
					$$api.fixIos7Bar(header);
				} else if (systemType == 'android') {
					if (systemVersion >= 4.4) {
						header.style.paddingTop = '25px';
					}
				}

				if ($$com.isFunction(callback)) {
					var offset = $$apicloud.offset(headerId);
					callback(offset);
				}
			} else {
				console.wran('传入导航ID有误');
			}
		},
		// 打开Frame窗口
		// @options：配置对象
		// @isInit：标识是否已经完成初始化
		openFrame : function(options, isInit) {
			isInit = typeof isInit == 'boolean' ? isInit : false;
			if (!isInit) {
				// 拓展对象
				defaultsOption.openFrame.pageParam = api.pageParam;
				defaultsOption.openFrame.rect.w = api.winWidth;
				defaultsOption.openFrame.rect.h = api.winHeight;
			}
			var o = options || {};
			o = $$com.extend(defaultsOption.openFrame, o);
			o.rect = $$com.extend(o.rect, options.rect || {});

			api.openFrame(o);
		},
		// 快速创建并打开Frame对象(不带导航，默认和window一样大小)
		// @frameName：frame名称
		// @frameUrl：frame地址
		// @pageParam：参数
		// @rect：区域
		$openFrame : function(frameName, frameUrl, pageParam, rect, bounces) {
			bounces = typeof bounces == "boolean" ? bounces : false;
			pageParam = pageParam ? pageParam : api.pageParam;

			$$apicloud.openFrame({
				name : frameName,
				url : frameUrl,
				pageParam : pageParam,
				rect : rect,
				bounces : bounces
			});
		},
		// 快速创建并打开Frame对象(带导航)
		// @headerId：导航选择器ID
		// @options：配置对象
		// @footerId：底部选择器ID
		$openFrameWithNav : function(headerId, options, footerId) {
			$$apicloud.$fixStatusBar(function(offset) {
				var o = options || {};
				o = $$com.extend(defaultsOption.openFrame, o);

				var footerOffset = $$apicloud.offset(footerId);
				if (!options.rect) {
					o.rect.x = offset.l;
					o.rect.h = api.winHeight - offset.h - footerOffset.h;
					o.rect.w = api.winWidth;
				}
				o.rect.y = offset.h;
				$$apicloud.openFrame(o, true);
			}, headerId);
		},
		// 关闭Frame
		// @frameName：窗体名称
		closeFrame : function(frameName) {
			api.closeFrame({
				name : frameName ? frameName : api.frameName
			});
		},
		// 快速关闭当前Frame
		$closeCurrentFrame : function() {
			$$apicloud.closeFrame(api.frameName);
		},
		// 设置Frame属性
		// @options：配置对象
		setFrameAttr : function(options) {
			// 拓展对象
			var o = options || {};
			api.setFrameAttr(o);
		},
		// 设置窗体显示隐藏状态
		// @frameName：框架名称
		// @isHidden：是否隐藏
		setFrameStatus : function(frameName, isHidden) {
			isHidden = ( typeof arguments[1] != 'boolean') ? false : arguments[1];
			$$apicloud.setFrameAttr({
				name : frameName,
				hidden : isHidden
			});
		},
		// 快速设置窗体显示隐藏状态
		// @frameName：框架名称
		// @isHidden：是否隐藏
		$setFrameStatus : function(frameName, isHidden) {
			$$apicloud.setFrameStatus(frameName, isHidden);
		},
		// 打开FrameGroup窗口组
		// @callback：回调函数
		// @options：配置对象
		// @isInit：标识是否已经初始化
		openFrameGroup : function(callback, options, isInit) {
			isInit = typeof isInit == 'boolean' ? isInit : false;
			if (!isInit) {
				// 拓展对象
				defaultsOption.openFrameGroup.rect.w = api.winWidth;
				defaultsOption.openFrameGroup.rect.h = api.winHeight;
			}

			var o = options || {};
			o = $$com.extend(defaultsOption.openFrameGroup, o);
			o.rect = $$com.extend(o.rect, options.rect || {});

			if (o && o.frames && o.frames.length > 0) {
				// 设置默认参数
				defaultsOption.openFrame.pageParam = api.pageParam;

				for (var i = 0; i < o.frames.length; i++) {
					var frame = (o.frames)[i];
					frame = $$com.extend(defaultsOption.openFrame, frame);
					frame = $$apicloud.returnNewMemoryObj(frame);
					// 移除rect属性
					delete frame['rect'];
					// 避免内存地址分配问题
					o.frames[i] = frame;
				}

				api.openFrameGroup(o, function(ret, err) {
					if ($$com.isFunction(callback)) {
						callback(ret, err);
					}
				});
			}
		},
		// 快速创建并打开frameGroup（不带导航）
		// @callback：回调函数
		// @groupName：窗口组名称
		// @frames：窗口组frame集合
		// @index：默认索引
		$openFrameGroup : function(callback, groupName, frames, index) {
			frames = frames ? frames : [];

			index = typeof index == "number" ? index : 0;
			if (index > frames.length - 1)
				index = frames.length - 1;

			$$apicloud.openFrameGroup(function(ret, err) {
				if ($$com.isFunction(callback)) {
					callback(ret, err);
				}
			}, {
				name : groupName,
				frames : frames,
				index : index
			});
		},
		// 快速创建并打开FrameGroup对象(带导航)
		// @callback：回调函数
		// @headerId：导航选择器ID
		// @options：配置对象
		// @footerId：底部选择器ID
		$openFrameGroupWithNav : function(callback, headerId, options, footerId) {
			// 拓展对象
			var o = options || {};
			o = $$com.extend(defaultsOption.openFrameGroup, o);

			$$apicloud.$fixStatusBar(function(offset) {
				var footerOffset = $$apicloud.offset(footerId);
				if (!options.rect) {
					o.rect.x = offset.l;
					o.rect.h = api.winHeight - offset.h - footerOffset.h;
					o.rect.w = api.winWidth;
				}
				o.rect.y = offset.h;

				$$apicloud.openFrameGroup(function(ret, err) {
					if ($$com.isFunction(callback)) {
						callback(ret, err);
					}
				}, o, true);
			}, headerId);
		},
		// 关闭窗口组
		// @frameGroupName：窗口组名称
		closeFrameGroup : function(frameGroupName) {
			api.closeFrameGroup({
				name : frameGroupName
			});
		},
		// 设置窗口组属性
		// @options：配置对象
		setFrameGroupAttr : function(options) {
			// 拓展对象
			var o = options || {};
			api.setFrameGroupAttr(o);
		},
		// 设置窗口组显示隐藏状态
		// @groupName：窗口组名
		// @isHidden：是否隐藏
		// @isHidden：是否隐藏
		setFrameGroupStatus : function(groupName, isHidden) {
			isHidden = ( typeof arguments[1] != 'boolean') ? false : arguments[1];
			$$apicloud.setFrameGroupAttr({
				hidden : isHidden,
				name : groupName
			});
		},
		// 快速设置窗口组显示隐藏状态
		// @groupName：窗口组名
		// @isHidden：是否隐藏
		// @isHidden：是否隐藏
		$setFrameGroupStatus : function(groupName, isHidden) {
			$$apicloud.setFrameGroupStatus(groupName,isHidden);
		},
		// 设置窗口组的显示索引
		// @options：配置对象或者显示索引
		setFrameGroupIndex : function(options) {
			var o = defaultsOption.setFrameGroupIndex;
			if ( typeof options == 'number') {
				o.index = options;
			} else {
				// 拓展对象
				o = options || {};
				o = $$com.extend(defaultsOption.setFrameGroupIndex, o);
			}

			api.setFrameGroupIndex(o);
		}
	};


	// 核心函数
	win.H = $$apicloud, win.H.$apicloud = $$apicloud;
	win.H.$com = $$com;
	win.H.$api = $$api;
	win.H.$tppl = $$tppl;
	win.H.$v = '1.1.2';
	win.H.$module = modules;

}(window);
