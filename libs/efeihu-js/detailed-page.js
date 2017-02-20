$(function() {
	$("#header").load("common-head.html?_=" + Math.random());
	$("#footer").load("common-foot.html?_=" + Math.random());

	////////////////////////////////////////////////////////////////////////////获取列表页信息

	var newGood_name = getCookie("det_name");
	var newGood_img = getCookie("det_img");
	var newGood_pri = getCookie('det_pri')
	if(newGood_name) {
		$('.main-show .preview .bigPic img').attr("src", newGood_img);
		$('.main-show .summary .mainshow-name span').html(newGood_name);
		$('.main-show .summary .sum-price p>strong em').html(newGood_pri);
	}

	//////////////////////////////////////////
	var $bigimg = $(".main-show .preview .bigPic img");
	var $smallimg = $(".preview .preview-small .content li");
	$smallimg[0].className = "cru";
	$smallimg.mouseover(function() {
		$smallimg.removeClass();
		$(this).removeClass().addClass("cru")
		console.log($bigimg[0])
		$bigimg[0].src = $(this).find('img')[0].src
		$bigimg.attr("jqimg", $(this).find('img')[0].src)
	});

	$(".bigPic").jqueryzoom({
		xzoom: 200, //放大区域宽度
		yzoom: 200, //放大区域高度
		preload: 1, //是否显示预加载
		offset: 50, //放大区域偏离小图的距离
		position: "right", //放大区域显示的位置（left,right）
		lens: true //是否显示小图上的透明区域
	});
	//////////////////////////////////////////////////////位置

	$('.main-show .summary .stock .stock-mt').click(function() {
		$(this).toggleClass('show');
		if(!$('.main-show .summary .stock .stock-mc').hasClass('mcshow')) {
			$('.main-show .summary .stock .stock-mc').slideDown(200)
		} else {
			$('.main-show .summary .stock .stock-mc').slideUp(200)
		}
		$('.main-show .summary .stock .stock-mc').toggleClass('mcshow');

	})

	///////////////////////////////////////////////////////////////////////数量
	$('.main-show .summary .choose .choose-num .num span.minus').click(function() {
		if($('.main-show .summary .choose .choose-num .num input').val() == 1) {
			alert("商品数量最少为1");
			return;
		}
		$('.main-show .summary .choose .choose-num .num input').val(parseInt($('.main-show .summary .choose .choose-num .num input').val()) - 1);

	})
	$('.main-show .summary .choose .choose-num .num span.plus').click(function() {

		$('.main-show .summary .choose .choose-num .num input').val(parseInt($('.main-show .summary .choose .choose-num .num input').val()) + 1);

	})

	////////////////////////////////////////////////////////////////////////////////////tab
	var $tapli = $(".para .para-left .among .tap li");
	var $tapul = $(".para .para-left .among .ui-tap ul");
	$tapli[0].className = "hover";
	$tapul[0].className = "cru";
	$tapul.eq(0).find('li')[0].className = "cha";

	$tapli.mouseover(function() {
		var index = $(this).index();
		$tapli.removeClass();
		$(this).removeClass().addClass("hover");
		$tapul.removeClass();
		$tapul.eq(index).removeClass().addClass("cru");
		$tapul.eq(index).find('li')[0].className = "cha";
	});
	$tapul.find('li').mousemove(function() {
			var index = $(this).index();
			$tapul.find('li').removeClass();
			$(this).removeClass().addClass("cha");
		})
		///////////////////////////////////////////////////////////////////////////////////////////	
	var $para_li = $(".para .para-right .information>ul li");
	var $para_tap = $(".para .para-right .information .tab-in>div");
	$para_li[0].className = "show";
	$para_tap[0].className = "tab-in-items cur";

	$para_li.click(function() {
		var index = $(this).index();
		$para_li.removeClass();
		$(this).removeClass().addClass("show");
		$para_tap.removeClass('cur')
		$para_tap.eq(index).removeClass('cur').addClass("cur");
	});
	/////////////////////////////////////////////////////////////////////////////////////////////评论

	$('.comment .comment-rate .inc').click(function() {
		console.log($('.header-contain .myname'))
		if($('.header-contain .myname').length == 0) {
			alert("请先登录")
			return;
		}
		$('.input-comment textarea').val(" ");
		$(' .input-comment').show();
	})
	$('   .input-comment h3 a').click(function() {
		$('.input-comment').hide();
	})
	$('  .input-comment .refer').click(function() {

		function getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		}

		var texta = $('.input-comment textarea').val();
		var html = ""
		html += '<div class="comment-list-item">';
		html += '<div class="user">';
		html += '<p  class="userhead"></p>';
		html += '<p class="username">' + $('.header-contain .myname').html() + '</p>';
		html += '</div>';
		html += '<div class="content">';
		html += '<div class="content-top">';
		html += '<div class="score">';
		html += '<div class="star">';
		html += '</div>';
		html += '<div class="num">';
		html += '0分';
		html += '</div>';
		html += '<div class="sta">';
		html += '不满意';
		html += '</div>';
		html += '</div>';
		html += '<div class="time">';
		html += getNowFormatDate();
		html += '</div>';
		html += '</div>';
		html += '<div class="content-bg">';
		html += texta;
		html += '</div>';
		html += '</div>';
		html += '</div>';

		$('.input-comment').hide();
		$(html).prependTo('.comment .comment-list ');
	})

	///////////////////////////////////////////////////////////////////加入购物车
	$('.main-show .summary .choose .bnt .addchar').click(function() {

		$(' .shop-tip-wrap').show();
		set_cookie();

	})

	///////////////////////////////////////////////////////////////////////////立即购买

	$('.main-show .summary .choose .bnt .buynow').click(function() {
		set_cookie();
	})

	$('#pop-up').load("pop-up.html?_=" + Math.random());
})