function renderVip(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	$("#openId").val(openId);
	
	renderGetVipInfoByOpenId();
	renderVipScore();
}
function renderVipScore(){
	$("#vipScore").click(function () {
		var openId = $("#openId").val();
		window.location.href="./vipScore.html?openId="+openId;
	});
}
function renderGetVipInfoByOpenId(){
	var openId = $("#openId").val();
	var url="/wapi/wxuser/list?limit=1&cursor=0&openId="+openId;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
           
           $.ajax({
               url: "/sapi/vip/list?limit=100000&cursor=0",
               type: "GET",
               success: function(vip) {
               	if(vip.result&&vip.result.length>0){
               		if(data.result&&data.result.length>0){
               		   for(var j=0;j<vip.result.length;j++){
                       	  var empiricalU = vip.result[j].empiricalU;
                       	  var empiricalL = vip.result[j].empiricalL;
                       	  if(data.result[0].empirical){
                       		 if(empiricalU<data.result[0].empirical && data.result[0].empirical<empiricalL){
                           		 data.result[0].levelName = vip.result[j].levelName;
                           		 data.result[0].levelId = vip.result[j].id;
                           	 }
                       	  }
                       }
               		}
               	}
               	if(data.result.length>0){
               		$("#image").attr("src",data.result[0].image);
               		$("#nickName").text(data.result[0].nickName==null?"":data.result[0].nickName);
             	    $("#integration").text(data.result[0].integration==null?"0":data.result[0].integration);
                    $("#empirical").text(data.result[0].empirical==null?"0":data.result[0].empirical);
                    $("#levelName").text(data.result[0].levelName==null?"非会员":data.result[0].levelName);
                }
               	
               }
         	});
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