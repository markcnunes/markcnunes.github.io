jQuery(function($) {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 150) $('#scroll-to-top').addClass('displayed');
        else $('#scroll-to-top').removeClass('displayed');
    });
    $('#scroll-to-top').click(function() {
        $("html, body").animate({
            scrollTop: "0px"
        });
        return false;
    });
});