function renderOrderPay(){
	var paramObj = GetRequest();
	var orderInfo = paramObj.orderInfo;
	var orderObj = eval('(' + orderInfo + ')');
	console.log(orderObj);
	$("#orderPrice").text("￥"+orderObj.payPrice);
	$("#price").text("￥"+orderObj.payPrice);
	
	//点击支付
	$("#payOrder").click(function () {
		
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