// 这个脚本只用于地图滚动效果
$(function () {
	var $world = $('.header .left .worldIcon >a >img');
	$world.mouseenter(function(){
		setTimeout(function(){
			$world.animate({
				'left': -10,
				'top': -10},
				700, function() {
				/* stuff to do after animation is complete */
			});
		},100)
	})
	$world.mouseleave(function(){
		setTimeout(function(){
			$world.animate({
				'left': -30,
				'top': -30},
				700, function() {
				/* stuff to do after animation is complete */
			});
		},100);
	})
})