function renderAddressList(){
	renderAddressList();//获取所有的收货地址
}

function renderAddressList(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	var goodsStr = paramObj.goodsStr;
	var addressId = "";
	if(paramObj.addressId){
		addressId = paramObj.addressId;
	}
	$("#openId").val(openId);
	$("#goodsStr").val(goodsStr);
	//根据openId获取收货地址
	var url="/wapi/wuAddress/list?limit=1000&cursor=0&openId="+openId;
	$.ajax({
        url: url,
        type: "GET",
        success: function(data) {
        	console.log(data);
        	if(data.result && data.result.length>0){
        			for(var i=0;i<data.result.length;i++){
        				var gender="女士";
        				if(data.result[i].receiveGender == '0'){
        					gender ="先生";
        				}
        				var liClass = "address-selectable address";//address-selectable address-selected 
        				if(data.result[i].enabled == '1'){//无效的地址
        					liClass="address-noscope address";
        				}
        				if(addressId){
        					if(data.result[i].id == addressId){//被选中的地址
            					liClass ="address-selectable address address-selected ";
            					$("#selectAddressId").val(data.result[i].id);
            				}
        				}
        				$("#address-list").append(
        						"<li class='"+liClass+"' id='"+data.result[i].id+"'>"+
        			             "<div class='contect-button'>"+
        			               "<a class='edit j-edit' address-id='"+data.result[i].id+"' href='javascritp:;'></a>"+
        			               "<a class='dele j-dele' address-id='"+data.result[i].id+"' href='javascript:;'></a>"+
        			             "</div>"+
        			             "<div class='address-content'>"+
        			                "<div class='address-info j-address-info'>"+
        			                    "<p class='customer-info clearfix'>"+
        			                        "<span class='contect-name'>"+data.result[i].receiveName+"</span>"+
        			                        "<span class='contect-gender'>"+gender+"</span>"+
        			                        "<span class='contect-phone'>"+data.result[i].receivePhone+"</span>"+
        			                    "</p>"+
        			                    "<p class='address-dtl'>"+
        			                    "<span class='contect-address'>"+data.result[i].receiveAddress+"</span>"+ 
        			                "</div>"+
        			            "</div>"+
        			           "</li>"
        				);
        				
        				$("#"+data.result[i].id).bind("click", function(){
        					var addressId = $(this)[0].id;
        					var openId = $("#openId").val();
        					var goodsStr = $("#goodsStr").val();
        					window.location.href="./orderConfirm.html?addressId="+addressId+"&openId="+openId+"&goodsStr="+goodsStr;
        				});
        				
        				$(".edit").click(function () {
        				    var addressId = $(this)[0].attributes[1].value;
        				    $('#'+addressId).unbind("click");
        				    
        					var openId = $("#openId").val();
        					var addressId = $(this)[0].attributes[1].value;
        					window.location.href="./addressAdd.html?addressId="+addressId+"&openId="+openId;
        					
        				});
        				
        				$(".dele").click(function () {
        			    	var addressId = $(this)[0].attributes[1].value;
        			    	$('#'+addressId).unbind("click");
        			    	//调根据收货地址ID 删除收货地址API
        			    	$.ajax({
        			            url: "/wapi/wuAddress/" + addressId,
        			            type: "DELETE",
        			            success: function(data) {
        			            	var addressId = $("#selectAddressId").val();
        			            	var goodsStr= $("#goodsStr").val();
        			            	var openId = $("#openId").val();
        			            	window.location.href='addressList.html?openId='+openId+"&addressId="+addressId+"&goodsStr="+goodsStr;
        			            }
        			        });
        				});
        			}
        	}
        }
	});
	
	
    
	
	$("#editAddress").click(function () {
		    if($(".addr-manage").text() == "管理"){
		    	$(".contect-button").css("display","block");
				$(".contect-button").css("margin-right","15px");
				$(".contect-button").css("margin-top","22px");
				$(".addr-manage").text("取消");
				var selectAddressId = $("#selectAddressId").val();
				$("#"+selectAddressId).removeClass("address-selected");
		    }else{
		    	$(".contect-button").css("display","none");
				$(".contect-button").css("margin-right","0px");
				$(".contect-button").css("margin-top","0px");
				$(".addr-manage").text("管理");
				var selectAddressId = $("#selectAddressId").val();
				$("#"+selectAddressId).addClass("address-selected");
		    }
	});
	renderAddAddress();//新增收货地址
	renderBack();
}

function renderAddAddress(){
	$(".address-add").click(function () {
		var openId = $("#openId").val();
		window.location.href='addressAdd.html?openId='+openId;
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