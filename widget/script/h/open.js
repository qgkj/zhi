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
}