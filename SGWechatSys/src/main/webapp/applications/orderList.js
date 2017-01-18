

function renderOrderList(){
	var orderList=[];
	var orderObj1={
			goodsImage:"//xs01.meituan.net/waimai_i/img/shoploading.42591fec.png",//商品图片
			status:"待评价",//状态  0:待支付 1：待评价  2：已完成
			price:"12",
			createTime:"2017-01-12 11:18"//订单时间
	};
	var orderObj2={
			goodsImage:"//xs01.meituan.net/waimai_i/img/shoploading.42591fec.png",//商品图片
			status:"待评价",//状态  0:待支付 1：待评价  2：已完成
			price:"12",
			createTime:"2017-01-12 11:18"//订单时间
	};
	var orderObj3={
			goodsImage:"//xs01.meituan.net/waimai_i/img/shoploading.42591fec.png",//商品图片
			status:"待评价",//状态  0:待支付 1：待评价  2：已完成
			price:"12",
			createTime:"2017-01-12 11:18"//订单时间
	};
	orderList.push(orderObj1);
	orderList.push(orderObj2);
	orderList.push(orderObj3);
	console.log(orderList);
	if(orderList.length>0){
		for(var i=0;i<orderList.length;i++){
			$("#order-list").append("<div class='field'>" +
					 "<div class='field-head'>"+
                        "<a href='/restaurant/72894237627578801' class='field-head-name'>食国</a>"+
                          "<span class='field-head-status field-head-status-light'>"+orderList[i].status+"</span>"+
                      "</div>"+
                      "<a class='field-item clearfix' href='/order/statusdetail/1724231384054608'>"+
                         "<div class='avatar'>"+
                            "<img src='"+orderList[i].goodsImage+"' data-src-retina='http://p0.meituan.net/xianfu/52193272b636cd71816f253a29799e81115051.jpg' class='j-avatar-img avatar-img'/>"+
                         "</div>"+
                         "<div class='content'>"+
                            "<p class='price'>￥"+orderList[i].price+"</p>"+
                            "<p class='order-time'>"+orderList[i].createTime+"</p>"+
                            "<p class='delivery_tip'>由食国提供配送服务</p>"+
                         "</div>"+
                         "<i class='field-arrow icon-arrow-right'></i>"+
                       "</a>"+
                       "<div class='field-console'>"+
                          "<div class='field-console-btns'>"+
                             "<a class='combtn field-btn'   href=''>评价</a>"+
                             "<button class='j-field-buy-again combtn field-btn-gray' data-poi-id='172423' data-poi-valid='1' data-view-id='1724231384054608'>再来一单</button>"+
                          "</div>"+
                       "</div>"+
					"</div>");
		}
	}
	
	
}
