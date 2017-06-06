// 这个脚本只用于地图滚动效果
$(function() {
	var $world = $('.leftHeader .worldIcon >a >img.scrollWorld');
	var $logo = $('.leftHeader .worldIcon .logo .imglogo');
	$world.hover(function(){
		$world.stop().animate({'width': 150,'height':150,'opacity':0.6}, 200);
		$logo.stop().animate({'opacity':0.5}, 200);
	},function(){
		$world.stop().animate({'width': 100,'height':100,'opacity':0.2}, 200);
		$logo.stop().animate({'opacity':1}, 200);
	});
})