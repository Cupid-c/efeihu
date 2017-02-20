$(function() {
	$('#header').load('common-head.html?r=' + Math.random());
	$('#footer').load('common-foot.html?r=' + Math.random());

	///////////////////////////////////////////轮播图	

	var n = 0;
	var move = function() {
		n = n % 5;
		n++;
		$('.list1 li').fadeOut(300);
		$('.list1 li:nth-child(' + n + ')').fadeIn(300);
		$('.list2 li').css({
			'background': 'black'
		});

		$('.list2 li:nth-child(' + n + ')').css({
			'background': '#f00'
		})
	}
	move();
	var timer = setInterval(move, 1500)

	$('.list2 li').each(function(num, obj) {
		$(obj).click(function() {
			n = num;
			move();
			clearInterval(timer)
			timer = setInterval(move, 1500)

		})
	})

	$('.pre').click(function() {
		if(n == 1) {
			n = 4;
		} else {
			n -= 2;
		}
		move();
		clearInterval(timer)
		timer = setInterval(move, 1500)
	})
	$('.next').click(function() {
		move();
		clearInterval(timer)
		timer = setInterval(move, 1500)
	})

	$('.navigation .box').mouseenter(function() {
		$('.navigation .box>a').stop().fadeIn(200);
		clearInterval(timer)
	})
	$('.navigation .box').mouseleave(function() {
		$('.navigation .box>a').stop().fadeOut(200);
		clearInterval(timer)
		timer = setInterval(move, 1500)
	})

	//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
})


