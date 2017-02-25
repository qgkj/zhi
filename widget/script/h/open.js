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