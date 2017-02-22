function renderAboutMe(){
	$.ajax({
        url: "/sapi/business/list",
        type: "GET",
        success: function(data) {
            if(data.result.length>0){
            	for(var i=0;i<data.result.length;i++){
            		$("#lianxi").append(
            				"<table style='width:100%;margin:5px;'>"+
            				  "<tr><td><span><B>客服电话:</B></span><span style='margin-left:5px;'>"+data.result[i].phone+"</span>"+"</td></tr>"+
            				  "<tr><td><span><B>地址:</B></span><span style='margin-left:5px;'>"+data.result[i].address+"</span>"+"</td></tr>"+
            				  "<tr><td><span><B>营业时间:</B></span><span style='margin-left:5px;'>"+data.result[i].servicetime+"</span>"+"</td></tr>"+
            				"</table>"
            		);
            		
            	}
            }
        }
    });
	
}