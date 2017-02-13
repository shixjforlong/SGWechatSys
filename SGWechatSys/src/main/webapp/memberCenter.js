function renderVip(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	$("#openId").val(openId);
	
	renderGetVipInfoByOpenId();
}
function renderGetVipInfoByOpenId(){
	var openId = $("#openId").val();
	var url="/sapi/vip/list?limit=1&cursor=0&openId="+openId;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
           if(data.result.length>0){
        	   $("#integration").text(data.result[0].integration==null?"0":data.result[0].integration);
               $("#empirical").text(data.result[0].empirical==null?"0":data.result[0].empirical);
               $("#levelName").text(data.result[0].levelName==null?"非会员":data.result[0].levelName);
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