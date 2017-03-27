// 自执行方法，给$绑定一个滚动方法
(function($){
	$.fn.myScroll = function(options){
	var defaults = {
		speed:40,  
		rowHeight:24 
	};
	
	var opts = $.extend({}, defaults, options),intId = [];
	
	function marquee(obj, step){
	
		obj.find("ul").animate({
			marginTop: '-=1'
		},0,function(){
				var s = Math.abs(parseInt($(this).css("margin-top")));
				if(s >= step){
					$(this).find("li").slice(0, 1).appendTo($(this));
					$(this).css("margin-top", 0);
				}
			});
		}
		
		this.each(function(i){
			var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
			intId[i] = setInterval(function(){
				if(_this.find("ul").height()<=_this.height()){
					clearInterval(intId[i]);
				}else{
					marquee(_this, sh);
				}
			}, speed);

			_this.hover(function(){
				clearInterval(intId[i]);
			},function(){
				intId[i] = setInterval(function(){
					if(_this.find("ul").height()<=_this.height()){
						clearInterval(intId[i]);
					}else{
						marquee(_this, sh);
					}
				}, speed);
			});
		
		});

	}

})(jQuery);


/**
 * 为不同行添加不同的样式，这个暂时先不用
 */
// $(document).ready(function(){
// 	$('.list_lh li:even').addClass('lieven');
// })


/**
 * 执行方法，有两个参数
 * speed，表示滚动速度，数字越大表示越慢，
 * rowHeight，表示滚动行的高度
 */
$(function(){
	$("div.list_lh").myScroll({
		speed:40, 
		rowHeight:600
	});
});

