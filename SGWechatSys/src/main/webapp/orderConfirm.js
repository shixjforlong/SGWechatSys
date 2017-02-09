function renderOrderConfirm(){
	
	var paramObj = GetRequest();
	var goodsStr = paramObj.goodsStr;
	var openId = paramObj.openId;
	$("#openId").val(openId);
	$("#goodsStr").val(goodsStr);
	if(paramObj.addressId){
		$("#addressId").val(paramObj.addressId);
	}
	if(paramObj.times){
		$("#times").val(paramObj.times);
	}

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
    	   $("#integration").css("display","block");
    	   $("#jifen").text($("#JPrice").val());
    	   
    	   var all = $("#goodsPrice").val();
   		   var distributionCost = $("#distributionCost").text();//配送费
   		   var finalPrice = parseInt(all) + parseInt(distributionCost)-parseInt($("#JPrice").val());
   		   $("#total").text("￥"+finalPrice);
		   $("#paid").text("￥"+finalPrice);
		   $("#finalPay").text("￥"+finalPrice);
		
    	   div1.className=(div1.className=="close1")?"open1":"close1";
           div2.className=(div2.className=="close2")?"open2":"close2";
       }
    };
}
function renderSubmitOrder(){
	$("#submitOrder").click(function () {
		var addressId = $("#addressId").val();//收货地址
		var times = $("#service_time").text();//送达时间
		var goodsInfo = $("#goodsStr").val();//商品信息
		if(addressId =="" || addressId == null){
			alert("请选择收货地址");
		}
		
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
        	data.result[0].integration = 28;
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
	if(times == '0' || times == '' || times == null){
		var now = new Date();
		var time = now.getTime() + 1000*60*40;//往后推40分钟
		var newTime = new Date(time);
		var H = newTime.getHours(); //获取小时
		var M = newTime.getMinutes(); //获取分钟
		$("#service_time").text("立即送达 (大约"+H+":"+M+"送达)");
		
	}else{
		$("#service_time").text("预约"+times+":00送达");
	}
	
	$("#chooseTime").click(function () {
		var goodsStr=$("#goodsStr").val();
    	var openId = $("#openId").val();
    	var times = $("#times").val();
    	window.location.href='chooseTime.html?openId='+openId+"&goodsStr="+goodsStr+"&times="+times;
	});
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