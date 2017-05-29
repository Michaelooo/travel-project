// 这个脚本只用于地图滚动效果
$(function() {
	var $world = $('.header .left .worldIcon >a >img.scrollWorld');
	var $logo = $('.header .left .worldIcon .logo .imglogo');
	$world.hover(function(){
		// $world.addClass('actived');
		$world.animate({'width': 150,'height':150,'opacity':0.6}, 200);
		$logo.animate({'opacity':0.5}, 200);
	},function(){
		$world.animate({'width': 100,'height':100,'opacity':0.2}, 200);
		$logo.animate({'opacity':1}, 200);
	});
})