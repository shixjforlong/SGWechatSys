function renderAddAddress(){
	renderSave();
	renderBack();
	renderSelectGender();//选择性别
	//renderGetData();
}
function renderGetData(){
	var paramObj = GetRequest();
	if(paramObj && paramObj.id){
		var id = paramObj.id;
		console.log("id==="+id);
		if(id){
			//根据id获取收货地址的详细信息
			
		}
	}
}
function renderSave(){
	$("#saveAddress").click(function () {
		//获取页面信息
		var name = $("#name").val();//收货人姓名
		var gender = $(".customer-gender-check")[0].attributes[1].value;//收货人性别
		var phone = $("#phone").val();//收货人手机号
		var address = $("#address").val();//收货人地址
		var data={
			openId:'',
			receiveName:name,
			receiveGender:gender,
			receivePhone:phone,
			receiveAddress:address
		};
		console.log(data);
		//存入数据库
		
		//跳转
		window.location.href='addressList.html';
		
	});
}
function renderSelectGender(){
	$(".customer-gender-choice").click(function () {
		$(".customer-gender-choice").removeClass("customer-gender-check");
		$(this).addClass("customer-gender-check");
	});
}
function renderBack(){
	$(".i-back").click(function () {
		window.history.go(-1);
	});
}
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
	      var str = url.substr(1);
	      strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
	      }
	 }
	 return theRequest;
}