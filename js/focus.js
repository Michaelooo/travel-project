$(function () { //底部导航
	var open;
	$('#focus >._nav').on('click', function (event) {
		var $this = $(this);
		if (this === event.target) {
			if (!open) {
				open = true;
				$this.addClass('_open');
				setTimeout(function () {
					$('.header').one('click', function (event) {
						open = false;
						$this.removeClass('_open');
					});
				}, 0);
			} else {
				open = false;
				$this.removeClass('_open');
			}
		}
		// if (!open) {
		// 	open = true;
		// 	$this.addClass('_open');
		// 	setTimeout(function() {
		// 		$(document).one('click', function(event) {
		// 			open = false;
		// 			$this.removeClass('_open');
		// 		});
		// 	}, 0);
		// } else {
		// 	if (event.target === $this.children('ul')[0]) {
		// 		event.stopPropagation();
		// 	}
		// }
	});
});



$(function () { //鼠标跟随
	var bCR;
	$('#focus >ul').on('mousemove', '>li._current', function (e) {
		var $this = $(this),
			$text = $this.children('h2');
		if (!bCR) {
			bCR = $text[0].getBoundingClientRect();
		}
		var tX = (e.clientX - (bCR.left + bCR.width / 2)) * 0.1,
			tY = (e.clientY - (bCR.top + bCR.height / 2)) * 0.1;
		$text.addClass('_no-transition');
		$text[0].style.transform = 'translate(' + tX + 'px,' + tY + 'px)';
		$text[0].style.webkitTransform = 'translate(' + tX + 'px,' + tY + 'px)';
	}).on('mouseout', '>li._current', function () {
		var $text = $(this).children('h2');
		$text.removeClass('_no-transition');
		$text[0].style.transform = '';
		$text[0].style.webkitTransform = '';
		bCR = null;
	});
});



$(function () { //切换
	var $li = $('#focus >ul >li'),
		$li_nav = $('#focus >._nav >ul >li');
	var curIndex = 0,
		lastIndex = $li.length - 1;

	var switchover = function (index) {
		$li.removeClass('_current').eq(index).addClass('_current');
		$li_nav.removeClass('_current').eq(index).addClass('_current');
		var prevIndex = index === 0 ? lastIndex : index - 1,
			nextIndex = index === lastIndex ? 0 : index + 1;
		$li.eq(index).children('[data-src]')
			.add($li.eq(prevIndex).children('[data-src]'))
			.add($li.eq(nextIndex).children('[data-src]'))
			.each(function () {
				var $this = $(this);
				var src = $this.data('src');
				var $img = $('<img>');
				$img[0].onload = function () {
					$this.addClass('_loaded').removeAttr('data-src')
						.css('backgroundImage', 'url(' + src + ')');
				};
				$img.attr('src', src);
			});
	};

	//事件
	$('#focus >._prevnext >i:first').on('click', function () {
		var prevIndex = curIndex === 0 ? lastIndex : curIndex - 1;
		switchover(prevIndex);
		curIndex = prevIndex;
	});
	$('#focus >._prevnext >i:last').on('click', function () {
		var nextIndex = curIndex === lastIndex ? 0 : curIndex + 1;
		switchover(nextIndex);
		curIndex = nextIndex;
	});
	$('#focus >._nav >ul').on('click', '>li:not(._current)', function () {
		switchover($(this).index());
	});

	//初始化
	switchover(curIndex);
});