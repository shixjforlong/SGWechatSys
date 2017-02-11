function renderAboutMe(){
	$.ajax({
        url: "/sapi/business?number=shiguo",
        type: "GET",
        success: function(data) {
            $("#phone").text(data.result[0].phone==null?"敬请期待":data.result[0].phone);
            $("#address").text(data.result[0].address==null?"敬请期待":data.result[0].address);
            $("#servicetime").text(data.result[0].servicetime==null?"敬请期待":data.result[0].servicetime);
            $("#service").text(data.result[0].service==null?"敬请期待":data.result[0].service);
            $("#activity").text(data.result[0].activity==null?"敬请期待":data.result[0].activity);
        }
    });
	
}