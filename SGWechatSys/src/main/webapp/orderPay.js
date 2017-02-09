function renderOrderPay(){
	var paramObj = GetRequest();
	var orderInfo = paramObj.orderInfo;
	var orderObj = eval('(' + orderInfo + ')');
	console.log(orderObj);
	$("#orderPrice").text("￥"+orderObj.payPrice);
	$("#price").text("￥"+orderObj.payPrice);
	
	//点击支付
	$("#payOrder").click(function () {
		$.ajax({
			url:"/wapi/wechat/prePayId?openId="+orderObj.openId+"&orderNo="+orderObj.orderNo+"&price="+orderObj.payPrice,
			type : "GET",
			"contentType": "application/json", 
			success: function(data) {
				var appId = data.appId;
				var nonce_str = data.nonce_str;
				var prePayId = data.prePayId;
				var time = new Date().getTime()/1000;
				time = (time+"").substring(0,(time+"").length-4);
				
				$.ajax({
					url:"/wapi/wechat/wechatSign?appId="+appId+"&timeStamp="+time+"&nonceStr="+nonce_str+"&packageName=prepay_id="+prePayId,
					type : "GET",
					"contentType": "application/json", 
					success: function(data) {
						var sign = data.paySign;
						WeixinJSBridge.invoke('getBrandWCPayRequest',{
							"appId" : appId,
							"timeStamp":time,
							"nonceStr" : nonce_str,
							"package" : "prepay_id="+prePayId,
							"signType" : "MD5",
							"paySign" : sign
						},
						function(res){
							 if(res.err_msg.trim() == "get_brand_wcpay_request:ok"){
								window.location.href = "http://www.baidu.com";		
							 }
						});
					}
				});
            }
		});
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