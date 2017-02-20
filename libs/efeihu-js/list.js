$(function(){
	$("#header").load("common-head.html?_="+Math.random());
	$("#footer").load("common-foot.html?_="+Math.random());
	$('#pop-up').load("pop-up.html?_=" + Math.random());
	//////////////
	$('.content-left .sortlist h3').click(function(){
		if ($(this).hasClass('color')) {
			$(this).removeClass('color');
			$(this).css("color","#666");
			$(this).find('b').css("background","url(img/list-page/20130225plus.png)")
			$(this).parent().find('.sortlist2').css("display","none");
		} else{
			$(this).addClass('color');
			$(this).css("color","#C7012C");
			$(this).find('b').css("background","url(img/list-page/20130225minus.png)")
			$(this).parent().find('.sortlist2').css("display","block");
		}
		

	})
	
	
	/////////////////////////////
	$('.content-left .hot-list .tap-list li:first-child').css({"color":"#fff","background":"#C7012C"})
	$(".content-left .hot-list .ul-list ul:first-child").css("display","block");
	$('.content-left .hot-list .tap-list li').mousemove(function(){
		$(this).parent().find('li').css({"color":"#666","background":" #D9D9D9"})
		$(this).css({"color":"#fff","background":"#C7012C"});
		$(".content-left .hot-list .ul-list ul").css("display","none");
		$(".content-left .hot-list .ul-list").find("ul[na='"+($(this).attr('na'))+"']").css("display","block");
	})
	
	//////////////////////////////////
	var page = function(_pageindex, _isgenerate){
				$.get('goods.txt', {'_': Math.random()}, function(response){
					var obj = JSON.parse(response);
					
					var pageCount = obj.totalCount % obj.pageSize > 0 ? parseInt(obj.totalCount / obj.pageSize) + 1 :  parseInt(obj.totalCount / obj.pageSize)
					var pageFlag = '';
					var goods = "";
					for (var i = (_pageindex-1)*obj.pageSize;i<_pageindex*obj.pageSize;i++) {
						if (!obj.result[i]) {
							break;
						}
						goods+= "<div class = 'list-box'>"
						goods+=		"<div class='ui-pimg'>"
						goods+=			"<a href='detailed-page.html  '><img src='"+ obj.result[i].src+"'/></a>"
						goods+=		 "</div>"
						goods+=   	"<div class='ui-pat'>"
						goods+=			"<p class='ui-nam'><a href='detailed-page.html  '> "+obj.result[i].title+"</a></p>"
						goods+=			"<p class='ui-pri'>$<em>"+obj.result[i].price+"</em></p>"
						goods+=			"<div class='appraise'>"
						goods+=				'<a href="detailed-page.html ">(39W条评论)</a>'
						goods+=			'</div>'
						goods+=			'<div class="op">'
						goods+=				'<a href="chart.html" class="buy" target="_blank">快速购买</a>'
						goods+=				'<a  class="join">加入购物车</a>'
						goods+=			'</div>'
						goods+= 	'</div>'
						goods+="</div>"
					}
					$(goods).appendTo('.content-right .goods-list');
///////////////////////////////////////////////////////////////////////////////传到购物车
								
					$('.goods-list').on("click",'a.join',function(){
						var $this_j = $(this);
						
						$('.shop-tip-wrap').show();
						set_cookie($this_j);
						
						
					})
//////////////////////////////////////////////////////////////////////////////////////////////////////传到主页面
					$('.goods-list').on("click",'.ui-pimg',function(){
						var $this = $(this);
						send_goods($this)
					})
					$('.goods-list').on("click",'.ui-nam',function(){
						var $this = $(this);
						send_goods($this)
					})
					$('.goods-list').on("click",'.appraise',function(){
						var $this = $(this);
						send_goods($this)
					})
					
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、					
					if(!_isgenerate){
						return false;
					}
					for(var i = 1; i <= pageCount; i++){
						pageFlag += ('<a>' + i + '</a>');
					}
					
					$(pageFlag).insertAfter('.content-right .page-btn .pre');
				})
	}
/////////////////////////////////////////////////////////////////////翻页
	page(1,true);
	var index  =1;
	var bin = 1;
	$('.content-right .page-btn').on('click',"a", function(evt){
		index = $(this).text()
		$(".content-right .goods-list").html("  ");
		if ($(this).hasClass("pre")) {
			index = bin;
			if (index==1) {
				page(1);
				return false;
			}
			index--;
		}else if ($(this).hasClass("next")) {
			index = bin;
			if (index==$(this).prev().text()) {
				page($(this).prev().text())
				return false ;
			}
			index++;
		}
		bin = index;
		var	$click = $('.content-right .page-btn a:nth-child('+(parseInt(index)+1)+')');
		page(index);
		$click.siblings().css("background","#fff");
		$click.css("background","#EFEFEF");
	})
	
	
	///////////////////////////////////////////////////////////////////////商品转到详情页
	
	function send_goods($this){
			var det_name = $this.closest('.list-box').find('.ui-pat .ui-nam a').html();////获取列表页商品值
			var det_img = $this.closest('.list-box').find(' .ui-pimg img')[0].src
			var det_pri =$this.closest('.list-box').find(' .ui-pat .ui-pri em').html();
			var d = new Date();
			setCookie("det_name", det_name, d);
            setCookie("det_img", det_img, d);
            setCookie("det_pri", det_pri, d);
	}
	
	
	
})

