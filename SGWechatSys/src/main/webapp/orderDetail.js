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
	        		$("#orderId").val(data.result[0].id);
	        		$("#price").val(data.result[0].payPrice);
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
      			    if(data.result[0].orderCancelTime){
       			         $("#orderCancelTime").text(getTimeByMin(data.result[0].orderCancelTime));
   			        }
	        		
       			    $("#serviceTime").text(data.result[0].serviceTime);
	        		var state = data.result[0].state;//订单状态
	        		
	        		//催单
	        		var reminderState = data.result[0].reminderState;//催单状态
	        		reminderOrder(reminderState,data.result[0].reminderTime,data.result[0].reminderReplyTime,data.result[0].payTime,data.result[0].orderInTime,data.result[0].orderOutTime,data.result[0].orderFinishTime);
	        		
	        		if(state == "-1"){//未支付
	        			 $("#01").css("display","block");
	        			 
	        			 $("#0").css("display","none");
	        			 
	        			 $("#1_title").text("等待商家接单");
        				 $("#1_sub").css("display","none");
        				 
        				 $("#2_title").text("等待配送");
        				 $("#2_sub").css("display","none");
        				 
        				 $("#3_title").text("确认收货");
        				 
        				 $("#orderStateDo").css("display","none");
        				 $("#orderPay").css("display","block");
        				 
	        		}else if(state == "4"){//订单取消
	        			 $("#4").css("display","block");
	        			 if(data.result[0].payState == "1" || data.result[0].payState == "2"){//未支付  支付失败
	        				 $("#01").css("display","block");
	        			 }else if(data.result[0].payState == "3"){//支付成功
	        				 $("#01").css("display","none");
	        			 }
	        			 
	        			 $(".bottombar-down").css("display","none");
	        			 $("#1_title").text("等待商家接单");
        				 $("#1_sub").css("display","none");
        				 
        				 $("#2_title").text("等待配送");
        				 $("#2_sub").css("display","none");
        				 
        				 $("#3_title").text("确认收货");
        				 $("#finishLine").css("display","block");
	        		}else {
	        			 $("#01").css("display","none");
	        			 if(state == "0"){//订单已提交 等待商家确认
	        				 $("#0").children("i").removeClass("timeline-connect-gray");
	        				 
	        				 $("#1_title").text("等待商家接单");
	        				 $("#1_sub").css("display","none");
	        				 
	        				 $("#2_title").text("等待配送");
	        				 $("#2_sub").css("display","none");
	        				 
	        				 $("#3_title").text("确认收货");
	        				 $("#orderStateDo").css("display","block");
	        			 }else if(state == "1"){//商家已接单
	        				 $("#0").children("i").removeClass("timeline-connect-gray");
	        				 $("#1").children("i").removeClass("timeline-connect-gray");
	        				 
	        				 $("#1_title").text("商家已接单");
	        				 $("#1_sub").css("display","block");
	        				 
	        				 $("#2_title").text("等待配送");
	        				 $("#2_sub").css("display","none");
	        				 
	        				 $("#3_title").text("确认收货");
	        				 $("#orderStateDo").css("display","block");
	        				 
	        			 }else if(state == "2"){//骑手已取货
	        				 $("#0").children("i").removeClass("timeline-connect-gray");
	        				 $("#1").children("i").removeClass("timeline-connect-gray");
	        				 
	        				 $("#1_title").text("商家已接单");
	        				 $("#1_sub").css("display","block");
	        				 
	        				 $("#2_title").text("商品正在配送中");
	        				 $("#2_sub").css("display","block");
	        				 
	        				 $("#3_title").text("确认收货");
	        				 
	        				 $("#btn-received").css("display","inline-block");//确认收货
	        				 $(".bottombar-buttonwrap").removeClass("bottombar-buttonwrap-2");
	        				 $(".bottombar-buttonwrap").addClass("bottombar-buttonwrap-3");
	        				 $("#orderStateDo").css("display","block");
	        				 
	        			 }else if(state == "3"){//订单完成
	        				 $("#0").children("i").removeClass("timeline-connect-gray");
	        				 $("#1").children("i").removeClass("timeline-connect-gray");
	        				 $("#2").children("i").removeClass("timeline-connect-gray");
	        				 
	        				 $("#1_title").text("商家已接单");
	        				 $("#1_sub").css("display","block");
	        				 
	        				 $("#2_title").text("商品已送达");
	        				 $("#2_sub").css("display","block");
	        				 
	        				 $("#3_title").text("订单完成");
	        			 }
	        		}
	        	}
	        }
		});
	});
	
	$("#orderState").click();
	
	
    $("#pay").click(function () {
    	var openId = $("#openId").val();
    	var orderNo = $("#orderNo").val();
    	var price =  $("#price").val();
		$.ajax({
			url:"/wapi/wechat/prePayId?openId="+openId+"&orderNo="+orderNo+"&price="+price,
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
								 var openId = $("#openId").val();
							     var orderNo = $("#orderNo").val();
								window.location.href='orderDetail.html?orderNo='+orderNo+"&openId="+openId;
							 }
						});
					}
				});
            }
		});
    });
	
	$("#btn-hasten").click(function () {//催单
		var id = $("#orderId").val();
    	var contentData={
    			reminderState:"1"
   	    };
    	$.ajax({
            url: "/wapi/order/"+ id,
            type: "PUT",
            "contentType": "application/json", 
			data:JSON.stringify(contentData),
            success: function(data) {
            	console.log(data);
            	var orderNo = $("#orderNo").val();
            	var openId = $("#openId").val();
            	window.location.href='orderDetail.html?orderNo='+orderNo+"&openId="+openId;
            }
        });
	});
    $("#btn-cancelorder").click(function () {//取消订单
    	var id = $("#orderId").val();
    	var contentData={
   			 state:"4"
   	    };
    	$.ajax({
            url: "/wapi/order/"+ id,
            type: "PUT",
            "contentType": "application/json", 
			data:JSON.stringify(contentData),
            success: function(data) {
            	console.log(data);
            	var orderNo = $("#orderNo").val();
            	var openId = $("#openId").val();
            	window.location.href='orderDetail.html?orderNo='+orderNo+"&openId="+openId;
            }
        });
	});
    $("#btn-received").click(function () {//确认收货
    	var id = $("#orderId").val();
    	var contentData={
   			 state:"3"
   	    };
    	$.ajax({
            url: "/wapi/order/"+ id,
            type: "PUT",
            "contentType": "application/json", 
			data:JSON.stringify(contentData),
            success: function(data) {
            	console.log(data);
            	var orderNo = $("#orderNo").val();
            	var openId = $("#openId").val();
            	window.location.href='orderDetail.html?orderNo='+orderNo+"&openId="+openId;
            }
        });
	});
	
}
function reminderOrder(reminderState,reminderTime,reminderReplyTime,payTime,orderInTime,orderOutTime,orderFinishTime){
	if(reminderState){
		$("#btn-hasten").css("display","none");
		var stateFlag="";
		if(orderInTime){
			if(payTime<reminderTime && reminderTime<orderInTime){
				stateFlag = 0;
			}
		}else{
			if(payTime<reminderTime){
				stateFlag = 0;
			}
		}
		if(orderOutTime){
			if(orderInTime<reminderTime&&reminderTime<orderOutTime){
				stateFlag = 1;
			}
		}else{
			if(orderInTime<reminderTime){
				stateFlag = 1;
			}
		}
		if(orderFinishTime){
			if(orderOutTime<reminderTime&&reminderTime<orderFinishTime){
				stateFlag = 2;
			}
		}else{
			if(orderOutTime<reminderTime){
				stateFlag = 2;
			}
		}
		
		if(reminderState == "1"){//客户催单
			$("#"+stateFlag).after(
					"<div class='timeline-item' id='re_"+reminderState+"'>"+ 
		              "<i class='timeline-connect' id='finishLine'></i>"+
		              "<img class='timeline-logo' src='http://101.201.150.141/file/line.png'>"+
		              "<div class='timeline-block'>"+ 
		                 "<p class='timeline-title' id='re_"+reminderState+"'_title'>催单成功<span class='timeline-time' id='reminderTime'></span></p>"+ 
		                 "<p class='timeline-sub' id='re_"+reminderState+"_sub'>已通知商家加急</p>"+  
		              "</div>"+
		         "</div>"
			);
			if(reminderTime){
			         $("#reminderTime").text(getTimeByMin(reminderTime));
		        }
		}else if(reminderState == "2"){
			console.log(stateFlag);
			$("#"+stateFlag).after(
					"<div class='timeline-item' id='re_1'>"+ 
		              "<i class='timeline-connect' id='finishLine'></i>"+
		              "<img class='timeline-logo' src='http://101.201.150.141/file/line.png'>"+
		              "<div class='timeline-block'>"+ 
		                 "<p class='timeline-title' id='re_1'_title'>催单成功<span class='timeline-time' id='reminderTime'></span></p>"+ 
		                 "<p class='timeline-sub' id='re_1_sub'>已通知商家加急</p>"+  
		              "</div>"+
		            "</div>"+
		            "<div class='timeline-item' id='re_"+reminderState+"'>"+ 
		              "<i class='timeline-connect' id='finishLine'></i>"+
		              "<img class='timeline-logo' src='http://101.201.150.141/file/line.png'>"+
		              "<div class='timeline-block'>"+ 
		                 "<p class='timeline-title' id='re_"+reminderState+"'_title'>商家确认催单<span class='timeline-time' id='reminderReplyTime'></span></p>"+ 
		                 "<p class='timeline-sub' id='re_"+reminderState+"_sub'>正在加急处理中</p>"+  
		              "</div>"+
		            "</div>"
			);
			if(reminderTime){
			         $("#reminderTime").text(getTimeByMin(reminderTime));
		        }
			if(reminderReplyTime){
			         $("#reminderReplyTime").text(getTimeByMin(reminderReplyTime));
		        }
		}
		
	}
	
}
function getTimeByMin(ordertime){
	 var time = new Date(ordertime*1000);
	 var y = time.getFullYear();
	 var m = time.getMonth()+1;
	 var d = time.getDate();
	 var h = time.getHours();
	 var mm = time.getMinutes();
	 var s = time.getSeconds();
	 if(mm<10){
		 mm="0"+mm+"";
     }
	 if(s<10){
		 s="0"+s+"";
     }
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