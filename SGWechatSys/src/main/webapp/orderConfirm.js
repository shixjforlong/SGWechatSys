function renderOrderConfirm(){
	renderOrderList();//获取用户购买的商品信息
	renderSubmitOrder();//提交订单
	renderDeliveryAddress();//获取用户的配送地址
}
function renderDeliveryAddress(){
	var openId = $("#openId").val();
	//根据openId获取收货地址
	var url="/wapi/wuAddress/list?limit=1000&cursor=0&openId="+openId;
	$.ajax({
        url: url,
        type: "GET",
        success: function(data) {
        	console.log(data);
        	if(data.result && data.result.length>0){
        		$("#chooseAddress").css("display","none");
        		$("#userAddress").css("display","block");
              	 for(var i=0;i<data.result.length;i++){
              		var addressId = $("#addressId").val();
              		if(addressId){
              			if(data.result[i].id == addressId){
              				 $("#name").text(data.result[i].receiveName);
                  			 $("#phone").text(data.result[i].receivePhone);
                  			 $("#address").text(data.result[i].receiveAddress);
                  			 if(data.result[i].receiveGender == '0'){
                  				 $("#gender").text("先生");
                  			 }else{
                  				$("#gender").text("女士");
                  			 }
                  			 $("#addressId").val(data.result[i].id);
              			}
              			
              		}else{
              			 if(data.result[i].enabled == '0'){
                  			 $("#name").text(data.result[i].receiveName);
                  			 $("#phone").text(data.result[i].receivePhone);
                  			 $("#address").text(data.result[i].receiveAddress);
                  			 if(data.result[i].receiveGender == '0'){
                  				 $("#gender").text("先生");
                  			 }else{
                  				$("#gender").text("女士");
                  			 }
                  			 $("#addressId").val(data.result[i].id);
                  			 break;
                  		 }
              		}
              	 }
        	}else{
        		$("#chooseAddress").css("display","block");
        		$("#userAddress").css("display","none");
        	}
        }
	});
	
    $("#chooseAddress").click(function () {
    	var goodsStr=$("#goodsStr").val();
    	var openId = $("#openId").val();
    	window.location.href='addressList.html?openId='+openId+"&goodsStr="+goodsStr;
	});
    $("#userAddress").click(function () {
    	var addressId = $("#addressId").val();
    	var goodsStr= $("#goodsStr").val();
    	var openId = $("#openId").val();
    	window.location.href='addressList.html?openId='+openId+"&addressId="+addressId+"&goodsStr="+goodsStr;
	});
}
function renderSubmitOrder(){
	$("#submitOrder").click(function () {
		
	});
}
function renderOrderList(){
	var paramObj = GetRequest();
	var goodsStr = paramObj.goodsStr;
	var openId = paramObj.openId;
	$("#openId").val(openId);
	$("#goodsStr").val(goodsStr);
	if(paramObj.addressId){
		$("#addressId").val(paramObj.addressId);
	}
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