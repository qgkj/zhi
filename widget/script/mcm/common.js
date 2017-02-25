function loading(msg){
	msg = msg ? msg :'请稍后...';
	api.showProgress({title:'处理中', text:msg, modal:false});
}

function finishing(){
	api.hideProgress();
}

function showAlert(msg){
	api.alert({title:'提示', msg:msg});
}

function value(id){

	return document.getElementById(id).value;
}