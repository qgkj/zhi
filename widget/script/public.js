function $(id){

	return document.getElementById(id);
}
/**打开window
	url：打开window将加载的url
	name：window的名称
	ott：api.openWin中支持的其他参数
**/
function GotoWin(url, name, ott){
	if(!url){
		return;
	}
	if(!name){
		name = url;
	}
	var args = {
		name:name, 
		url:url
	}
	if(ott){
		for(var i in ott){
			args[i] = ott[i];
		}
	}
	api.openWin(args);
}
//window + frame窗口结构中，打开content区域所在的frame
function openContent(url, fname, frect){
	if(!url){
		return;
	}
	var fn = fname ? fname : 'content_frm';
	var fr = {};//frame所在的rect区域
	if(frect){
		fr = frect;
	}else{
		var headerH = 44;//header高度为api.css样式中声明的44px
		var footerH = 30;//footer高度为api.css样式中声明的30px
		fr.marginTop = headerH;
		fr.marginBottom = footerH;
	}
    api.openFrame({
        name: fn,
        url: url,
        bounces: true,
        rect: fr
    });
}
//当前系统时间戳，毫秒
function curtime(){
	
	return new Date().getTime();
}