function renderAllOrder(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	
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
        			 if(data.result[i].state =="-1"){
        				 status="未支付";
        				 display="block";
        			 }else if(data.result[i].state =="0"){
        				 status="等待商户接单";
        			 }else if(data.result[i].state =="1"){
        				 status="商户已接单";
        			 }else if(data.result[i].state =="2"){
        				 status="商品派送中";
        			 }else if(data.result[i].state =="3"){
        				 status="订单完成";
        			 }
        			 var time = new Date(data.result[i].createTime*1000);
        			 var y = time.getFullYear();
        			 var m = time.getMonth()+1;
        			 var d = time.getDate();
        			 var h = time.getHours();
        			 var mm = time.getMinutes();
        			 var s = time.getSeconds();
        			 var createTime = y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
        			 
        			 $("#order-list").append("<div class='field'>" +
        						 "<div class='field-head'>"+
        	                        "<a href='/restaurant/72894237627578801' class='field-head-name'>食国外卖</a>"+
        	                          "<span class='field-head-status field-head-status-light'>"+status+"</span>"+
        	                      "</div>"+
        	                      "<a class='field-item clearfix' href='/order/statusdetail/1724231384054608'>"+
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
        	                       "<div class='field-console'>"+
        	                          "<div class='field-console-btns'>"+
        	                           // "<a class='combtn field-btn'   href='' >评价</a>"+
        	                             "<button class='j-field-buy-again combtn field-btn-gray' data-poi-id='172423' data-poi-valid='1' data-view-id='1724231384054608' id='pay' style='display:"+display+";'>立即支付</button>"+
        	                          "</div>"+
        	                       "</div>"+
        						"</div>");
        			}
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
