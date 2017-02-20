$(function() {
	$("#header").load("common-head.html?_=" + Math.random());
	$("#footer").load("common-foot.html?_=" + Math.random());
	$('#pop-up').load("pop-up.html?_=" + Math.random());
	//////////////
	$('.content-left .sortlist h3').click(function() {
		if($(this).hasClass('color')) {
			$(this).removeClass('color');
			$(this).css("color", "#666");
			$(this).find('b').css("background", "url(img/list-page/20130225plus.png)")
			$(this).parent().find('.sortlist2').css("display", "none");
		} else {
			$(this).addClass('color');
			$(this).css("color", "#C7012C");
			$(this).find('b').css("background", "url(img/list-page/20130225minus.png)")
			$(this).parent().find('.sortlist2').css("display", "block");
		}

	})

	/////////////////////////////
	$('.content-left .hot-list .tap-list li:first-child').css({
		"color": "#fff",
		"background": "#C7012C"
	})
	$(".content-left .hot-list .ul-list ul:first-child").css("display", "block");
	$('.content-left .hot-list .tap-list li').mousemove(function() {
			$(this).parent().find('li').css({
				"color": "#666",
				"background": " #D9D9D9"
			})
			$(this).css({
				"color": "#fff",
				"background": "#C7012C"
			});
			$(".content-left .hot-list .ul-list ul").css("display", "none");
			$(".content-left .hot-list .ul-list").find("ul[na='" + ($(this).attr('na')) + "']").css("display", "block");
		})
		///////////////////////////////////////////////////////////////////////////////////////////////////	
	var _obj = {
		baseDom: '.goods-list>div',
		cloneSize: 20,
		url: "libs/data/goods.txt",
		pageContainer: '#pagination-demo1',
		page: true
	};
	$.cloneDom(_obj);
	//////////////////////////////////////////////////////////////////

	$('.goods-list').on("click", 'a.join', function() {
		var $this_j = $(this);

		$('.shop-tip-wrap').show();
		set_cookie($this_j);

	})

	//////////////////////////////////////////////////////////////////////////////////////////////////////传到主页面
	$('.goods-list').on("click", '.ui-pimg', function() {
		var $this = $(this);
		send_goods($this)
	})
	$('.goods-list').on("click", '.ui-nam', function() {
		var $this = $(this);
		send_goods($this)
	})
	$('.goods-list').on("click", '.appraise', function() {
		var $this = $(this);
		send_goods($this)
	})

	///////////////////////////////////////////////////////////////////////商品转到详情页

	function send_goods($this) {
		var det_name = $this.closest('.list-box').find('.ui-pat .ui-nam a').html(); ////获取列表页商品值
		var det_img = $this.closest('.list-box').find(' .ui-pimg img')[0].src
		var det_pri = $this.closest('.list-box').find(' .ui-pat .ui-pri em').html();
		var d = new Date();
		setCookie("det_name", det_name, d);
		setCookie("det_img", det_img, d);
		setCookie("det_pri", det_pri, d);
	}

})

