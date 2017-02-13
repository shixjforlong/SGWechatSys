function renderAddAddress(){
	renderSave();
	renderBack();
	renderSelectGender();//选择性别
}
function renderSave(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	$("#openId").val(openId);
	if(paramObj && paramObj.addressId){
		var addressId = paramObj.addressId;
		if(addressId){
			//根据id获取收货地址的详细信息
			$.ajax({
                url: "/wapi/wuAddress/"+addressId,
                type: "GET",
                success: function(data) {
                	$("#name").val(data.result.receiveName);
                	$("#phone").val(data.result.receivePhone);
                	$("#address").val(data.result.receiveAddress);
                	$('.customer-gender-choice').each(function(){
                		if($(this)[0].attributes[1].value == data.result.receiveGender){
                			$(this).addClass("customer-gender-check");
                		}
                	});
                }
            });
		}
	}
	
	$("#saveAddress").click(function () {
		//获取页面信息
		var openId = $("#openId").val();
		var name = $("#name").val();//收货人姓名
		var gender = $(".customer-gender-check")[0].attributes[1].value;//收货人性别
		var phone = $("#phone").val();//收货人手机号
		var address = $("#address").val();//收货人地址
		if(name =="" || name == null){
			alert("请填写姓名");
			return;
		}
		if(gender =="" || gender == null){
			alert("请选择性别");
			return;
		}
		if(phone =="" || phone == null){
			alert("请填写手机号");
			return;
		}
		if(address =="" || address == null){
			alert("请填写收货地址");
			return;
		}
		//判断收货地址是否在配送范围内
		//根据id获取收货地址的详细信息
		$.ajax({
            url: "/wapi/map/baidu/getLocation?address="+address,
            type: "GET",
            success: function(data) {
            	var addressObj = eval('(' + data + ')');
            	if(addressObj.status =="OK"){
            		var location_c = addressObj.result.location;//收货地址的经纬度
            		if(location_c.lat && location_c.lng){
            			$.ajax({
                            url: "/wapi/map/baidu/getLocation?address=北京市昌平区回龙观紫晶七星广场A130室",
                            type: "GET",
                            success: function(datas) {
                            	var addressObj_ = eval('(' + datas + ')');
                            	var location_s = addressObj_.result.location;//商家店铺的经纬度
                            	console.log(location_c);
                            	console.log(location_s);
                            	var distance = getDistanceFromXtoY(location_c.lat,location_c.lng,location_s.lat,location_s.lng);
                            	console.log(parseInt(distance));
                            	if(parseInt(distance)>5000){
                            		alert("不在配送范围内");
                            	}
                            }
                		});
            		}else{
            			alert("请输入正确的地址");
            		}
            	}else{
            		alert("请输入正确的地址");
            	}
            }
		});
		var data={
			openId:openId,
			receiveName:name,
			receiveGender:gender,
			receivePhone:phone,
			receiveAddress:address,
			enabled:'0'
		};
		console.log(data);
		var paramObj = GetRequest();
		/*if(paramObj && paramObj.addressId){
			//修改
			$.ajax({
				url:"/wapi/wuAddress/"+paramObj.addressId,
				type : "PUT",
				"contentType": "application/json", 
				data:JSON.stringify(data),
				success: function(data) {
					console.log(data);
					//跳转
					window.location.href='addressList.html?openId='+openId;
	            }
			});
		}else{
			//新增
			$.ajax({
				url:"/wapi/wuAddress/add",
				type : "post",
				"contentType": "application/json", 
				data:JSON.stringify(data),
				success: function(data) {
					console.log(data);
					//跳转
					window.location.href='addressList.html?openId='+openId;
	            }
			});
		}*/
		
	});
}
function renderSelectGender(){
	$(".customer-gender-choice").click(function () {
		$(".customer-gender-choice").removeClass("customer-gender-check");
		$(this).addClass("customer-gender-check");
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
function getDistanceFromXtoY(lat_a, lng_a, lat_b, lng_b){
	var pk = 180 / 3.14169;
	var a1 = lat_a / pk; 
	var a2 = lng_a / pk;  
	var b1 = lat_b / pk;  
	var b2 = lng_b / pk; 
	var t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2);
	var t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2);  
	var t3 = Math.sin(a1) * Math.sin(b1);  
	var tt = Math.acos(t1 + t2 + t3);  
	return 6366000 * tt;
}