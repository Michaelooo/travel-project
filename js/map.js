$(function() {
	var $box = $('.m-map');
	var $buttons = $('.m-map-menu >li'),
		$links = $('.m-map-main >li'),
		$details = $('.m-map-detail >li');
	var $main = $('.m-map-main');
	var $picWrap = $('#picWrap');
	    var $blackBoard = $('#blackBoard');
	    var $title = $('#blackBoard h3');
	    var $smallText = $('#blackBoard .smallText');
	    var $pText = $('#blackBoard p');

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
		var src = $bigImg.data('src');
		if (src) {
			var $img = $('<img>');
			$img[0].onload = function() {
				$bigImg.addClass('_loaded').removeAttr('data-src')
					.css('backgroundImage', 'url(' + src + ')');
			};
			$img.attr('src', src);
		}
	    
        $blackBoard.animate({left: "0px"}, 500);
        $title.animate({opacity: 1},500);
        $smallText.animate({opacity: 1},500);
        $pText.animate({opacity: 1},500);

	});
	$('.m-map-detail').on('click', 'li >._close', function() {
		var index = $(this).parent('li').index();
		$details.eq(index).removeClass('_open');
	});
	var _id;
	$(window).resize(function() {
		clearTimeout(_id);
		_id = setTimeout(function() {
			$links.filter('._open').trigger('click');
		}, 300);
	});

	//一些其他的操作
	$('#picContent').fullpage({
            });
    $('.fp-controlArrow').hide();

    //点击之后的操作
    var $img = $('#clickButton img');
    $picWrap.click(function(){
        $img.show();
        $blackBoard.animate({left: "-750px"}, 500);
    })
        //bind event
    var $prev = $('#previousButton');
    var $close = $('#closeButton');
    var $next = $('#nextButton');

    $prev.click(function(){
        $.fn.fullpage.moveSlideLeft();
    });
    $next.click(function(){
        $.fn.fullpage.moveSlideRight();
    });
    $close.click(function(){
        $img.hide();
        $blackBoard.animate({left: "0px"}, 500);
    });

	//初始化
	switchover(0);
});