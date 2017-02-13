function renderVipScore(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	$("#openId").val(openId);
	renderVipScore();
	renderBack();
}
function renderVipScore(){
	$.ajax({
        url: "/sapi/vip/list?limit=100000&cursor=0",
        type: "GET",
        success: function(vip) {
        	if(vip.result&&vip.result.length>0){
        		for(var i=0;i<vip.result.length;i++){
        			$(".detail-content").append(
               			 "<div class='detail-phone'>"+
               	              "<span class='rest-txt'>等级:"+vip.result[i].levelName+"</span>"+
               	              "<span style='margin-left:15px;'>经验值:"+vip.result[i].empiricalU+"~"+vip.result[i].empiricalL+"</span>"+
               	          "</div>"
               		);
        		}
        	}
        }
	});
}
function renderBack(){
	$(".i-back").click(function () {
		window.history.go(-1);
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