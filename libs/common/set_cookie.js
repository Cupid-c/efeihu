function set_cookie($this) {

	var img = ($('.main-show .preview .bigPic img').attr("src")) || ($this.closest('.list-box').find(' .ui-pimg img')[0].src);
	var name = $('.main-show .summary .mainshow-name span').html() || $this.closest('.list-box').find('.ui-pat .ui-nam a').html();
	var price = $('.main-show .summary .sum-price p>strong em').html() || $this.closest('.list-box').find(' .ui-pat .ui-pri em').html();
	var num = $('.main-show .summary .choose .choose-num .num input').val() || 1;
	var d = new Date();
	d.setDate(d.getDate() + 7);

	var GOODIMG = "IMG"
	var GOODNAMES = "GOODSNAMES";
	var GOODPRICES = "PRICES";
	var GOODNUM = "NUM"

	var goodimgsStr = getCookie(GOODIMG);
	var goodnamesStr = getCookie(GOODNAMES);
	var goodpricesStr = getCookie(GOODPRICES);
	var goodnumsStr = getCookie(GOODNUM);

	var goodimgsArray = [];
	var goodnamesArray = []; //存储从cookie读取的，转化为数组的商品名字
	var goodpricesArray = []; //存储从cookie读取的，转化为数组的商品价格
	var goodnumsArray = [];
	if(goodnamesStr) {

		goodimgsArray = goodimgsStr.split("&");
		goodnamesArray = goodnamesStr.split("&");
		goodpricesArray = goodpricesStr.split("&");
		goodnumsArray = goodnumsStr.split("&");

	}

	/////判断是否重复
	for(var i = 0; i < goodnamesArray.length; i++) {
		if(goodnamesArray[i] == name) {
			goodnumsArray[i] = parseInt(goodnumsArray[i]) + parseInt(num);
			var NumStr = goodnumsArray.join("&");
			removeCookie(GOODNUM);
			setCookie(GOODNUM, NumStr, d)
			return 0;
		}
	}

	saveGoods(img, name, price, num);

	function saveGoods(img, name, price, num) {
		goodimgsArray.push(img);
		goodnamesArray.push(name);
		goodpricesArray.push(price);
		goodnumsArray.push(num);

		var tmpImgStr = goodimgsArray.join("&");
		var tmpNameStr = goodnamesArray.join("&");
		var tmpPriceStr = goodpricesArray.join("&"); //
		var tmpNumStr = goodnumsArray.join("&");

		console.log("tmpNameStr:" + tmpNameStr);

		//更新cookie里的数据
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
		console.log("加coo " + document.cookie)

	}
}