function renderAddressList(){
	renderAddressList();//获取所有的收货地址
}

function renderAddressList(){
	var data=[];
	var obj1={
			id:'1',
			receiveName:'石晓洁',
			receiveGender:'1',
			receivePhone:'13810948412',
			receiveAddress:'北京市朝阳区启明国际大厦11层',
			enabled:'0'
	};	
	var obj2={
			id:'2',
			receiveName:'崔文龙',
			receiveGender:'0',
			receivePhone:'18617787567',
			receiveAddress:'北京市昌平区名佳花园3区19号楼',
			enabled:'1'
	};	
	var obj3={
			id:'3',
			receiveName:'小王',
			receiveGender:'0',
			receivePhone:'13567654345',
			receiveAddress:'北京市朝阳区望京soho',
			enabled:'0'
	};
	var obj4={
			id:'4',
			receiveName:'小李',
			receiveGender:'0',
			receivePhone:'15987678987',
			receiveAddress:'北京市海淀区',
			enabled:'1'
	};	
	data.push(obj1);
	data.push(obj2);
	data.push(obj3);
	data.push(obj4);
	if(data.length>0){
		for(var i=0;i<data.length;i++){
			var gender="女士";
			if(data[i].receiveGender == '0'){
				gender ="先生";
			}
			var liClass = "address-selectable";//address-selectable address-selected 
			if(data[i].enabled == '1'){
				liClass="address-noscope";
			}
			if(i==0){
				liClass ="address-selectable address-selected ";
			}
			$("#address-list").append(
					"<li class='"+liClass+"' id='"+data[i].id+"'>"+
		             "<div class='contect-button'>"+
		               "<a class='edit j-edit' address-id='"+data[i].id+"' href='javascritp:;'></a>"+
		               "<a class='dele j-dele' address-id='"+data[i].id+"' href='javascript:;'></a>"+
		             "</div>"+
		             "<div class='address-content'>"+
		                "<div class='address-info j-address-info'>"+
		                    "<p class='customer-info clearfix'>"+
		                        "<span class='contect-name'>"+data[i].receiveName+"</span>"+
		                        "<span class='contect-gender'>"+gender+"</span>"+
		                        "<span class='contect-phone'>"+data[i].receivePhone+"</span>"+
		                    "</p>"+
		                    "<p class='address-dtl'>"+
		                    "<span class='contect-address'>"+data[i].receiveAddress+"</span>"+ 
		                "</div>"+
		            "</div>"+
		           "</li>"
			);
		}
	}
	
	$(".edit").click(function () {
		console.log("----edit-----");
		var addressId = $(this)[0].attributes[1].value;
		window.location.href='./addressAdd.html?id='+addressId;
		
	});
    $(".dele").click(function () {
    	console.log("----dele-----");
    	var addressId = $(this)[0].attributes[1].value;
    	//调根据openId和收货地址ID 删除收货地址API
	});
	
	$("#editAddress").click(function () {
		    if($(".addr-manage").text() == "管理"){
		    	$(".contect-button").css("display","block");
				$(".contect-button").css("margin-right","15px");
				$(".contect-button").css("margin-top","22px");
				$(".addr-manage").text("取消");
				
		    }else{
		    	$(".contect-button").css("display","none");
				$(".contect-button").css("margin-right","0px");
				$(".contect-button").css("margin-top","0px");
				$(".addr-manage").text("管理");
		    }
	});
	renderAddAddress();//新增收货地址
	renderBack();
}

function renderAddAddress(){
	$(".address-add").click(function () {
		window.location.href='addressAdd.html';
	});
}
function renderBack(){
	$(".i-back").click(function () {
		window.history.go(-1);
	});
}