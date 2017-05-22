// 扩展方法，用于文字滚动,暂时弃用
(function($) {
    $.fn.myScroll = function(options) {
        var defaults = {
            speed: 40,
            rowHeight: 24
        };

        var opts = $.extend({}, defaults, options),
            intId = [];

        //	滚定私有方法，共有两个参数，第一个参数为滚对对象，第二个为行高
        function _scroll(obj, step) {
            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function() {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        };

        this.each(function(i) {
            var rowHeight = opts["rowHeight"],
                speed = opts["speed"],
                _this = $(this);
            intId[i] = setInterval(function() {
                // 要给外边的盒子设置宽度
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    _scroll(_this, rowHeight);
                }
            }, speed);

            _this.hover(function() {
                clearInterval(intId[i]);
            }, function() {
                intId[i] = setInterval(function() {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        _scroll(_this, rowHeight);
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