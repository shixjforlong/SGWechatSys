function renderTakeOutOrder(){
	getAllGoodsType();//获取所有商品分类
}
function getAllGoodsType(){
	var paramObj = GetRequest();
	var openId = paramObj.openId;
	$("#openId_").val(openId);
	
	var url="/sapi/goodsType/list?limit=1000&cursor=0";
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            console.log(data);
            if(data.result && data.result.length>0){
           	 for(var i=0;i<data.result.length;i++){
           		 $("#goodsTypeList").append(
           				 "<div id='"+data.result[i].id+"' name='"+data.result[i].name+"' class='j-tag tag' data-key='17632727'>"+
           	               "<div class='tag-inner'>"+
           	                 "<span class='tag-text'>"+data.result[i].name+"</span>"+
           	               "</div>"+
           	            "</div>" 
           		 );
           		 $("#"+data.result[i].id).click(function () {
           			 $("div").removeClass("focus");
           			 $(this).addClass("focus");
           			 var typeId = $(this)[0].id;
           			 var typeName = $(this)[0].innerText;
           			 getGoodsInfoByTypeId(typeId,typeName);//根据商品分类ID获取对应的商品信息
           		 });
           	 }
            }
        }
    });
}
function getGoodsInfoByTypeId(typeId,typeName){
	var url="/sapi/goods/list?limit=10000&cursor=0";
    if(typeId){
    	url = url+"&typeID="+typeId;
    }
    url = url+"&state=0";
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            console.log(data);
            $("#mainwrap").html("");
            $("#mainwrap").append(
     		       "<div class='foodlistwrap' style='transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);'>"+
     	            "<div id='foodlist100' data-tagid='100' class='j-foodlist foodlist'>"+ 
     	              "<h3 class='foodlist-label'>"+typeName+"</h3>"+
     	              "<div class='goods'></div>"+
     	            "</div>"+
     	          "</div>"
     		);
            if(data.result && data.result.length>0){
            	for(var i=0;i<data.result.length;i++){
            		$(".goods").append(
            				"<div class='j-fooditem fooditem food134024201 clearfix' data-spuid='134024201' data-skuid='143043471'>"+
            	                "<div class='food-pic-wrap'>"+ 
            	                  "<img class='j-food-pic food-pic' src='http://101.201.150.141/file/"+data.result[i].imageName+"' data-src-retina='http://p0.meituan.net/100.100.90/xianfu/75f0ba60112e090b9fb7eb2f2b322b3d37495.jpg' visibility='hidden' style='width: 82.6667px; height: 62px; margin-left: -10.3333px; margin-top: 0px; visibility: visible;'>"+  
            	                "</div>"+ 
            	                "<div class='food-cont-wrap'>"+
            	                  "<div class='food-cont'>"+ 
            	                      "<div class='j-foodname foodname'>"+data.result[i].name+"</div>"+
            	                      "<div class='food-desc'>"+data.result[i].descript+"</div>"+
            	                      "<div class='food-content-sub'>"+ 
            	                        "<span>月售&nbsp;0</span>"+
            	                        "<span class='food-good'>赞4</span>"+ 
            	                      "</div>"+ 
            	                      "<div class='food-price-region'>"+  
            	                        "<span class='food-price' id='price_"+i+"' val='"+data.result[i].price/100+"' >¥"+(data.result[i].price/100)+"</span>"+   
            	                      "</div>"+    
            	                      "<div class='j-item-console foodop clearfix'>"+ 
            	                        "<a class='j-add-item add-food' href='javascript:;'>"+
            	                           "<i class='icon i-add-food' id='"+i+"' goodsId='"+data.result[i].id+"' goodsName='"+data.result[i].name+"' goodsPrice='"+data.result[i].price/100+"'></i>"+
            	                        "</a>"+
            	                        "<span class='j-item-num foodop-num' id='add_"+i+"' style='display:none'>0</span>"+
            	                         "<a class='j-remove-item remove-food' id='remove-food_"+i+"' style='display:none' href='javascript:;'>"+
            	                            "<i class='icon i-remove-food' id='remove_"+i+"' goodsId='"+data.result[i].id+"'></i>"+
            	                         "</a>"+ 
            	                      "</div>"+    
            	                  "</div>"+ 
            	                "</div>"+ 
            	            "</div>"
            		);
            	}
            	
            	var m = [];
            	$(".i-add-food").click(function () {
        			$("#add_"+$(this)[0].id).css("display","block");
        			$("#add_"+$(this)[0].id).text(parseInt($("#add_"+$(this)[0].id).text())+1);
        			$("#remove-food_"+$(this)[0].id).css("display","block");
        			
        			console.log($(this));
        			
        			var price =  $("#total").text();
        			if(price){
        			}else{
        				price = 0;
        			}
        			
        			var flag = $("#flag").text();
        			if(flag){
        			}else{
        				flag = 0;
        			}
        			flag = parseInt(flag) + 1;
        			$("#flag").text(flag);
        			
        		    price = parseInt(price) +parseInt($("#price_"+$(this)[0].id)[0].attributes[2].value);
        		    $("#total").text(price);
        			//购物车
        			$(".j-cart-icon").html("");
        			$(".j-cart-icon").append(
        					"<i class='j-ico-cart spec-ico-cart ico-cart-active'></i>"+
        					"<div class='j-cart-num cart-num'>"+flag+"</div>"
        			);
        			
        			$(".j-cart-empty").css("display","none");
        			$(".j-cart-noempty").css("display","block");
        			$(".j-cart-price").text("￥"+price);
        			if(price<20){
        				var less = 20 - price;
        				$(".cart-btns").html('');
        				$(".cart-btns").append(
        					"<a class='cart-btn-unavail'>"+
        			               "<span class='inner'>还差¥"+less+"</span>"+
        			        "</a>"
        				);
        			}else{
        				$(".cart-btns").html('');
        				$(".cart-btns").append(
        						"<a class='cart-btn-confirm' href='javascript:;'>"+
        						  "<span class='inner'>去结算</span>"+
        						"</a>"
        				);
        			}
        			
        			var goodsId = $(this)[0].attributes[2].value;
        			var goodsName = $(this)[0].attributes[3].value;
        			var goodsPrice = $(this)[0].attributes[4].value;
        			if(m.indexOf(goodsId) > -1){
        				var count = $("#td_"+goodsId).text();
        				$("#td_"+goodsId).html(parseInt(count)+1);
        			}else{
        			    m.push(goodsId);
        			    $("#carList").append(
   	        			   "<tr id='tr_"+goodsId+"'>"+
   	        			     "<td>"+goodsName+"</td>"+
   	        			     "<td id='td_"+goodsId+"'>1</td>"+
   	        			     "<td>"+goodsPrice+"</td>"+
   	        			   +"</tr>"		
   	        	       );
        			}
        			
        			//结算
        			$(".cart-btn-confirm").click(function () {
        				var tableObj =document.getElementById("carList");
        				var goodsStr = "";
        				for(var i=0;i<tableObj.rows.length;i++){
        					for(var j=0;j<tableObj.rows[i].cells.length;j++){
	                			var cell = tableObj.rows[i].cells[j].innerText;
							    if(j == 2){
							    	goodsStr += cell+";";
								}else{
									goodsStr += cell+",";
								}
					    	}
        				}
        				var openId_ = $("#openId_").val();
        				
        				window.location.href="orderConfirm.html?openId="+openId_+"&goodsStr="+goodsStr;
        			});
        		});
            	$(".i-remove-food").click(function () {
        			var id=$(this)[0].id.split("_")[1];
        			$("#add_"+id).text(parseInt($("#add_"+id).text())-1);
        			if($("#add_"+id).text() == 0){
        				$("#add_"+id).css("display","none");
        				$("#remove-food_"+id).css("display","none");
        			}
        			
        			var goodsId = $(this)[0].attributes[2].value;
        			var count = $("#td_"+goodsId).text();
        			if(count>1){
        				$("#td_"+goodsId).html(parseInt(count)-1);
        			}else if(count == 1){
        				m.removeByValue(goodsId);
        				$("#tr_"+goodsId).remove();
        				
        			}
    				
        			
        			//购物车
        			var flag = $("#flag").text();
        			flag = parseInt(flag) - 1;
        			$("#flag").text(flag);
        			$(".j-cart-num").html(flag);
        			
        			var goodsPrice = parseInt($("#price_"+id)[0].attributes[2].value);
        			var total =  $("#total").text();
        			var  residue= parseInt(total) - goodsPrice;
        			$("#total").text(residue);
        			$(".j-cart-price").text("￥"+residue);
        			
        			if(residue<20 && residue>0){
        				var less = 20 - residue;
        				$(".cart-btns").html('');
        				$(".cart-btns").append(
        					"<a class='cart-btn-unavail'>"+
        			               "<span class='inner'>还差¥"+less+"</span>"+
        			        "</a>"
        				);
        			}else if(residue == 0){
        				$(".cart-btns").html('');
        				$(".cart-btns").append(
        					"<a class='cart-btn-unavail'>"+
        			               "<span class='inner'>¥20起送</span>"+
        			        "</a>"
        				);
        				$(".j-cart-empty").css("display","block");
            			$(".j-cart-noempty").css("display","none");
            			
            			$(".j-cart-icon").html("");
            			$(".j-cart-icon").append(
            					 "<i class='j-ico-cart spec-ico-cart'></i>"
            			);
        			}else{
        				$(".cart-btns").html('');
        				$(".cart-btns").append(
        						"<a class='cart-btn-confirm' href='javascript:;'>"+
        						  "<span class='inner'>去结算</span>"+
        						"</a>"
        				);
        			}
        		});
            }
        }
    });
}
Array.prototype.removeByValue = function(val) {
	  for(var i=0; i<this.length; i++) {
	    if(this[i] == val) {
	      this.splice(i, 1);
	      break;
	    }
	  }
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
