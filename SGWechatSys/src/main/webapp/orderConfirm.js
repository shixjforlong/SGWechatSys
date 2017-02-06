function renderOrderConfirm(){
	renderOrderList();//获取用户购买的商品信息
	renderSubmitOrder();//提交订单
	renderDeliveryAddress();//获取用户的配送地址
}
function renderDeliveryAddress(){
	
}
function renderSubmitOrder(){
	$("#submitOrder").click(function () {
		
	});
}
function renderOrderList(){
	var paramObj = GetRequest();
	var goodsStr = paramObj.goodsStr;
	console.log(goodsStr);
	var array = goodsStr.split(";");
	if(array.length>0){
		var all=0;
		for(var i=0;i<array.length-1;i++){
			var tds = array[i].split(",");
			$("#goodOrderInfo").append(
					"<tr style='height: 30px;'>"+
		               "<td width='70%'>"+tds[0]+"</td>"+
		               "<td width='18%' style='color: #bbc4cc;'>x"+tds[1]+"</td>"+
		               "<td width='12%'>￥"+tds[2]+"</td>"+
		             "</tr>"	
			);
			all =all +parseInt(tds[2]) * parseInt(tds[1]);
		}
		var distributionCost = $("#distributionCost").text();//配送费
		var finalPrice = all + parseInt(distributionCost);
		$("#total").text("￥"+finalPrice);
		$("#paid").text("￥"+finalPrice);
		$("#finalPay").text("￥"+finalPrice);
	}
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