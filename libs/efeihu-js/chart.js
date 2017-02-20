$(function() {

	$('#header').load('common-head.html?r=' + Math.random(), function() {
		$('#header .nav').remove();
		$('#header .middle').remove();
	});

	$('#footer').load('common-foot.html?r=' + Math.random(), function() {
		$('#footer .lo').remove()
		$('#footer .content').remove()
	});

	///////////////////////////////////////////////////////////////////////getcookie
	function get_cookie() {
		var GOODIMG = "IMG"
		var GOODNAMES = "GOODSNAMES";
		var GOODPRICES = "PRICES";
		var GOODNUM = "NUM"
			//====cookie 读取cookie里的数据
		var goodimgsStr = getCookie(GOODIMG);
		var goodnamesStr = getCookie(GOODNAMES); //注意读取出来的数据类型为字符串
		var goodpricesStr = getCookie(GOODPRICES);
		var goodnumsStr = getCookie(GOODNUM);

		//===把字符串转化为数组
		var goodsImgArray = [];
		var goodsNameArray = []; //存储商品名字的数组
		var goodsPriceArray = []; //存储商品价格的数组
		var goodsNumArray = [];

		if(goodnamesStr) {

			goodsImgArray = goodimgsStr.split("&");
			goodsNameArray = goodnamesStr.split("&");
			goodsPriceArray = goodpricesStr.split("&");
			goodsNumArray = goodnumsStr.split("&");

		}

		//=====end cookie

		for(var i = 0; i < goodsNameArray.length; i++) {
			var img = goodsImgArray[i];
			var name = goodsNameArray[i];
			var price = goodsPriceArray[i];
			var num = goodsNumArray[i];
			var html = "";

			html += "<tr>";
			html += '<td class="checknum">';
			html += '<input type="checkbox" value=""  checked="checked"/>';
			html += '</td>';
			html += '<td class="chart-con">';
			html += '<div class="goods-img">';
			html += '<a href="#"><img src="' + img + '"/></a>';
			html += '</div>';
			html += '<div class="go-na">' + name + '</div>'
			html += '<div class="go-num">'
			html += '<div class="input_pm">'
			html += '<input type="text" name="" id="" value="' + num + '" disabled="true"/>'
			html += '<span class="plus"></span>'
			html += '<span class="minus"></span>'
			html += '</div>'
			html += '</div>'
			html += '<div class="go-pir">$<em>' + price + '</em></div>'
			html += '<div class="go-tog">$<em>' + (price * num) + '</em></div>'
			html += '<div class="go-op"><a>删除</a></div>'
			html += '</td>'
			html += '</tr>'

			$(html).prependTo('.my-chart tbody');

		}
	}
	get_cookie();

	/////////////////////////////////////////////////////////////////////////////////removecookie	
	function remove_cookie(name) {
		var d = new Date();
		d.setDate(d.getDate() + 7);

		var GOODIMG = "IMG"
		var GOODNAMES = "GOODSNAMES";
		var GOODPRICES = "PRICES";
		var GOODNUM = "NUM"

		var goodimgsStr = getCookie(GOODIMG);
		var goodnamesStr = getCookie(GOODNAMES); //注意读取出来的数据类型为字符串
		var goodpricesStr = getCookie(GOODPRICES);
		var goodnumsStr = getCookie(GOODNUM);

		var goodimgsArray = [];
		var goodnamesArray = []; //存储从cookie读取的，转化为数组的商品名字
		var goodpricesArray = []; //存储从cookie读取的，转化为数组的商品价格
		var goodnumsArray = [];
		if(goodnamesStr) {
			//因为对去出来的数据为字符串，不便于我们操作，所以讲字符串转化为数组
			//这里注意我们一定要统一分割字符串的字符,这里用 &
			goodimgsArray = goodimgsStr.split("&");
			goodnamesArray = goodnamesStr.split("&");
			goodpricesArray = goodpricesStr.split("&");
			goodnumsArray = goodnumsStr.split("&");

		}

		/////删除对应元素
		for(var i = 0; i < goodnamesArray.length; i++) {
			if(goodnamesArray[i] == name) {

				goodimgsArray.splice(i, 1);
				goodnamesArray.splice(i, 1);
				goodpricesArray.splice(i, 1);
				goodnumsArray.splice(i, 1);

				var tmpImgStr = goodimgsArray.join("&");
				var tmpNameStr = goodnamesArray.join("&"); //字符串和数组之间的相互转化的字符串要一致
				var tmpPriceStr = goodpricesArray.join("&"); //
				var tmpNumStr = goodnumsArray.join("&");

				console.log("tmpNameStr:" + tmpNameStr);

				//cookie的数据准备好了，接下来就是更新cookie里的数据
				removeCookie(GOODIMG);
				removeCookie(GOODNAMES);
				removeCookie(GOODPRICES);
				removeCookie(GOODNUM);
				console.log("删除coo " + document.cookie)
				var d = new Date();
				d.setDate(d.getDate() + 7);

				setCookie(GOODIMG, tmpImgStr, d)
				setCookie(GOODNAMES, tmpNameStr, d);
				setCookie(GOODPRICES, tmpPriceStr, d);
				setCookie(GOODNUM, tmpNumStr, d)
				return 0;
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////cookiechance

	function change_cookie(name, num) {
		var d = new Date();
		d.setDate(d.getDate() + 7);

		var GOODNAMES = "GOODSNAMES";
		var GOODNUM = "NUM"

		var goodnamesStr = getCookie(GOODNAMES);
		var goodnumsStr = getCookie(GOODNUM);

		var goodnamesArray = [];
		var goodnumsArray = [];
		if(goodnamesStr) {

			goodnamesArray = goodnamesStr.split("&");
			goodnumsArray = goodnumsStr.split("&");

		}

		/////更改购物车数量cookie
		for(var i = 0; i < goodnamesArray.length; i++) {
			if(goodnamesArray[i] == name) {
				goodnumsArray[i] = parseInt(num);
				var NumStr = goodnumsArray.join("&");
				removeCookie(GOODNUM);
				setCookie(GOODNUM, NumStr, d)
			}
		}
	}

	//////////////////////////////////////////////物品数量

	$('.my-chart table  .go-num .input_pm span.minus').click(function() {
		if($(this).closest('tr').find(".input_pm input").val() == 1) {
			alert("商品数量最少为1");
			return;
		}
		$(this).closest('tr').find(".input_pm input").val(parseInt($(this).closest('tr').find(".input_pm input").val()) - 1);
		$(this).closest('tr').find('.go-tog em').html(parseInt($(this).closest('tr').find(".input_pm input").val()) * parseInt($(this).closest('tr').find(".go-pir em").html()))
		var name = $(this).closest('tr').find('.go-na').html();
		var num = $(this).closest('tr').find(".input_pm input").val();
		change_cookie(name, num);
		togal();
	})
	$('.my-chart table  .go-num .input_pm span.plus').click(function() {

			$(this).closest('tr').find(".input_pm input").val(parseInt($(this).closest('tr').find(".input_pm input").val()) + 1);
			$(this).closest('tr').find('.go-tog em').html(parseInt($(this).closest('tr').find(".input_pm input").val()) * parseInt($(this).closest('tr').find(".go-pir em").html()))
			var name = $(this).closest('tr').find('.go-na').html();
			var num = $(this).closest('tr').find(".input_pm input").val()
			change_cookie(name, num);
			togal();
		})
		//、、、、、、、、、、、、、、、、、、、删除
	$('.my-chart table  .go-op a').click(function() {
		var name = $(this).closest('tr').find('.go-na').html();
		remove_cookie(name);
		$(this).closest('tr').remove();

		togal();
	})

	//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、选择

	$('.my-chart  th.checknum input').click(function() {

		if($(this).is(':checked')) {

			$('.my-chart  td.checknum input').prop('checked', 'checked');
			togal();
		} else {
			$('.my-chart  td.checknum input').prop('checked', false);
			togal();
		}
	})

	$('.my-chart  td.checknum input').click(function() {
		togal();
	})

	////////////////////////////////////////////////////////////////总价格

	function togal() {
		$('.price_TOGLE .price em').html(0);

		$('tbody tr').each(function() {

			if($(this).find('td.checknum input').is(':checked')) {
				console.log(213)
				$('.price_TOGLE .price em').html(parseInt($('.price_TOGLE .price em').html()) + parseInt($(this).find(".go-tog em").html()));
			}

		})
	}
	togal();

})
