$(function () {
	$('.loading').show();
	setTimeout(function () {
		$('.loading').hide();
		$('#picContent').fullpage({
			anchors: ['page1', 'page2', 'page3', 'page4'],
			menu: '#scrollMenu',
			resize: true
		});
		$.fn.fullpage.setAllowScrolling();
		$('.fp-controlArrow').hide();

		//lazyload
		$("#picContent .section .slide").lazyload({
			threshold: 200,
			effect: "fadeIn",
			event: 'mouseover',
			container: $('.slide'),
			placeholder: "../image/icon-loading.png"
		});

		//bind event
		var $prev = $('#previousButton');
		var $close = $('#closeButton');
		var $next = $('#nextButton');

		$spanText = $('.spanText');
		$spanText.animate({
				'opacity': 1
			},
			1000,
			function () {});

		$prev.click(function () {
			$spanText.animate({
					'opacity': 1
				},
				1000,
				function () {});
			$.fn.fullpage.moveSlideLeft();
		});
		$next.click(function () {
			$spanText.animate({
					'opacity': 1
				},
				1000,
				function () {});
			$.fn.fullpage.moveSlideRight();
		});
		$close.click(function () {
			window.location.href = '../html/focus.html';
		});
		/**
		 * 执行方法，有两个参数
		 * speed，表示滚动速度，数字越大表示越慢，
		 * rowHeight，表示滚动行的高度
		 */
		// $(function() {
		// 	$(".scrollText").myScroll({
		// 		speed: 60,
		// 		rowHeight: 600
		// 	});
		// });

		//文字特效
		var $spanTitle = $('.spanText >span');
		var $textWrapper = $('.textWrapper');
		$textWrapper.hover(function () {
			$spanTitle.stop().animate({
				'opacity': 0
			}, 500);
			$textWrapper.stop().animate({
				'top': 0,
				'height': 600
			}, 500);
		}, function () {
			$spanTitle.stop().animate({
				'opacity': 1
			}, 500);
			$textWrapper.stop().animate({
				'top': 60,
				'height': 150
			}, 500);
		});

		//点击li切换，加一个全局的loading
		function _style_li() {
			var $li = $('#footer >ul >li a');
			$li.click(function () {
				$('.loading').show();
				setTimeout(function () {
					$('.loading').hide();
				}, 700);
			})
		}
		_style_li();
	}, 700, )
});