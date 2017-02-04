function renderTakeOutOrder(){
	getAllGoodsType();//获取所有商品分类
}
function getAllGoodsType(){
	var url="/sapi/goodsType/list?limit=1000&cursor=0";
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            console.log(data);
            goodsType = data;
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
           			 console.log($(this));
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
            	                           "<i class='icon i-add-food' id='"+i+"'></i>"+
            	                        "</a>"+
            	                        "<span class='j-item-num foodop-num' id='add_"+i+"' style='display:none'>0</span>"+
            	                         "<a class='j-remove-item remove-food' id='remove-food_"+i+"' style='display:none' href='javascript:;'>"+
            	                            "<i class='icon i-remove-food' id='remove_"+i+"'></i>"+
            	                         "</a>"+ 
            	                      "</div>"+    
            	                  "</div>"+ 
            	                "</div>"+ 
            	            "</div>"
            		);
            	}
            	$(".i-add-food").click(function () {
        			$("#add_"+$(this)[0].id).css("display","block");
        			$("#add_"+$(this)[0].id).text(parseInt($("#add_"+$(this)[0].id).text())+1);
        			$("#remove-food_"+$(this)[0].id).css("display","block");
        			
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
        		});
            	$(".i-remove-food").click(function () {
        			var id=$(this)[0].id.split("_")[1];
        			$("#add_"+id).text(parseInt($("#add_"+id).text())-1);
        			if($("#add_"+id).text() == 0){
        				$("#add_"+id).css("display","none");
        				$("#remove-food_"+id).css("display","none");
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