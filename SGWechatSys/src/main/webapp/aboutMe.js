function renderAboutMe(){
	$.ajax({
        url: "/sapi/business/list",
        type: "GET",
        success: function(data) {
            if(data.result.length>0){
            	for(var i=0;i<data.result.length;i++){
            		$("#detail-wrap").append(
            			 "<div class='detail-region'>"+ 
            		        "<div class='detail-content'>"+
            		          "<div class='detail-phone' style='text-align: center;'>"+
         		                "<span>"+data.result[i].name+"</span>"+ 
         		               "</div>"+ 
            		           "<div class='detail-phone'>"+
            		             "<span class='rest-txt'>客服电话：</span>  <span id='phone'>"+data.result[i].phone+"</span>"+ 
            		           "</div>"+ 
            		           "<div class='detail-address'>"+
            		             "<span class='rest-txt'>商家地址：</span>"+ 
            		             "<span id='address'>"+data.result[i].address+"</span>"+ 
            		           "</div>"+ 
            		           "<div class='detail-time'>"+
            		               "<span class='rest-txt'>营业时间：</span>"+
            		               "<span id='servicetime'>"+data.result[i].servicetime+"</span>"+
            		           "</div>"+ 
            		           "<div class='detail-service'>"+
            		               "<span class='rest-txt'>配送服务：</span>"+ 
            		               "<span id='service'>"+data.result[i].service+"</span>"+ 
            		           "</div>"+ 
            		       "</div>"+ 
            		      "</div>" 
            		);
            	}
            }
        }
    });
	
}