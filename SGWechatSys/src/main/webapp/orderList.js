function renderAllOrder(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	$("#openId").text(openId);
	renderOrderList(openId);
}
function renderOrderList(openId){
	
	var url="/wapi/order/list?limit=1000000&cursor=0&openId="+openId;
	$.ajax({
        url: url,
        type: "GET",
        success: function(data) {
        	console.log(data);
        	if(data.result.length>0){
        		$("#j-load").css("display","none");
        		for(var i=0;i<data.result.length>0;i++){
        			 var status="";
        			 var display="none";
        			 var bardisplay="none";
        			 var state="";
        			 if(data.result[i].state =="-1"){
        				 status="未支付";
        				 bardisplay="block";
        			 }
        			 if(data.result[i].state =="0"){
        				 status="订单已提交，等待商家确认";
        			 }else if(data.result[i].state =="1"){
        				 status="商户已接单";
        			 }else if(data.result[i].state =="2"){
        				 status="商品配送中";
        			 }else if(data.result[i].state =="3"){
        				 status="订单完成";
        			 }else if(data.result[i].state =="4"){
        				 status="订单取消";
        			 }
        			 var time = new Date(data.result[i].createTime*1000);
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
        			 var createTime = y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
        			 
        			 $("#order-list").append("<div class='field'>" +
        						 "<div class='field-head'>"+
        	                        "<a href='#' class='field-head-name' id='toHome'>食国外卖</a>"+
        	                          "<span class='field-head-status field-head-status-light'>"+status+"</span>"+
        	                      "</div>"+
        	                      "<a class='field-item clearfix' href='#' id='"+data.result[i].orderNo+"'>"+
        	                         "<div class='avatar'>"+
        	                            "<img src='http://101.201.150.141/file/logo.jpeg' class='j-avatar-img avatar-img'/>"+
        	                         "</div>"+
        	                         "<div class='content'>"+
        	                            "<p class='price'>￥"+data.result[i].payPrice+"</p>"+
        	                            "<p class='order-time'>"+createTime+"</p>"+
        	                            "<p class='delivery_tip'>由食国提供配送服务</p>"+
        	                         "</div>"+
        	                         "<i class='field-arrow icon-arrow-right'></i>"+
        	                       "</a>"+
        	                       "<div class='field-console' style='display:"+bardisplay+";'>"+
        	                          "<div class='field-console-btns'>"+
        	                           // "<a class='combtn field-btn'   href='' >评价</a>"+
        	                             "<button orderNo="+data.result[i].orderNo+"  price="+data.result[i].payPrice+" class='j-field-buy-again combtn field-btn-gray' data-poi-id='172423' data-poi-valid='1' data-view-id='1724231384054608' id='pay'>支付</button>"+
        	                          "</div>"+
        	                       "</div>"+
        						"</div>");
        			}
        		    $("#toHome").click(function () {
        		    	var openId = $("#openId").text();
        		    	window.location.href='takeOutOrder.html?openId='+openId;
        		    });
        		
        		   //查看订单状态和详情
        		    $(".field-item").click(function () {
        		    	var orderNo = $(this)[0].id;
        		    	var openId = $("#openId").text();
        		    	
        		    	window.location.href='orderDetail.html?orderNo='+orderNo+"&openId="+openId;
        		    });
        		    
        		    $("#pay").click(function () {
        		    	var openId = $("#openId").text();
        		    	var orderNo = $(this)[0].attributes[0].value;
        		    	var price = $(this)[0].attributes[1].value;
					    $("#orderNo").val(orderNo);
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
        	}else{
        		$("#j-load").css("display","block");
        	}
        }
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
