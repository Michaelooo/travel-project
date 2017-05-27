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

$(function() {
    var obj = $('#scrollText');
    // obj.animate({
    //         'top':-500
    //     },
    //     20000,
    //     function() {
    //         /* stuff to do after animation is complete */
    //     });
    var timer = setInterval(function(){
        var _obj = $('#scrollText');
        var _scrolltop = _obj.scrollTop()+1;
        obj.scrollTop(_scrolltop);
    },100);
    obj.hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            var _obj = $('#scrollText');
            var _scrolltop = _obj.scrollTop()+1;
            obj.scrollTop(_scrolltop);
        },100);
    })

    /*
    浮动效果实现
     */
    $("#right").hover(function() {
        $(this).animate({
            right: "0px"
        }, 200);
    }, function() {
        $(this).animate({
            right: "-200px"
        }, 200);
    });
});