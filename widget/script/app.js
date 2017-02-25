window.apiUrl = "http://bbs.winu.net/?/api/";

// 时间戳转多少天前，多少月前，多少年前
function transTime(timestamp) {
	return new Date().ago(timestamp * 1000);
}
//去掉所有的html标记
function delHtmlTag(str) {
	return str.replace(/<[^>]+>/g, "");
	
}