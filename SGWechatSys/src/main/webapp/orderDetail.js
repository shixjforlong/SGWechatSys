function renderOrderDetail(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	var orderNo = paramObj.orderNo;
	$("#openId").val(openId);
	$("#orderNo").val(orderNo);
	renderBack();
	renderBtnEvent();
}
function renderBtnEvent(){
	//订单详情
	$("#orderDetail").click(function () {
		$("#orderState").removeClass("nav-choose");
		$(this).addClass("nav-choose");
		$(".j-nav-bottomline").addClass("nav-bottomlineright");
		$("#order-status").css("display","none");
		$("#order-detail").css("display","block");
		var orderNo = $("#orderNo").val();
		var url="/wapi/order/list?limit=1&cursor=0&orderNo="+orderNo;
		$.ajax({
	        url: url,
	        type: "GET",
	        success: function(data) {
	        	console.log(data);
	        	if(data.result.length>0){
	        		var goodsInfo = data.result[0].goodsInfo;
	        		var array = goodsInfo.split(";");
	        		if(array.length>0){
	        			for(var i=0;i<array.length-1;i++){
	        				var tds = array[i].split(",");
	        				$("#goodsInfo").append(
	        					"<li class='orderregion-entry'>"+  
	 	        	               "<span class='name'>"+tds[0]+"</span>"+ 
	 	        	               "<span class='price'>￥"+tds[2]+"</span>"+  
	 	        	               "<span class='num'>×"+tds[1]+"</span>"+  
	 	        	             "</li>"	
	        				);
	        			}
	        		}
	        		if(data.result[0].integral){
	        			$("#integral").text(parseInt(data.result[0].integral)/10);
	        		}else{
	        			$("#integralFlag").css("display","none");
	        		}
	        		
	        		$("#payPrice").text(data.result[0].payPrice);
	        		$("#receiver").text(data.result[0].receiveName+"("+data.result[0].receiveGender+")"+data.result[0].receivePhone);
	        		$("#address").text(data.result[0].receiveAddress);
	        		$("#orderNo_").text(data.result[0].orderNo);
	        		$("#orderTime").text(getTimeByMin(data.result[0].createTime));
	        	}
	        }
		});
	});
	
	//订单状态
	$("#orderState").click(function () {
		$("#orderDetail").removeClass("nav-choose");
		$(this).addClass("nav-choose");
		$(".j-nav-bottomline").removeClass("nav-bottomlineright");
		$("#order-status").css("display","block");
		$("#order-detail").css("display","none");
		var orderNo = $("#orderNo").val();
		//根据订单号查询订单状态
		var url="/wapi/order/list?limit=1&cursor=0&orderNo="+orderNo;
		$.ajax({
	        url: url,
	        type: "GET",
	        success: function(data) {
	        	console.log(data);
	        	if(data.result.length>0){
        			if(data.result[0].createTime){
            			 $("#createTime").text(getTimeByMin(data.result[0].createTime));
        			}
        			if(data.result[0].payTime){
           			     $("#payTime").text(getTimeByMin(data.result[0].payTime));
       			    }
        			if(data.result[0].orderInTime){
           			     $("#orderInTime").text(getTimeByMin(data.result[0].orderInTime));
       			    }
        			if(data.result[0].orderOutTime){
          			     $("#orderOutTime").text(getTimeByMin(data.result[0].orderOutTime));
      			    }
       			    if(data.result[0].orderFinishTime){
          			     $("#orderFinishTime").text(getTimeByMin(data.result[0].orderFinishTime));
      			    }
	        		
	        		var state = data.result[0].state;
	        		if(state == "-1"){//未支付
	        			 $("#01").css("display","block");
	        		}else {
	        			 $("#01").css("display","none");
	        			 if(state == "0"){//订单已提交 等待商家确认
	        				 $("#0").css("display","block");
	        			 }else if(state == "1"){//商家已接单
	        				 $("#0").css("display","block");
	        				 $("#1").css("display","block");
	        			 }else if(state == "2"){//骑手已取货
	        				 $("#0").css("display","block");
	        				 $("#1").css("display","block");
	        				 $("#2").css("display","block");
	        			 }else if(state == "3"){//订单完成
	        				 $("#0").css("display","block");
	        				 $("#1").css("display","block");
	        				 $("#2").css("display","block");
	        				 $("#3").css("display","block");
	        			 }
	        		}
	        	}
	        }
		});
	});
	
	$("#orderState").click();
}
function getTimeByMin(ordertime){
	 var time = new Date(ordertime*1000);
	 var y = time.getFullYear();
	 var m = time.getMonth()+1;
	 var d = time.getDate();
	 var h = time.getHours();
	 var mm = time.getMinutes();
	 var s = time.getSeconds();
	 var finalTime = y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
	 return finalTime;
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
function renderBack(){
	$(".i-back").click(function () {
		window.history.go(-1);
	});
}