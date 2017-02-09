function renderTimeList(){
	var paramObj = GetRequest();
	var goodsStr = paramObj.goodsStr;
	var openId = paramObj.openId;
	if(paramObj.openId){
		$("#openId").val(openId);
	}
	if(paramObj.goodsStr){
		$("#goodsStr").val(goodsStr);
	}
	if(paramObj.times){
		$("#times").val(paramObj.times);
	}
	
	renderSelectTime();
	
	renderBindClick();
}
function renderSelectTime(){
	var times = $("#times").val();
	if(times == "0"){//立即送达
		$("#once").css("color","blue");
	}else{
		$("#"+times).css("color","blue");
	}
}
function renderBindClick(){
	$(".ctime").each(function(){
		var now = new Date();
		var nowH = now.getHours(); //获取当前时间小时
		
		var time = now.getTime() + 1000*60*40;//往后推40分钟
		var newTime = new Date(time);
		var H = newTime.getHours(); //获取小时
		
		if($(this)[0].id < nowH || $(this)[0].id == nowH){
			$("#"+$(this)[0].id).css("display","none");
		}
	});
	
	$("#once").click(function () {
		var times = "0";//立即送出
		var openId = $("#openId").val();
		var goodsStr = $("#goodsStr").val();
		window.location.href="./orderConfirm.html?times="+times+"&openId="+openId+"&goodsStr="+goodsStr;
	});
	
	$(".ctime").click(function () {
		var times = $(this)[0].id;
		var openId = $("#openId").val();
		var goodsStr = $("#goodsStr").val();
		window.location.href="./orderConfirm.html?times="+times+"&openId="+openId+"&goodsStr="+goodsStr;
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