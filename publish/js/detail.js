$(function(){$(".loading").show();setTimeout(function(){$(".loading").hide();$("#picContent").fullpage({anchors:["page1","page2","page3","page4"],menu:"#scrollMenu",resize:true});$.fn.fullpage.setAllowScrolling();$(".fp-controlArrow").hide();$("#picContent .section .slide").lazyload({threshold:200,effect:"fadeIn",event:"mouseover",container:$(".slide"),placeholder:"../image/icon-loading.png"});var c=$("#previousButton");var e=$("#closeButton");var a=$("#nextButton");$spanText=$(".spanText");$spanText.animate({"opacity":1},1000,function(){});c.click(function(){$spanText.animate({"opacity":1},1000,function(){});$.fn.fullpage.moveSlideLeft()});a.click(function(){$spanText.animate({"opacity":1},1000,function(){});$.fn.fullpage.moveSlideRight()});e.click(function(){window.location.href="../html/focus.html"});var b=$(".spanText >.spanTitle >span");var d=$(".textWrapper");d.hover(function(){b.stop().animate({"opacity":0},500);d.stop().animate({"top":0,"height":600},500)},function(){b.stop().animate({"opacity":1},500);d.stop().animate({"top":60,"height":150},500)});function f(){var g=$("#footer >ul >li a");g.click(function(){$(".loading").show();setTimeout(function(){$(".loading").hide()},700)})}f()},700)});