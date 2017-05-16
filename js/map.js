$(function() {
	var $box = $('.m-map');
	var $buttons = $('.m-map-menu >li'),
		$links = $('.m-map-main >li'),
		$details = $('.m-map-detail >li');

	//地图切换
	var $main = $('.m-map-main');
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

	//点击图层进入的加载效果
	var _style = function (index) {
		var detailWrap = $details.eq(index);
		var $blackBoard = detailWrap.find('._left');
		var $title = detailWrap.find('._left h3');
		var $smallText = detailWrap.find('._left .smallText');
		var $pText = detailWrap.find('._left p');
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
	} 
	//点击展开大图之后的效果
	var _style2 = function (index,callback) {
		var detailWrap = $details.eq(index);
		var $blackBoard = detailWrap.find('._left');
		$blackBoard.animate({
			left: "-750px"
		}, 500,callback);
	}

	// 点击关闭大图页之后的效果
	var _style3 = function(){
		var detailWrap = $('.m-map-detail > li._open');
		var $blackBoard = detailWrap.find('._left');
		$blackBoard.animate({
			left: "0px"
		}, 500);
	}

	//事件
	$('.m-map-menu').on('click', 'li', function() { //菜单
		switchover($(this).index());
	});
	$('.m-map-main').on('click', 'li', function(event) { //小方块
		if (event.target === this) {
			switchover($(this).index());
		}
	});
	$(window).resize((function() { //resize
		var _id;
		return function() {
			clearTimeout(_id);
			_id = setTimeout(function() {
				$links.filter('._open').trigger('click');
			}, 300);
		};
	})());
	$('.m-map-main').on('click', 'li >div >div', function() { //缩略图
		var index = $(this).parent().parent('li').index();
		$details.eq(index).addClass('_open');
		var $box = $details.eq(index).children('._right');
		if (!$box[0].style.backgroundImage) {
			var src = $box.children(':first').data('src');
			var $img = $('<img>');
			$img[0].onload = function() {
				$box.addClass('_loaded').css('backgroundImage', 'url(' + src + ')');
			};
			$img.attr('src', src);
		}
		_style(index);
	});
	$('.m-map-detail').on('click', 'li >._close', function() { //关闭
		var index = $(this).parent('li').index();
		$details.eq(index).removeClass('_open');
	});

	//大图切换
	(function() {
		var $li, lastIndex, curIndex = 0;
		//切换函数
		var switchover_pic = function(index) {
			$li.parent().css('transform', 'translate3d(-' + index * $(window).width() + 'px,0,0)');
			var prevIndex = index === 0 ? lastIndex : index - 1,
				nextIndex = index === lastIndex ? 0 : index + 1;
			$li.eq(index).filter('[data-src]')
				.add($li.eq(prevIndex).filter('[data-src]'))
				.add($li.eq(nextIndex).filter('[data-src]'))
				.each(function() {
					var $this = $(this);
					var src = $this.data('src');
					var $img = $('<img>');
					$img[0].onload = function() {
						$this.addClass('_loaded').removeAttr('data-src')
							.css('backgroundImage', 'url(' + src + ')');
					};
					$img.attr('src', src);
				});
		};
		//事件1
		$('.m-map-detail').on('click', '._open >._btn', function() {
			var index = $(this).parent('li').index();
			_style2(index,function(){
				var html = '';
				$(this).siblings('._right').children().each(function() {
					html += '<li data-src="' + $(this).data('src') + '"></li>';
				});
				$('.m-map-fullPage').addClass('_on').children('ul').html(html);
				$li = $('.m-map-fullPage >ul >li');
				lastIndex = $li.length - 1;
				$(window).trigger('resize._setWidth');
				switchover_pic(curIndex);
			});

		});
		$(window).on('resize._setWidth', function() {
			$('.m-map-fullPage >ul >li').width($(this).width());
		});
		//事件2
		$('.m-map-fullPage').on('click', '>._btn i:eq(0)', function() {
			var prevIndex = curIndex === 0 ? lastIndex : curIndex - 1;
			switchover_pic(prevIndex);
			curIndex = prevIndex;
		});
		$('.m-map-fullPage').on('click', '>._btn i:eq(2)', function() {
			var nextIndex = curIndex === lastIndex ? 0 : curIndex + 1;
			switchover_pic(nextIndex);
			curIndex = nextIndex;
		});
		$('.m-map-fullPage').on('click', '>._btn i:eq(1)', function(event) {
			$(event.delegateTarget).removeClass('_on');
			$(event.delegateTarget).addClass('_off');
			setTimeout(function() {
				$(event.delegateTarget).removeClass('_off');
			}, 500);
			var index = $(this).parent().parent().find('ul >li');
			setTimeout(_style3,1000);
			// _style3();
		});
	})();

	//初始化
	switchover(0);
});