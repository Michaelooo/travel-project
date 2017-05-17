function refreshPage() {
    history.go(0);
}


//设置滚动
$(function() {
    $("#slider").easySlider({
        slideSpeed: 500,
        paginationSpacing: "15px",
        paginationDiameter: "12px",
        paginationPositionFromBottom: "20px",
        slidesClass: ".slides",
        controlsClass: ".controls",
        paginationClass: ".pagination"
    });
});