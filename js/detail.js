//禁用鼠标滚轮事件
		// function disabledMouseWheel() {
		//     if (document.addEventListener) {
		//         document.addEventListener('DOMMouseScroll', scrollFunc, false);
		//     } //W3C  
		//     window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome  
		// }

		// function scrollFunc(evt) {
		//     evt = evt || window.event;
		//     if (evt.preventDefault) {
		//         // Firefox  
		//         evt.preventDefault();
		//         evt.stopPropagation();
		//     } else {
		//         // IE  
		//         evt.cancelBubble = true;
		//         evt.returnValue = false;
		//     }
		//     return false;
		// }
		// window.onload=disabledMouseWheel;

		$(function(){
			$('#picContent').fullpage({
				anchors: ['page1', 'page2', 'page3', 'page4'],
				menu: '#scrollMenu',
				resize: true,
			});
			$.fn.fullpage.setAllowScrolling();
			$('.fp-controlArrow').hide();

			//lazyload
			$("#picContent .section .slide").lazyload({
				threshold : 200,
				effect: "fadeIn",
				event: 'mouseover',
				container: $('.slide'),
				placeholder : "../image/icon-loading.png"
			});

			//bind event
			var $prev = $('#previousButton');
			var $close = $('#closeButton');
			var $next = $('#nextButton');

			$spanText = $('.spanText');
			$spanText.animate({
					'opacity': 1},
					1000, function() {
				});
			
			$prev.click(function(){
				$spanText.animate({
					'opacity': 1},
					1000, function() {
				});
				$.fn.fullpage.moveSlideLeft();
			});
			$next.click(function(){
				$spanText.animate({
					'opacity': 1},
					1000, function() {
				});
				$.fn.fullpage.moveSlideRight();
			});
			$close.click(function(){
				window.location.href='../html/focus.html';
			});
			/**
             * 执行方法，有两个参数
             * speed，表示滚动速度，数字越大表示越慢，
             * rowHeight，表示滚动行的高度
             */
            $(function() {
                $(".scrollText").myScroll({
                    speed: 60,
                    rowHeight: 600
                });
            });
		});