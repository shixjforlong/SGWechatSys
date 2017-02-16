function renderOrderConfirm(){
	
	var paramObj = GetRequest();
	var goodsStr = paramObj.goodsStr;
	var openId = paramObj.openId;
	var number = paramObj.number;
	$("#openId").val(openId);
	$("#goodsStr").val(goodsStr);
	if(paramObj.addressId){
		$("#addressId").val(paramObj.addressId);
	}
	if(paramObj.number){
		$("#number").val(paramObj.number);
	}
	if(paramObj.times){
		$("#times").val(paramObj.times);
	}
	
	$("#JPriceUse").val("");//使用积分

	renderDeliveryAddress();//获取用户的配送地址
	renderServiceTime();//送达时间
	renderGetUserJF();//获取用户的积分
	renderOrderList();//获取用户购买的商品信息
	renderSubmitOrder();//提交订单
	renderBtnClick();
}
function renderBtnClick(){
	var div2=document.getElementById("div2");
    var div1=document.getElementById("div1");
    div2.onclick=function(){
       if($("#JPrice").val()>0){
    	   
    	   $("#jifen").text($("#JPrice").val());
    	   
    	   var all = $("#goodsPrice").val();
   		   var distributionCost = $("#distributionCost").text();//配送费
   		  
    	   div1.className=(div1.className=="close1")?"open1":"close1";
           div2.className=(div2.className=="close2")?"open2":"close2";
           if(div1.className == "close1" && div2.className == "close2"){
        	   var finalPrice = parseInt(all) + parseInt(distributionCost);
       		   $("#total").text("￥"+finalPrice);
    		   $("#paid").text("￥"+finalPrice);
    		   $("#finalPay").text("￥"+finalPrice);
    		   $("#totalPrice").text(finalPrice);
    		   $("#integration").css("display","none");
    		   $("#JPriceUse").val("");
           }else if(div1.className == "open1" && div2.className == "open2"){
        	   var finalPrice = parseInt(all) + parseInt(distributionCost)-parseInt($("#JPrice").val());
       		   $("#total").text("￥"+finalPrice);
    		   $("#paid").text("￥"+finalPrice);
    		   $("#finalPay").text("￥"+finalPrice);
    		   $("#totalPrice").text(finalPrice);
    		   $("#JPriceUse").val($("#JPrice").val());
    		   $("#integration").css("display","block");
           }
       }
    };
}
function renderSubmitOrder(){
	$("#submitOrder").click(function () {
		var addressId = $("#addressId").val();//收货地址
		var receiveName = $("#name").text();
		var receiveGender = $("#gender").text();
	    var receivePhone = $("#phone").text();
		var receiveAddress = $("#address").text();
		
		var now = new Date();
		var time = now.getTime() + 1000*60*40;//往后推40分钟
		var newTime = new Date(time);
		var H = newTime.getHours(); //获取小时
		var M = newTime.getMinutes(); //获取分钟
		if(M<10){
			M="0"+M+"";
		}
		$("#serviceTime").val(H+":"+M);
		
		var serviceTime = $("#serviceTime").val();//送达时间
		var goodsInfo = $("#goodsStr").val();//商品信息
		var gtotalPrice = $("#goodsPrice").val();//商品总金额
		var distributionCost = $("#distributionCost").text();//配送费
		var integral = parseInt($("#JPriceUse").val())*10;//积分扣除
		var payPrice = $("#totalPrice").text();//支付金额 = 商品总金额 + 配送费 - 此次消费积分
		var empirical = parseInt(payPrice)*10;//此次消费获得的经验值
		var getIntegral= parseInt(payPrice);//此次消费获得的积分值
		
		if(addressId =="" || addressId == null){
			alert("请选择收货地址");
		}
		var openId = $("#openId").val();
		var number = $("#number").val();
		var now = new Date().getTime();
		var orderNo = now;
		var finalData={
				openId:openId,
				number:number,
				orderNo:orderNo,
				receiveName:receiveName,
				receiveGender:receiveGender,
				receivePhone:receivePhone,
				receiveAddress:receiveAddress,
				serviceTime:serviceTime,//客户要求送餐时间
				goodsInfo:goodsInfo,//商品信息
				gtotalPrice:gtotalPrice,//商品总金额
				distributionCost:distributionCost,//配送费
				integral:integral,//积分扣除
				payPrice:payPrice,//最终支付价格
				empirical:empirical,//此次消费获得的经验值
				getIntegral:getIntegral,//此次消费获得的积分值
				payState:1,   //支付状态   1待支付 2支付失败 3支付成功
				state:-1 //订单状态  -1:订单暂未支付  0:等待商户接单  1:商户已接单  2:商品派送中  3:订单完成
				
		};
		console.log(finalData);
		var orderInfo = JSON.stringify(finalData);
		$.ajax({
			url:"/wapi/order/add",
			type : "post",
			"contentType": "application/json", 
			data:JSON.stringify(finalData),
			success: function(data) {
				console.log(data);
				//跳转
				window.location.href='orderPay.html?orderInfo='+orderInfo;
            }
		});
		
	});
}
function renderGetUserJF(){
	var openId = $("#openId").val();
	//根据openId获取积分
	var url="/wapi/wxuser/list?limit=1&cursor=0&openId="+openId;
	$.ajax({
        url: url,
        type: "GET",
        success: function(data) {
        	console.log(data);
        	//data.result[0].integration = 28;
        	if(data.result[0].integration>0){
        		var jprice =parseInt(data.result[0].integration/10);
        		$("#jf").text("积分为"+data.result[0].integration+",可优惠"+jprice+"元");
        		$("#JPrice").val(jprice);
        	}else{
        		$("#jf").text("暂无可用积分");
        		$("#JPrice").val(null);
        	}
        }
	});
	
	 
}
function renderServiceTime(){
	var times = $("#times").val();
	/*if(times == '0' || times == '' || times == null){
		var now = new Date();
		var time = now.getTime() + 1000*60*40;//往后推40分钟
		var newTime = new Date(time);
		var H = newTime.getHours(); //获取小时
		var M = newTime.getMinutes(); //获取分钟
		$("#serviceTime").val(H+":"+M);
		$("#service_time").text("立即送达 (大约"+H+":"+M+"送达)");
		
	}else{
		$("#service_time").text("预约"+times+":00送达");
	}*/
	var now = new Date();
	var time = now.getTime() + 1000*60*40;//往后推40分钟
	var newTime = new Date(time);
	var H = newTime.getHours(); //获取小时
	var M = newTime.getMinutes(); //获取分钟
	$("#serviceTime").val(H+":"+M);
	$("#service_time").text("立即送达 (大约"+H+":"+M+"送达)");
	
	/*$("#chooseTime").click(function () {
		var goodsStr=$("#goodsStr").val();
    	var openId = $("#openId").val();
    	var times = $("#times").val();
    	window.location.href='chooseTime.html?openId='+openId+"&goodsStr="+goodsStr+"&times="+times;
	});*/
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
                  			 $("#number").val(data.result[i].number);
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
                  			 $("#number").val(data.result[i].number);
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

function renderOrderList(){
	var goodsStr = $("#goodsStr").val();
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
		$("#goodsPrice").val(all);
		var distributionCost = $("#distributionCost").text();//配送费
		
		var finalPrice = all + parseInt(distributionCost);
		
		$("#total").text("￥"+finalPrice);
		$("#paid").text("￥"+finalPrice);
		$("#finalPay").text("￥"+finalPrice);
		$("#totalPrice").text(finalPrice);
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