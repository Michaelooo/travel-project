$(function() {
	var $box = $('.m-map');
	var $buttons = $('.m-map-menu >li'),
		$links = $('.m-map-main >li'),
		$details = $('.m-map-detail >li');
	var $main = $('.m-map-main');


	//切换
	var switchover = function(index) {
		var left = $box.outerWidth() / 2 - parseInt($links.eq(index).css('left')),
			top = $box.outerHeight() / 2 - parseInt($links.eq(index).css('top'));
		$buttons.removeClass('_current').eq(index).addClass('_current');
		$main.css({
			left: left,
			top: top
		});
		setTimeout(function() {
			$links.removeClass('_open').eq(index).addClass('_open');
		}, 300);
	};


	//事件
	$('.m-map-menu').on('click', 'li', function() {
		switchover($(this).index());
	});
	$('.m-map-main').on('click', 'li', function(event) {
		if (event.target === this) {
			switchover($(this).index());
		}
	});
	$('.m-map-main').on('click', 'li >div >div', function() {
		var index = $(this).parent().parent('li').index();
		var $bigImg = $details.eq(index).addClass('_open').children('._right');
		// //delete all active
		// $('.section .fp-section .active').removeClass('active');
		// $('.m-map-detail ._open').find('.fp-section').addClass('active');
		var src = $bigImg.data('src');
		if (src) {
			var $img = $('<img>');
			$img[0].onload = function() {
				$bigImg.addClass('_loaded').removeAttr('data-src')
					.css('backgroundImage', 'url(' + src + ')');
			};
			$img.attr('src', src);
		}
		var detailWrap = $details.eq(index);
		var $picWrap = detailWrap.find('.picWrap');
		var $blackBoard = detailWrap.find('.blackBoard');
		var $title = detailWrap.find('.blackBoard h3');
		var $smallText = detailWrap.find('.blackBoard .smallText');
		var $pText = detailWrap.find('.blackBoard p');
		setTimeout(function() {
			$blackBoard.animate({
				left: "0px"
			}, 500);
			$title.animate({
				opacity: 1
			}, 500);
			$smallText.animate({
				opacity: 1
			}, 500);
			$pText.animate({
				opacity: 1
			}, 500);
		}, 500)
	});

	$('.m-map-detail').on('click', 'li >._close', function() {
		var index = $(this).parent('li').index();
		// $('.m-map-detail ._open').find('.fp-section').removeClass('active');
		$details.eq(index).removeClass('_open');
	});

	$('.m-map-detail').on('click', 'li >._openButton', function() {
		var index = $(this).parent('li').index();
		var detailWrap = $details.eq(index);
		var $picWrap = detailWrap.find('.picWrap');
		var $controlImg = detailWrap.find('.clickButton');
		var $blackBoard = detailWrap.find('.blackBoard');
		var _openButton = detailWrap.find('._openButton');

		//点击之后的操作
		var $img = $controlImg.find('img');
		$img.show();
		_openButton.hide();
		$blackBoard.animate({
			left: "-750px"
		}, 500);

		//bind event
		var $prev = detailWrap.find('.previousButton');
		var $close = detailWrap.find('.closeButton');
		var $next = detailWrap.find('.nextButton');

		$prev.click(function() {
			
			$.fn.fullpage.moveSlideLeft();
		});
		$next.click(function() {
			$.fn.fullpage.moveSlideRight();
		});
		$close.click(function() {
			$img.hide();
			_openButton.show();
			$blackBoard.animate({
				left: "0px"
			}, 500);
		});
	});

	$('.m-map-detail .picWrap').fullpage();
	$.fn.fullpage.setAllowScrolling();
	$('.fp-controlArrow').hide();

	var _id;
	$(window).resize(function() {
		clearTimeout(_id);
		_id = setTimeout(function() {
			$links.filter('._open').trigger('click');
		}, 300);
	});

	//lazyload
	$(".picContent .section .slide").lazyload({
		threshold: 0,
		effect: "fadeIn",
		event: 'mouseover',
		placeholder: "../image/icon-loading.png"
	});

	//初始化
	switchover(0);
});